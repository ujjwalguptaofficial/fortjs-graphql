import { StudentService } from "../services/student_service";

var getStudent = function (args) {
    var id = args.id;
    return new StudentService().getStudent(id);
};

var getStudents = function (args) {
    var country = args.country;
    return new StudentService().getStudentsByCountry(country);
};

export const resolver = {
    student: getStudent,
    students: function () {
        return new StudentService().students;
    },
    studentsByContry: function ({ country }) {
        return new StudentService().getStudentsByCountry(country);
    }
};