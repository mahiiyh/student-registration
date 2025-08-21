import axios from "axios";
import type { Student } from "../../core/entities/Student";

const API_URL = "http://localhost:5282/api/students";

export const registerStudentApi = async (student: Student) => {
    return await axios.post(API_URL, student);
};

export const getAllStudentsApi = async () => {
    return await axios.get<Student[]>(API_URL);
};
