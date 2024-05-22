import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { MDBBadge, MDBBtn, MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import {Button,ButtonToolbar } from 'react-bootstrap';
import { RiDeleteBin5Line } from 'react-icons/ri';
import { FaEdit } from 'react-icons/fa';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import {deleteClass} from './ClassroomService';
import { useNavigate } from "react-router-dom"
import UpdateClassroomModal from "./UpdateClassroomModal"
import UpdateEventModal from '../Student/UpdateEventModal';
import { deleteEvent } from '../Student/EventService';

const Classroom = () => {
const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [moduleId, setmoduleId] = useState([]);
  const [students1, setStudents1] = useState([]);
  const [modules1, setModules1] = useState([]);
  const [classes, setClasses] = useState([]);
  const [modules, setModules] = useState([]);
  const [studentId, setStudentId] = useState('');
  const [classId, setClassId] = useState('');
  const [isUpdated, setIsUpdated] = useState(false);
  const [afficherDiv1, setAfficherDiv1] = useState(false);
  const [afficherDiv2, setAfficherDiv2] = useState(false);
  const [editModalShow, setEditModalShow] = useState(false);
  const {class_name}  = useParams();
  const [editClass, setEditClass] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [selectedModules, setSelectedModule] = useState([]);
  const handleClick1 = () => {
    setAfficherDiv1(!afficherDiv1); // Inverser la valeur actuelle de afficherDiv
  };
   const handleClick2 = () => {
    setAfficherDiv2(!afficherDiv2); // Inverser la valeur actuelle de afficherDiv
  };

   useEffect(() => {
    const fetchData0 = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/event/" +class_name+ "/"
        );
        setClasses(response.data);
        setStudents(response.data.students);
        
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchData1 = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/api/students/"
        );
        setStudents1(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    const fetchData2 = async () => {
      try {
        const response = await axios.get(
          "http://127.0.0.1:8000/module/"
        );
        setModules(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData0();
    fetchData1();
    fetchData2();

  }, []);
   const handleDelete = (e) => {
        if(window.confirm('Are you sure ?')){
            e.preventDefault();
           deleteEvent(class_name)
            .then((result)=>{
                alert(result);
                setIsUpdated(true);
                navigate('/cardEvent')
            },
            (error)=>{
                alert("Failed to Delete Student");
            })

        }
    };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
        // Envoyer la requête d'ajout pour chaque étudiant sélectionné
        for (const selectedStudentId of selectedStudents) {
            await axios.post('http://127.0.0.1:8000/api/subscription/', {
                student: selectedStudentId,
                event: class_name,
            });
            }
        window.location.reload();
    } catch (error) {

    }
  };
  const handleFormModuleSubmit = async (e) => {
    e.preventDefault();
    try {
    for (const selectedModuleId of selectedModules) {
        await axios.post('http://127.0.0.1:8000/classmodule/', {
        module: selectedModuleId,
        student_class: class_name,
      });
      }
        window.location.reload();
    } catch (error) {

    }
  };

  const removeStudentFromClass = (studentId, classId) => {
     try {
      axios.delete(  'http://127.0.0.1:8000/api/api/student/'+studentId+'/class/'+classId+'/delete/');
        window.location.reload();
      } catch (error) {
      console.error("Error deleting student from class:", error);
    }
  }

  const removeModuleFromClass = (studentId, classId) => {
     try {
      axios.delete(  'http://127.0.0.1:8000/api/class/'+studentId+'/module/'+classId+'/delete/');
        window.location.reload();

      } catch (error) {
      console.error("Error deleting student from class:", error);
    }
  }
  const handleUpdate = (e, stu) => {
        e.preventDefault();
        setEditModalShow(true);
        setEditClass(stu);
    };
    let EditModelClose=()=>setEditModalShow(false);
  return (
    <div className="container-fluid side-container ">
    <div className="container12">
    <h1 class="par">{classes.title}</h1>
             <button class="button"  onClick={event => handleDelete(event)} >
                <svg viewBox="0 0 448 512" class="svgIcon">
                <path d="M135.2 17.7L128 32H32C14.3 32 0 46.3 0 64S14.3 96 32 96H416c17.7 0 32-14.3 32-32s-14.3-32-32-32H320l-7.2-14.3C307.4 6.8 296.3 0 284.2 0H163.8c-12.1 0-23.2 6.8-28.6 17.7zM416 128H32L53.2 467c1.6 25.3 22.6 45 47.9 45H346.9c25.3 0 46.3-19.7 47.9-45L416 128z"></path></svg>
             </button>

             <DropdownButton id="dropdown-item-button " className="top-right-button2" title="ACTIONS">
                  <Dropdown.Item as="button" onClick={event => handleUpdate(event,classes)}>Update Information <FaEdit /></Dropdown.Item>
                  <UpdateEventModal show={editModalShow}  event={editClass} setUpdated={setIsUpdated}
                              onHide={EditModelClose}></UpdateEventModal>
                  <Dropdown.Item as="button"  onClick={handleClick1} >Edit Students</Dropdown.Item>
                 
             </DropdownButton>
       </div>

      <div className="row side-row" >
        <div class="divStudent" style={{ display: 'flex', alignItems: 'center', }}>
            <img style={{ width:'300px', height: '300px', }}
              className='rounded-circle'
              src={"http://127.0.0.1:8000" + classes.image}
              alt=''
            />
            <div style={{ marginLeft: '100px' }}>
              <h1 style={{ marginLeft: '150px' }} >{`${classes.title}`} </h1>
              <p className="parinfo">Organizer :    {classes.organizer}</p>
              <p className="parinfo">Description :    {classes.description}</p>
              <p className="parinfo">event_type:    {classes.event_type}</p>
              <p className="parinfo">start_date :    {classes.start_date}</p>
              <p className="parinfo">end_date :    {classes.end_date}</p>
              <p className="parinfo">Needs:    {classes.needs}</p>
              <p className="parinfo">Status :    {classes.status}</p>
            </div>
        </div>
            {afficherDiv1 &&<div class=" divform">
                <form class="formclass" onSubmit={handleFormSubmit}>
                  <label className='fw-bold mb-1' >Students:</label>
                  <select class="form-select" aria-label="Default select example" id="student" multiple={true}  value={selectedStudents} onChange={(e) => setSelectedStudents(Array.from(e.target.selectedOptions, option => option.value))}>
                      <option value="">Select a student to add to the Event</option>
                         {students1.map((student) => (
                           <option key={student.studentId} value={student.studentId}>
                              {student.FirstName} {student.LastName}
                           </option>
                         ))}
                   </select>
                  <p></p>
                  <ButtonToolbar>
                     <Button variant="primary"  type="submit" >
                        Add
                     </Button>
                     <Button variant="danger"  onClick={handleClick1} type="submit" style={{ marginLeft : '150px'}} >
                        Close
                     </Button>
                  </ButtonToolbar>
                </form>
            </div>}
            {afficherDiv2 &&<div class=" divform">
                <form class="formclass" onSubmit={handleFormModuleSubmit}>
                  <label className='fw-bold mb-1' >Modules:</label>
                  <select class="form-select" aria-label="Default select example" id="module"  multiple={true} value={selectedModules} onChange={(e) => setSelectedModule(Array.from(e.target.selectedOptions, option => option.value))}>
                      <option value="">Select a module </option>
                         {modules.map((module) => (
                           <option key={module.id} value={module.id}>
                               {module.title}
                           </option>
                         ))}
                   </select>
                  <p></p>
                  <ButtonToolbar>
                     <Button   type="submit" >
                     Add
                     </Button>
                     <Button variant="danger"  onClick={handleClick2} type="submit" style={{ marginLeft : '150px'}} >
                        Close
                     </Button>
                  </ButtonToolbar>

                </form>
            </div>}
        <p></p>

        <label className='fw-bold mb-1'style={{ fontSize: '24px' }}>Students List :</label>
        <MDBTable align='middle' hover >
                <MDBTableHead dark>
                    <tr>
                      <th scope='col'>Name</th>
                      <th scope='col'>Academic Level</th>
                      <th scope='col'>Action</th>
                    </tr>
                </MDBTableHead>
             <MDBTableBody>
                  { students.map((stu) =>
                  <tr key={stu.id}>
                  <td   >
                    <div className='d-flex align-items-center'>
                        <img  className='rounded-circle' src={"http://127.0.0.1:8000"+stu.image} alt='' style={{ width: '45px', height: '45px' }}  ></img>
                        <div className='ms-3'>
                            <p className='fw-bold mb-1'>{stu.LastName} {stu.FirstName} </p>
                            <p className='text-muted mb-0'>{stu.Email}</p>
                          </div>
                    </div>
                  </td>
                  <td>
                  <p className='fw-normal mb-1'>{stu.academic_level}</p>
                  </td>
                    <td>
                  <Button className="mr-2" variant="danger"
                    onClick={() => removeStudentFromClass(stu.studentId, classes.id)}>
                        <RiDeleteBin5Line />
                  </Button>
                  <span>&nbsp;&nbsp;&nbsp;</span>
                 </td>
                 </tr>)}
             </MDBTableBody>
        </MDBTable>


      </div>
    </div>







  );
};

export default  Classroom;
