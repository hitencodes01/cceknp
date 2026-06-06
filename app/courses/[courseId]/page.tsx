"use client"

import CourseLayout from "@/components/CourseLayout";
import AdExcel from "@/components/courses/AdExcel";
import CCC from "@/components/courses/CCC";
import CLang from "@/components/courses/CLang";
import Data from "@/components/courses/Data";
import DCA from "@/components/courses/DCA";
import EnglishSpeaking from "@/components/courses/EnglishSpeaking";
import Graphic from "@/components/courses/Graphic";
import HindiEnglishTyping from "@/components/courses/HindiEnglishTyping";
import Java from "@/components/courses/Java";
import Java12 from "@/components/courses/Java12";
import OLevel from "@/components/courses/OLevel";
import PGDCA from "@/components/courses/PGDCA";
import PLSQL from "@/components/courses/PLSQL";
import Python from "@/components/courses/Python";
import Python12 from "@/components/courses/Python12";
import SQLExpert from "@/components/courses/SQLExpert";
import Tally from "@/components/courses/Tally";
import Website from "@/components/courses/Website";
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
