import { RequestHandler } from 'express';
import { userServices } from './user.service';
import sendResponse from '../../utilities/sendResponse';
import httpStatus from 'http-status';
import catchAsync from '../../utilities/catchAsync';

const createStudent: RequestHandler = catchAsync(async (req, res) => {
  const { password, student: studentData } = req.body;

  // const zodParseData = studentZodValidationSchema.parse(studentData);

  const result = await userServices.createStudentIntoDB(password, studentData);

  // res.status(200).json({
  //   success: true,
  //   message: 'Student is created successfully',
  //   data: result,
  // });
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Student is created successfully',
    data: result,
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
});

export const userController = {
  createStudent,
};
