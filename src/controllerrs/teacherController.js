import TeacherModel from "../models/teacherModel.js";
import UserModel from "../models/userModel.js";
import { slugify, generate10DigitRandom } from "../utils/formartter.js";

export const getAllTeachers = async (req, res) => {
  try {
    const search = req.query.search || "";
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    const totalMovies = await TeacherModel.countDocuments();
    const movies = await TeacherModel.find()
      .sort({ updatedAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("teacherPositions")
      .populate("teacherPositionsId")
      .populate("userId");
    const totalPages = Math.ceil(totalMovies / limit);
    res.status(200).json({
      success: true,
      data: movies,
      pagination: {
        currentPage: page,
        totalPages,
        totalMovies,
        limit,
      },
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Lỗi khi fetching bài viết !" });
  }
};

export const createTeacher = async (req, res) => {
  try {
    const {
      email,
      username,
      identity,
      address,
      phoneNumber,
      dob,
      startDate,
      endDate,
      degrees,
      teacherPositionsId,
    } = req.body;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email này đã tồn tại !" });
    }
    console.log("req.file" , req.file)
    const newUser = new UserModel({
      image: req.file ? req.file.path : null,
      imagePublicId: req.file ? req.file.filename : null,
      email,
      username,
      identity,
      address,
      role: "teacher",
      phoneNumber,
      dob: new Date(dob).toISOString(),
    });
    await newUser.save();

    const newTeacher = new TeacherModel({
      code: generate10DigitRandom(),
      userId: newUser._id,
      teacherPositionsId : JSON.parse(teacherPositionsId),
      degrees : JSON.parse(degrees),
    });
    await newTeacher.save();
    res.status(201).json({
      message: "Giáo viên đã được tạo thành công",
      teacher: newTeacher,
    });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Lỗi khi tạo giáo viên !" });
  }
};
