import  TeacherModel  from "../models/teacherModel.js";
import {slugify} from "../utils/formartter.js";

export const getAllTeachers = async (req, res) => {
    try {
        const search = req.query.search || ""
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit;
        const totalMovies = await TeacherModel.countDocuments();
        const movies = ((await TeacherModel.find().sort({ updatedAt: -1 }).skip(skip).limit(limit).populate('teacherPositions').populate('teacherPositionsId').populate('userId')));  
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
        console.log(error)
        res.status(500).json({ error: 'Lỗi khi fetching bài viết !' });
    }
};

export const createTeacher = async (req, res) => {
    try {
        const { email , code, startDate, endDate, degrees } = req.body;
        console.log(req.user)
        const existingUser = await TeacherModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: 'Giáo viên với email này đã tồn tại !' });
        }
        const codeExists = slugify(code);
        const newTeacher = new TeacherModel({ email , code : codeExists, startDate, endDate, degrees });
        await newTeacher.save();
        res.status(201).json({ message: 'Giáo viên đã được tạo thành công', teacher: newTeacher });
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi tạo giáo viên !' });
    }
}

