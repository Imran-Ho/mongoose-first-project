import { TAcademicDepartment } from './academicDepartment.interface';
import { AcademicDepartment } from './academicDepartment.model';

const createAcademicDepartmentIntoDB = async (payLoad: TAcademicDepartment) => {
  // check deparment is existing or not.
  // const isDepartmentExist = await AcademicDepartment.findOne({
  //   name: payLoad.name,
  // });

  // if (isDepartmentExist) {
  //   throw new Error('Department is existing');
  // }
  const result = await AcademicDepartment.create(payLoad);
  return result;
};
const getAllAcademicDepartmentsFromDB = async () => {
  const result = await AcademicDepartment.find();
  return result;
};
const getSingleAcademicDepartmentFromDB = async (id: string) => {
  const result = await AcademicDepartment.findById(id);
  return result;
};
const updateAcademicDepartmentInToDB = async (
  id: string,
  payLoad: Partial<TAcademicDepartment>,
) => {
  const result = await AcademicDepartment.findOneAndUpdate(
    { _id: id },
    payLoad,
    {
      new: true,
    },
  );
  return result;
};

export const AcademicDepartmentService = {
  createAcademicDepartmentIntoDB,
  getAllAcademicDepartmentsFromDB,
  getSingleAcademicDepartmentFromDB,
  updateAcademicDepartmentInToDB,
};
