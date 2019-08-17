import { StudentService } from "../services/student_service";

const getStudent = (args) => {
    const id = args.id;
    return new StudentService().getStudent(id);
};

const getStudents = (args) => {
    const country = args.country;
    return new StudentService().getStudentsByCountry(country);
};

export const resolver = {
    student: getStudent,
    students: () => {
        return new StudentService().students;
    },
    studentsByContry: ({ country }) => {
        return new StudentService().getStudentsByCountry(country);
    }
};