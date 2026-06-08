"use client"
import { useReducer } from "react"
import { submitToSheet, type EnrollmentData } from "../hooks/useGoogleSheet"
import { CrossIcon } from "lucide-react"

// ── Types ──────────────────────────────────────────────────────────────────

type InterestedCourse =
    | "oLevel" | "dca" | "pgdca" | "ccc" | "advancedExcel"
    | "oracle" | "python" | "java" | "tally"
    | "englishSpeaking" | "graphicDesigning" | "dataAnalytics"

interface IState {
    name: string
    email: string
    contact: string
    interestedCourse: InterestedCourse | ""
    errors: Partial<Record<"name" | "email" | "contact" | "interestedCourse", string>>
    status: "idle" | "submitting" | "success" | "error"
}

type IAction =
    | { type: "SET_NAME"; payload: string }
    | { type: "SET_EMAIL"; payload: string }
    | { type: "SET_CONTACT"; payload: string }
    | { type: "SET_COURSE"; payload: InterestedCourse | "" }
    | { type: "VALIDATE" }
    | { type: "SUBMIT_START" }
    | { type: "SUBMIT_SUCCESS" }
    | { type: "SUBMIT_ERROR" }
    | { type: "RESET" }

// ── Validation ─────────────────────────────────────────────────────────────

function validate(s: IState): IState["errors"] {
    const e: IState["errors"] = {}
    if (!s.name.trim()) e.name = "Name is required"
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s.email)) e.email = "Invalid Email format"
    if (!/^\d{10}$/.test(s.contact)) e.contact = "10 digit number required"
    if (!s.interestedCourse) e.interestedCourse = "Please select course"
    return e
}

// ── Reducer ────────────────────────────────────────────────────────────────

const initial: IState = {
    name: "", email: "", contact: "", interestedCourse: "",
    errors: {}, status: "idle",
}

function reducer(state: IState, action: IAction): IState {
    switch (action.type) {
        case "SET_NAME":
            return { ...state, name: action.payload, errors: { ...state.errors, name: undefined } }
        case "SET_EMAIL":
            return { ...state, email: action.payload, errors: { ...state.errors, email: undefined } }
        case "SET_CONTACT":
            return { ...state, contact: action.payload.replace(/\D/g, "").slice(0, 10), errors: { ...state.errors, contact: undefined } }
        case "SET_COURSE":
            return { ...state, interestedCourse: action.payload, errors: { ...state.errors, interestedCourse: undefined } }
        case "VALIDATE":
            return { ...state, errors: validate(state) }
        case "SUBMIT_START":
            return { ...state, status: "submitting", errors: {} }
        case "SUBMIT_SUCCESS":
            return { ...state, status: "success" }
        case "SUBMIT_ERROR":
            return { ...state, status: "error" }
        case "RESET":
            return { ...initial }
        default:
            return state
    }
}

// ── Courses ────────────────────────────────────────────────────────────────

const COURSES: { value: InterestedCourse; label: string }[] = [
    { value: "oLevel", label: "O Level" },
    { value: "dca", label: "DCA — Diploma in Computer Applications" },
    { value: "pgdca", label: "PGDCA — Post Graduate DCA" },
    { value: "ccc", label: "CCC — Course on Computer Concepts" },
    { value: "advancedExcel", label: "Advanced Excel" },
    { value: "oracle", label: "Oracle Database" },
    { value: "python", label: "Python Programming" },
    { value: "java", label: "Java Programming" },
    { value: "tally", label: "Tally with GST" },
    { value: "englishSpeaking", label: "English Speaking" },
    { value: "graphicDesigning", label: "Graphic Designing" },
    { value: "dataAnalytics", label: "Data Analytics" },
]

// ── Props ──────────────────────────────────────────────────────────────────

interface Props {
    open: boolean
    onClose: () => void
}

// ── Component ──────────────────────────────────────────────────────────────

