import { z } from 'zod';

const createAcademicFacultyValidatinSchema = z.object({
  body: z.object({
    name: z.string({
      invalid_type_error: 'Academic faculty must be string.',
    }),
  }),
});
const updateAcademicFacultyValidatinSchema = z.object({
  body: z
    .object({
      name: z.string({
        invalid_type_error: 'Academic faculty must be string.',
      }),
    })
    .optional(),
});
export const academicFacultyValidatin = {
  createAcademicFacultyValidatinSchema,
  updateAcademicFacultyValidatinSchema,
};
