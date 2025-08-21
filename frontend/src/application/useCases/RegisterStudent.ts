import type { Student } from "../../core/entities/Student";
import { registerStudentApi } from "../../infrastructure/api/studentApi.ts";

export const registerStudent = async (student: Student) => {
    return await registerStudentApi(student);
};
