import { Request, Response } from 'express';
import { studentServices } from './student.service';

const createStudent = async (req: Request, res: Response) => {
  try {
    const { student: studentData } = req.body;

    // will call service func to send the data.
    const result = await studentServices.createStudentIntoDB(studentData);

    // send response.
    res.status(200).json({
      success: true,
      message: 'Student is created successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

// get all students
const getAllStudents = async (req: Request, res: Response) => {
  try {
    const result = await studentServices.getAllStudentsFromDB();

    // send response.
    res.status(200).json({
      success: true,
      message: 'Students are retrieved successfully',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

// get single student with id
const getSingleStudentWithID = async (req: Request, res: Response) => {
  try {
    const { studentID } = req.params;
    const result = await studentServices.getSingleStudentsFromDB(studentID);

    res.status(200).json({
      success: true,
      message: 'single student',
      data: result,
    });
  } catch (err) {
    console.log(err);
  }
};

export const StudentControllers = {
  createStudent,
  getAllStudents,
  getSingleStudentWithID,
};
