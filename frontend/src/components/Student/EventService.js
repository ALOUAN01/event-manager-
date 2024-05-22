import axios from 'axios';

export function getEvent() {
  return axios.get('http://127.0.0.1:8000/api/events/')
    .then(response => response.data)
}

export function deleteEvent(studentId) {
  return axios.delete('http://127.0.0.1:8000/api/event/' + studentId + '/', {
   method: 'DELETE',
   headers: {
     'Accept':'application/json',
     'Content-Type':'application/json'
   }
  })
  .then(response => response.data)
}




