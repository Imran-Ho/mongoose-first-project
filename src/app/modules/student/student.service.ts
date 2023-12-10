import mongoose from 'mongoose';
import { Student } from './student.model';
import AppError from '../../errors/AppErrors';
import httpStatus from 'http-status';
import { User } from '../user/user.model';
import { TStudent } from './student.interface';

// we will get students data from DB
const getAllStudentsFromDB = async (query: Record<string, unknown>) => {
  // console.log('base query', query);
  const queryObj = { ...query }; // copy
  //  {email: {$regex: query.searchTerm, $options: i}}
  //  {'name.firstName': {$regex: query.searchTerm, $options: i}}
  const studentSearchableFields = ['email', 'name.firstName', 'presentAddress'];
  let searchTerm = '';
  if (query?.searchTerm) {
    searchTerm = query?.searchTerm as string;
  }
  const searchQuery = Student.find({
    $or: studentSearchableFields.map((field) => ({
      [field]: { $regex: searchTerm, $options: 'i' },
    })),
  });
  // filtering
  const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
  excludeFields.forEach((element) => delete queryObj[element]);
  console.log({ query }, { queryObj });
  const filterQuery = searchQuery
    .find(queryObj)
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicfaculty',
      },
    });
  // sort
  let sort = '-createdAt';
  if (query.sort) {
    sort = query.sort as string;
  }
  const sortQuery = filterQuery.sort(sort);
  //limit
  let limit = 1;
  let page = 1;
  let skip = 0;

  if (query.limit) {
    limit = Number(query.limit);
  }

  if (query.page) {
    page = Number(query.page);
    skip = (page - 1) * limit;
  }
  const paginationQuery = sortQuery.skip(skip);

  const limitQuery = paginationQuery.limit(limit);

  // field limiting
  let fields = '-__v';
  // fields: name,email;
  // fields: name email;   we want to do like this

  if (query.fields) {
    fields = (query.fields as string).split(',').join(' ');
    console.log({ fields });
  }
  const fieldsQuery = await limitQuery.select(fields);

  return fieldsQuery;
};

const getSingleStudentsFromDB = async (id: string) => {
  // const result = await Student.findOne({ id });
  const result = await Student.findOne({ id })
    .populate('admissionSemester')
    .populate({
      path: 'academicDepartment',
      populate: {
        path: 'academicfaculty',
      },
    });
  return result;
};
const updateStudentsIntoDB = async (id: string, payLoad: Partial<TStudent>) => {
  const { name, guardian, localGuardian, ...remainingStudentData } = payLoad;
  const modifiedUpdateData: Record<string, unknown> = {
    ...remainingStudentData,
  };
  if (name && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdateData[`name.${key}`] = value;
    }
  }
  if (guardian && Object.keys(guardian).length) {
    for (const [key, value] of Object.entries(guardian)) {
      modifiedUpdateData[`guardian.${key}`] = value;
    }
  }
  if (localGuardian && Object.keys(localGuardian).length) {
    for (const [key, value] of Object.entries(localGuardian)) {
      modifiedUpdateData[`localGuardian.${key}`] = value;
    }
  }
  console.log(modifiedUpdateData);
  // const result = await Student.findOne({ id });
  const result = await Student.findOneAndUpdate({ id }, modifiedUpdateData, {
    new: true,
    runValidators: true,
  });

  return result;
};

const deleteSingleStudentsFromDB = async (id: string) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();
    const deletedStudent = await Student.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedStudent) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete student.');
    }
    const deletedUser = await User.findOneAndUpdate(
      { id },
      { isDeleted: true },
      { new: true, session },
    );
    if (!deletedUser) {
      throw new AppError(httpStatus.BAD_REQUEST, 'Failed to delete user.');
    }
    await session.commitTransaction();
    await session.endSession();

    return deletedStudent;
  } catch (err) {
    await session.abortTransaction();
    await session.endSession();
    throw new Error('failed to delete student');
  }
};

export const studentServices = {
  getAllStudentsFromDB,
  getSingleStudentsFromDB,
  updateStudentsIntoDB,
  deleteSingleStudentsFromDB,
};
