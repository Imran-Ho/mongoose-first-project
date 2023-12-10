import { Schema, model } from 'mongoose';
import { TAcademicFaculty } from './academicFaculty.interface';
import AppError from '../../errors/AppErrors';
import httpStatus from 'http-status';

const academicFacultySchema = new Schema<TAcademicFaculty>(
  {
    name: {
      type: String,
      require: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

// to check the academic faculty is existing or not before creating.
academicFacultySchema.pre('save', async function (next) {
  const isDepartmentExist = await AcademicFaculty.findOne({
    name: this.name,
  });
  if (isDepartmentExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'academic faculty is already existing.',
    );
  }
  next();
});

// to check the department is exist before it gets updated.
academicFacultySchema.pre('findOneAndUpdate', async function (next) {
  const query = this.getQuery();
  const isDepartmentExist = await AcademicFaculty.findOne(query);
  if (!isDepartmentExist) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'academic faculty does not exist in DB.',
    );
  }
  next();
});

export const AcademicFaculty = model<TAcademicFaculty>(
  'academicFaculty',
  academicFacultySchema,
);
