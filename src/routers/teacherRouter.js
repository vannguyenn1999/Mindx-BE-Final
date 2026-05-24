import express from "express";

import { getAllTeachers , createTeacher } from "../controllerrs/teacherController.js";

const TeacherRouter = express.Router();


TeacherRouter.get('/', getAllTeachers)
TeacherRouter.post('/', createTeacher)

export default TeacherRouter;
