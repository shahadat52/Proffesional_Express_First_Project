import { Router } from 'express';
import { studentRoutes } from '../modules/student/student.route';
import { userRoutes } from '../modules/user/user.route';
import { academicSemesterRouter } from '../modules/academicSemester/academicSemester.route';

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.router));

export default router;
