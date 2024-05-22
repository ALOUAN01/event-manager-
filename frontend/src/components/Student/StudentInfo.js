import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { FaEdit } from 'react-icons/fa';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import UpdateStudentModal from "./UpdateEventModal";
import {deleteEvent } from './EventService';
import { useNavigate } from "react-router-dom"
import { deleteGrade, deleteAbsence } from '../Grade/GradeService.js';
import UpdateGradeModal from "./UpdateGradeModal";
import UpdateAbsenceModal from "./UpdateAbsenceModal";
import AddAbsenceModal from "./AddAbsenceModal";

const StudentInfo = ({ studentId }) => {


  const navigate = useNavigate();
  const [grades, setGrades] = useState([]);
  const [absences, setAbsences] = useState([]);
  const [students, setStudents] = useState([]);
  const [modules, setModules] = useState([]);
  const [addModalShow, setAddModalShow] = useState(false);
  const [addModalShowGrade, setAddModalShowGrade] = useState(false);
  const [addModalShowAbsence, setAddModalShowAbsence] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const [editModalShow1, setEditModalShow1] = useState(false);
  const [editModalShow2, setEditModalShow2] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [editStudent, setEditStudent] = useState([]);
  const [editGrade, setEditGrade] = useState([]);
  const {studentid}  = useParams();

  useEffect(() => {
    
    const fetchData1 = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/event/"+ studentid +"/"
        );
        setStudents(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData1();
  
  }, []);


const handleUpdate = (e, stu) => {
        e.preventDefault();
        setEditModalShow(true);
        setEditStudent(stu);
    };
    const handleDelete = (e, studentId) => {
        if(window.confirm('Are you sure ?')){
            e.preventDefault();
            deleteEvent(studentId)
            .then((result)=>{
                alert(result);
                setIsUpdated(true);
                navigate('/manage')
            },
            (error)=>{
                alert("Failed to Delete Student");
            })

        }
    };
    
 
 let EditModelClose=()=>setEditModalShow(false);
 


  return (
  <div className="container-fluid side-container">

        <div className="container12">
             <button class="button "  onClick={event => handleDelete(event,students.studentId)}>
                <svg viewBox="0 0 448 512" class="svgIcon">
                <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg>
             </button>

             <DropdownButton id="dropdown-item-button " className="top-right-button" title="ACTIONS">
                  <Dropdown.Item as="button" onClick={event => handleUpdate(event,students)}>Update Information <FaEdit /></Dropdown.Item>
                  <UpdateStudentModal show={editModalShow} student={editStudent} setUpdated={setIsUpdated}
                              onHide={EditModelClose}></UpdateStudentModal>
                  
                
                  <Dropdown.Item as="button"  onClick={event => handleDelete(event,students.id)}>Delete</Dropdown.Item>
             </DropdownButton>
       </div>


        <div class="divStudent" style={{ display: 'flex', alignItems: 'center', }}>
          <img style={{ width:'300px', height: '300px', }}
            className='rounded-circle'
            src={"http://127.0.0.1:8000" + students.image}
            alt=''

          />
          <div style={{ marginLeft: '100px' }}>
            <h1 style={{ marginLeft: '150px' }} >{`${students.title}`} {studentid} </h1>
        
            <p className="parinfo">Organizer : {students.organizer}</p>
            <p className="parinfo">Description : {students.description}</p>
            <p className="parinfo">event_type: {students.event_type}</p>
            <p className="parinfo">start_date : {students.start_date}</p>
            <p className="parinfo">end_date : {students.end_date}</p>
            <p className="parinfo"> Needs: {students.needs}</p>
            <p className="parinfo">Status : {students.status}</p>
          </div>
        </div>



      


      


  </div>
  );
};

export default StudentInfo;
