import express from "express";

import { getAllTeacherPositions , createTeacherPositions } from "../controllerrs/teacherPositions.js";

const teacherPositionsRouter = express.Router();


teacherPositionsRouter.get('/', getAllTeacherPositions)
teacherPositionsRouter.post('/', createTeacherPositions)

export default teacherPositionsRouter;
