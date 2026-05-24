import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    teacherPositions: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher-Positions",
        required: true,
      },
    ],
    teacherPositionsId: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Teacher-Positions",
        required: true,
      },
    ],
    code: {
      type: String,
      required: true,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    degrees: [
      {
        school: {
          type: String,
          required: false,
        },
        type: {
          type: String,
          required: false,
        },
        major: {
          type: String,
          required: false,
        },
        year: {
          type: String,
          required: false,
        },
        isGraduated: {
          type: Boolean,
          required: false,
        },
      },
    ],
  },
  { timestamps: true },
);

const TeacherModel = mongoose.model("Teacher", teacherSchema);

export default TeacherModel;
