import axios from 'axios';

export function getStudents() {
  return axios.get('http://127.0.0.1:8000/api/students/')
    .then(response => response.data)
}

export function deleteStudent(studentId) {
  return axios.delete('http://127.0.0.1:8000/api/students/' + studentId + '/', {
   method: 'DELETE',
   headers: {
     'Accept':'application/json',
     'Content-Type':'application/json'
   }
  })
  .then(response => response.data)
}

/*export function addStudent(student){
  return axios.post('http://127.0.0.1:8000/students/', {
    studentId:null,
    FirstName:student.FirstName.value,
    LastName:student.LastName.value,
    Email:student.Email.value,
    Group:student.Group.value,

  })
    .then(response=>response.data)
}*/

export function updateStudent(stuid, student) {
  return axios.put('http://127.0.0.1:8000/students/' + stuid + '/', {
    FirstName:student.FirstName.value,
    LastName:student.LastName.value,
    Email:student.Email.value,
    academic_level:student.academic_level.value,
    date_of_birth:student.date_of_birth.value,
    Place_of_birth:student.Place_of_birth.value,
    Gender:student.Gender.value,
    address:student.address.value,

  })
   .then(response => response.data)
}

