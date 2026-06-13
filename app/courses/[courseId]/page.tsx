"use client"
import dynamic from "next/dynamic";
const CourseLayout = dynamic(() => import("../../../components/CourseLayout"))
const AdExcel = dynamic(() => import("../../../components/courses/AdExcel"))
const CCC = dynamic(() => import("../../../components/courses/CCC"))
const CLang = dynamic(() => import("../../../components/courses/CLang"))
const Data = dynamic(() => import("../../../components/courses/Data"))
const DCA = dynamic(() => import("../../../components/courses/DCA"))
const EnglishSpeaking = dynamic(() => import("../../../components/courses/EnglishSpeaking"))
const Graphic = dynamic(() => import("../../../components/courses/Graphic"))
const HindiEnglishTyping = dynamic(() => import("../../../components/courses/HindiEnglishTyping"))
const Java = dynamic(() => import("../../../components/courses/Java"))
const Java12 = dynamic(() => import("../../../components/courses/Java12"))
const OLevel = dynamic(() => import("../../../components/courses/OLevel"))
const PGDCA = dynamic(() => import("../../../components/courses/PGDCA"))
const PLSQL = dynamic(() => import("../../../components/courses/PLSQL"))
const Python = dynamic(() => import("../../../components/courses/Python"))
const Python12 = dynamic(() => import("../../../components/courses/Python12"))
const SQLExpert = dynamic(() => import("../../../components/courses/SQLExpert"))
const Tally = dynamic(() => import("../../../components/courses/Tally"))
const Website = dynamic(() => import("../../../components/courses/Website"))
import { courses } from "@/lib/courses";
import { useParams } from "next/navigation";
import { JSX } from 'react'

export default function CourseId() {
    const { courseId } = useParams<{ courseId: string }>();
    const course = courses.find(c => c.id === courseId);

    if (!course) {
        return (
            <CourseLayout>
                <div className="text-center py-20">Course Not Found</div>
            </CourseLayout>
        );
    }

    const courseMap: Record<string, JSX.Element> = {
        ccc: <CCC />,
        olevel: <OLevel />,
        dca: <DCA />,
        pgdca: <PGDCA />,
        pdp: <EnglishSpeaking />,
        advExcel: <AdExcel />,
        oracleSQL: <SQLExpert />,
        tally: <Tally />,
        graphic: <Graphic />,
        oraclePL: <PLSQL />,
        hindiEnglishTyping: <HindiEnglishTyping />,
        c: <CLang />,
        dataAnalytics: <Data />,
        python12: <Python12 />,
        python: <Python />,
        java12: <Java12 />,
        java: <Java />,
        website: <Website />
    };

    return (
        <CourseLayout>
            {courseMap[courseId!] ?? <div className="text-center py-20">Course Not Found</div>}
        </CourseLayout>
    );
}
