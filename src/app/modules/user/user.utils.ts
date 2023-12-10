import { TAcademicSemester } from '../academicSemester/academicSemester.interface';
import { User } from './user.model';

// will increase id one by one
const findLastStudentId = async () => {
  const lastStudent = await User.findOne(
    {
      role: 'student',
    },
    {
      id: 1,
      _id: 0,
    },
  )
    .sort({
      createdAt: -1,
    })
    .lean();
  // 202401   0001
  return lastStudent?.id ? lastStudent.id.substring(6) : undefined;
};

// year, semesterCode, 4 digits number
export const generateStudentId = async (payLoad: TAcademicSemester) => {
  // first number 0000
  let currentId = (0).toString(); // by default 0000

  const lastStudentId = await findLastStudentId();
  // 2024 01 0001
  const lastStudentSemesterCode = lastStudentId?.substring(4, 6); // 01 semester code
  const lastStudentYear = lastStudentId?.substring(0, 4); // 2024
  const currentSemesterCode = payLoad.code;
  const currentYear = payLoad.year;

  if (
    lastStudentId &&
    lastStudentSemesterCode === currentSemesterCode &&
    lastStudentYear === currentYear
  ) {
    currentId = lastStudentId.substring(6);
  }

  let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');
  incrementId = `${payLoad.year}${payLoad.code}${incrementId}`;
  return incrementId;
  // console.log(await findLastStudentId());
};
