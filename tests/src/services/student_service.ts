var students = [{
    id: 1,
    name: 'Alfreds',
    gender: 'male',
    country: 'Germany',
    city: 'Berlin'
},
{
    id: 2,
    name: 'george',
    gender: 'male',
    country: 'America',
    city: 'xyx'
},
{
    id: 3,
    name: 'Berglunds',
    gender: 'female',
    country: 'Sweden',
    city: 'Luleå'
},
{
    id: 4,
    name: 'Eastern',
    gender: 'male',
    country: 'Canada',
    city: 'qwe'
}];
export class StudentService {
    getStudent(id) {
        return students.filter(student => {
            return student.id == id;
        })[0];
    }

    getStudentsByCountry(country) {
        if (country) {
            return students.filter(course => course.country === country);
        }
        return []
    }

    get students() {
        return students;
    }
}