export default function EnrollmentForm({ open, onClose }: Props) {
    const [state, dispatch] = useReducer(reducer, initial)

    const handleSubmit = async () => {
        const errors = validate(state)
        if (Object.keys(errors).length > 0) {
            dispatch({ type: "VALIDATE" })
            return
        }

        dispatch({ type: "SUBMIT_START" })
        try {
            await submitToSheet({
                name: state.name,
                email: state.email,
                contact: state.contact,
                interestedCourse: state.interestedCourse as string,
            } as EnrollmentData)
            dispatch({ type: "SUBMIT_SUCCESS" })
        } catch {
            dispatch({ type: "SUBMIT_ERROR" })
        }
    }

    const handleClose = () => {
        dispatch({ type: "RESET" })
        onClose()
    }

    // ── Success ──────────────────────────────────────────────────────────────

    if (state.status === "success") {
        return (
            <div className={`fixed inset-0 z-50 ${open ? "flex" : "hidden"} items-center justify-center p-4`}>
                <div
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    onClick={handleClose}
                />

                <div className="relative w-full max-w-md overflow-hidden rounded-3xl bg-white shadow-2xl">
                    <div className="p-8 text-center">
                        <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-green-100">
                            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-600 text-3xl font-bold text-white">
                                ✓
                            </div>
                        </div>

                        <h2 className="mt-6 text-3xl font-bold text-slate-900">
                            Application Submitted
                        </h2>

                        <p className="mt-4 text-slate-600">
                            Thank you <strong>{state.name}</strong>.
                            Our admission team will contact you shortly on{" "}
                            <strong>{state.contact}</strong>.
                        </p>

                        <button
                            onClick={handleClose}
                            className="mt-8 w-full rounded-xl bg-green-600 px-4 py-3 font-semibold text-white transition hover:bg-green-700"
                        >
                            Done
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // ── Form ─────────────────────────────────────────────────────────────────

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />

            {/* Modal */}
            <div className="relative w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-2xl">

                {/* Header */}
                <div className="bg-[#38bbeb] px-6 py-4">

                    <h2 className="mt-0.5 text-2xl font-bold text-white">Enroll Now</h2>
                </div>

                {/* Form */}
                <div className="p-6 space-y-4">

                    {/* Name */}
                    <div>
                        <label className="mb-1.5 block text-xs font-medium text-slate-500">Full Name</label>
                        <input
                            value={state.name}
                            onChange={(e) => dispatch({ type: "SET_NAME", payload: e.target.value })}
                            placeholder="Rajan Sharma"
                            className={`h-10 w-full rounded-xl border px-3 text-sm outline-none transition
            ${state.errors.name ? "border-red-500" : "border-slate-200 focus:border-[#38bbeb]"}`}
                        />
                        {state.errors.name && <p className="mt-1 text-xs text-red-500">{state.errors.name}</p>}
                    </div>

                    {/* Contact + Email — one row */}
                    <div className="grid grid-cols-2 gap-3">

                        {/* Mobile */}
                        <div>
                            <label className="mb-1.5 block text-xs font-medium text-slate-500">Mobile</label>
                            <input
                                type="tel"
                                value={state.contact}
                                onChange={(e) => dispatch({ type: "SET_CONTACT", payload: e.target.value })}
                                placeholder="10-digit no."
                                maxLength={10}
                                className={`h-10 w-full rounded-xl border px-3 text-sm outline-none transition
              ${state.errors.contact ? "border-red-500" : "border-slate-200 focus:border-[#38bbeb]"}`}
                            />
                            {state.errors.contact && <p className="mt-1 text-xs text-red-500">{state.errors.contact}</p>}
                        </div>

                        {/* Email */}
                        <div>
                            <label className="mb-1.5 block text-xs font-medium text-slate-500">Email</label>
                            <input
                                type="email"
                                value={state.email}
                                onChange={(e) => dispatch({ type: "SET_EMAIL", payload: e.target.value })}
                                placeholder="you@email.com"
                                className={`h-10 w-full rounded-xl border px-3 text-sm outline-none transition
              ${state.errors.email ? "border-red-500" : "border-slate-200 focus:border-[#38bbeb]"}`}
                            />
                            {state.errors.email && <p className="mt-1 text-xs text-red-500">{state.errors.email}</p>}
                        </div>
                    </div>

                    {/* Course */}
                    <div>
                        <label className="mb-1.5 block text-xs font-medium text-slate-500">Interested Course</label>
                        <select
                            value={state.interestedCourse}
                            onChange={(e) => dispatch({ type: "SET_COURSE", payload: e.target.value as InterestedCourse })}
                            className={`h-10 w-full rounded-xl border px-3 text-sm outline-none transition
            ${state.errors.interestedCourse ? "border-red-500" : "border-slate-200 focus:border-[#38bbeb]"}`}
                        >
                            <option value="">Select Course</option>
                            {COURSES.map((course) => (
                                <option key={course.value} value={course.value}>{course.label}</option>
                            ))}
                        </select>
                        {state.errors.interestedCourse && <p className="mt-1 text-xs text-red-500">{state.errors.interestedCourse}</p>}
                    </div>

                    {state.status === "error" && (
                        <div className="rounded-xl bg-red-50 p-3 text-xs text-red-600">
                            Something went wrong. Please try again.
                        </div>
                    )}

                    {/* Buttons */}
                    <div className="flex gap-3 pt-1">
                        <button
                            onClick={handleClose}
                            className="flex-1 rounded-xl border bg-red-500 border-slate-200 py-2.5 text-sm font-medium text-black hover:bg-red-600"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            disabled={state.status === "submitting"}
                            className="flex-1 rounded-xl bg-[#38bbeb] py-2.5 text-sm font-semibold text-white transition hover:bg-[#2aa8d8] disabled:opacity-50"
                        >
                            {state.status === "submitting" ? "Submitting..." : `Submit`}
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
} 