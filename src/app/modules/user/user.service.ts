/* eslint-disable @typescript-eslint/no-explicit-any */
import mongoose from 'mongoose';
import config from '../../config';

import { AcademicSemester } from '../academicSemester/academicSemester.model';
import { TStudent } from '../student/student.interface';
import { Student } from '../student/student.model';
import { TUser } from './user.interface';

import { User } from './user.model';
import { generateStudentId } from './user.utils';
import AppError from '../../errors/AppErrors';
import httpStatus from 'http-status';
import { TAcademicSemester } from '../academicSemester/academicSemester.interface';

const createStudentIntoDB = async (password: string, payLoad: TStudent) => {
  //   if (await User.isUserExisting(studentData.id)) {
  //     throw new Error('User already exists !');
  //   }

  // create a user object
  const userData: Partial<TUser> = {};
  // if password in not given, user default password
  userData.password = password || (config.default_password as string);

  // set user role
  userData.role = 'student';

  // find academic semester info
  const admissionSemester = await AcademicSemester.findById(
    payLoad.admissionSemester,
  );

  // transaction session start
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    // set manually generated id
    userData.id = await generateStudentId(
      admissionSemester as TAcademicSemester,
    );
    // create a user
    const newUser = await User.create([userData], { session }); // array.
    // create a student
    if (!newUser.length) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to create user.');
    }
    // set id, _id as user
    payLoad.id = newUser[0].id;
    payLoad.user = newUser[0]._id; // reference _id
    const newStudent = await Student.create([payLoad], { session });
    if (!newStudent) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Failed to create new student.',
      );
    }
    await session.commitTransaction();
    await session.endSession();
    return newStudent;
  } catch (err: any) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error(err);
  }
};

export const userServices = {
  createStudentIntoDB,
};
