"use client"
import { useState } from "react"
import EnrollmentForm from "./EnrollmentForm"
import Link from "next/link"
import { ArrowDownWideNarrow, BookAlert, BookMarked, HamburgerIcon, HomeIcon, LaptopIcon, Menu, PhoneCallIcon } from "lucide-react"

export default function Navbar() {
    const [open, setOpen] = useState<boolean>(false)
    const [menuOpen, setMenuOpen] = useState<boolean>(false)

    return (
        <>
            <nav className="fixed top-0 w-full z-50 bg-white backdrop-blur-md  border-b-2 border-[#38bbeb]">
                <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">

                    {/* Logo */}
                    <div>
                        <img src="/logo.jpeg" height={48} width={48} alt="CCE Logo" className="rounded-sm sm:h-15 sm:w-30" />
                    </div>

                    {/* Desktop Links */}
                    <div className="hidden md:flex items-center gap-8">
                        {["Home", "About", "Courses", "Contact"].map((item) => (
                            <Link
                                key={item}
                                href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                                className="text-black hover:text-[#38bbeb] text-sm  md:text-lg md:font-bold md:text-shadow-2xs text-blue-red-600 font-medium tracking-wide transition-colors duration-200 hover:text-[#38bbeb]"
                            >
                                {item}
                            </Link>

                        ))}
                        <Link
                            href={"/certificateVerification"}
                            className="text-black hover:text-[#38bbeb] text-sm  md:text-lg md:font-bold md:text-shadow-2xs text-blue-red-600 font-medium tracking-wide transition-colors duration-200 hover:text-[#38bbeb]"
                        >
                            Certificate Verification
                        </Link>
                    </div>

                    {/* Apply Button + Mobile Menu */}
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setOpen(true)}
                            className="bg-[#38bbeb] cursor-pointer text-white text-sm font-semibold px-5 py-2 rounded-md transition-all duration-200 hover:scale-105 active:scale-95"
                        >
                            Enroll Now
                        </button>

                        {/* Mobile Hamburger */}
                        <button
                            className="md:hidden text-white p-1 transition-transform duration-300"
                            onClick={() => setMenuOpen(!menuOpen)}
                        >
                            <div
                                className={`transition-transform duration-300 ${menuOpen ? "rotate-180" : "rotate-0"
                                    }`}
                            >
                                {!menuOpen ? (
                                    <Menu className="text-[#38bbeb]" />
                                ) : (
                                    <ArrowDownWideNarrow className="text-[#38bbeb]" />
                                )}
                            </div>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {menuOpen && (
                    <div
                        className={`md:hidden overflow-hidden transition-all duration-300 ease-out
                            ${menuOpen
                                ? "max-h-96 opacity-100 translate-y-0"
                                : "max-h-0 opacity-0 -translate-y-2 pointer-events-none"
                            }`}
                    >
                        <div className="bg-black/90 border-t border-white/10 px-4 py-4 flex flex-col gap-4">
                            {[
                                { name: "Home", icon: <HomeIcon className="inline" /> },
                                { name: "About", icon: <BookAlert className="inline" /> },
                                { name: "Courses", icon: <LaptopIcon className="inline" /> },
                                { name: "Contact", icon: <PhoneCallIcon className="inline" /> },
                            ].map((item, index) => (
                                <Link
                                    key={item.name}
                                    href={item.name === "Home" ? "/" : `/${item.name.toLowerCase()}`}
                                    className={`text-white/80 hover:text-[#38bbeb] text-sm font-medium transition-all duration-300
                                    ${menuOpen
                                            ? "opacity-100 translate-x-0"
                                            : "opacity-0 -translate-x-3"
                                        }`}
                                    style={{
                                        transitionDelay: `${index * 500}ms`,
                                    }}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {item.icon} {item.name}
                                </Link>
                            ))}
                            <Link
                                href={"/certificateVerification"}
                                className="text-white/80 hover:text-[#38bbeb] text-sm  md:text-lg md:font-bold md:text-shadow-2xs text-blue-red-600 font-medium tracking-wide transition-colors duration-200 hover:text-[#38bbeb]"
                            >
                                <BookMarked className="inline" /> Certificate Verification
                            </Link>
                        </div>
                    </div>
                )}
            </nav>

            <EnrollmentForm open={open} onClose={() => setOpen(false)} />
        </>
    )
}