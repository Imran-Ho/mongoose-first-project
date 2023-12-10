import { RequestHandler } from 'express';
import sendResponse from '../../utilities/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utilities/catchAsync';
import { AcademicFacultyService } from '../academicFaculty/academicFaculty.service';

const createAcademicFaculty: RequestHandler = catchAsync(async (req, res) => {
  const result = await AcademicFacultyService.createAcademicFacultyIntoDB(
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic faculty is created successfully',
    data: result,
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
});
const getAllAcademicFaculties = catchAsync(async (req, res) => {
  const result = await AcademicFacultyService.getAllAcademicFacultiesFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All academic faculties are retrieved',
    data: result,
  });
});
const getSingleAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result =
    await AcademicFacultyService.getSingleAcademicFacultyFromDB(facultyId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic faculty is retrieved',
    data: result,
  });
});
const updateAcademicFaculty = catchAsync(async (req, res) => {
  const { facultyId } = req.params;
  const result = await AcademicFacultyService.updateAcademicFacultyInToDB(
    facultyId,
    req.body,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'academic faculty is updated',
    data: result,
  });
});

export const academicFacultyController = {
  createAcademicFaculty,
  getAllAcademicFaculties,
  getSingleAcademicFaculty,
  updateAcademicFaculty,
};
