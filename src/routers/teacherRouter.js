import express from "express";

import {
  getAllTeachers,
  createTeacher,
} from "../controllerrs/teacherController.js";
import { uploadCloud } from "../configs/cloudinary.js";

const TeacherRouter = express.Router();

TeacherRouter.get("/", getAllTeachers);
TeacherRouter.post("/", uploadCloud.single("image"), createTeacher);

export default TeacherRouter;
