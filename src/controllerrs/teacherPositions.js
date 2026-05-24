import TeacherPositionsModel from "../models/teacherPositions.js";
import { slugify } from "../utils/formartter.js";


export const getAllTeacherPositions = async (req, res) => {
    try {
        const search = req.query.search || ""
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;
        const skip = (page - 1) * limit;
        const totalMovies = await TeacherPositionsModel.countDocuments();
        const movies = await TeacherPositionsModel.find().sort({ updatedAt: -1 }).skip(skip).limit(limit);  
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

export const createTeacherPositions = async (req, res) => {
    try {
        const { name , code,des , isActive} = req.body;
        const checkCode = await TeacherPositionsModel.findOne({ code });
        if (checkCode) {
            return res.status(400).json({ error: 'Mã vị trí giáo viên đã tồn tại !' });
        }
        const newTeacher = new TeacherPositionsModel({ name , code , des , isActive });
        await newTeacher.save();
        res.status(201).json({ message: 'Vị trí giáo viên đã được tạo thành công', teacher: newTeacher });
    } catch (error) {
        res.status(500).json({ error: 'Lỗi khi tạo giáo viên !' });
    }
}