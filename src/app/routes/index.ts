import { Router } from 'express';
import { studentRoutes } from '../modules/student/student.route';
import { userRoutes } from '../modules/user/user.route';
import { academicSemesterRouter } from '../modules/academicSemester/academicSemester.route';
import { academicFacultyRoute } from '../modules/academicFaculty/academicFaculty.route';
import { academicDepartmentRouter } from '../modules/academicDepartment/academicDepartment.route';
import { courseRouters } from '../modules/course/course.route';
import { semesterRegistration } from '../modules/semesterRegistration/semesterRegistration.router';
import { offeredCourseRouter } from '../modules/offeredCourse/offeredCourse.router';
import { authRouter } from '../modules/auth/auth.router';
import { facultiesRouters } from '../modules/faculty/faculty.route';
import { enrolledCourseRouters } from '../modules/enrolledCourse/enrolledCourse.route';

// import express from 'express'
const router = Router();

const moduleRoutes = [
  {
    path: '/users',
    router: userRoutes,
  },
  {
    path: '/students',
    router: studentRoutes,
  },
  {
    path: '/academic-semester',
    router: academicSemesterRouter,
  },
  {
    path: '/faculties',
    router: facultiesRouters,
  },
  {
    path: '/academic-faculty',
    router: academicFacultyRoute,
  },
  {
    path: '/academic-department',
    router: academicDepartmentRouter,
  },
  {
    path: '/courses',
    router: courseRouters,
  },
  {
    path: '/semesterRegistration',
    router: semesterRegistration,
  },
  {
    path: '/offeredCourse',
    router: offeredCourseRouter,
  },
  {
    path: '/auth',
    router: authRouter,
  },
  {
    path: '/enrolledCourses',
    router: enrolledCourseRouters,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.router));

export default router;
