import { Types } from "mongoose"

export type TGrade = 'A'|'B'|'C'|'D'|'F'|'NA'
export type TCourseMarks = {
    classTest1: number;
    midTerm:number;
    classTest2:number;
    final:number
}

export type TEnrolledCourse = {
    semesterRegistration: Types.ObjectId;
    academicSemester: Types.ObjectId;
    academicDepartment: Types.ObjectId;
    offeredCourse: Types.ObjectId;
    course: Types.ObjectId;
    student: Types.ObjectId;
    faculty: Types.ObjectId;
    isEnrolled: boolean;
    courseMarks:TCourseMarks ;
    grade:TGrade;
    gradePoints: number;
    isCompleted: boolean;
}
