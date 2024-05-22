import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import UpdateEventModal from "./UpdateEventModal";
import { getEvent, deleteEvent } from './EventService';
import AddEventModal from "./AddEventModal";
//import "frontend/src/App.css";
import useAxios from "../useAxios";
import axios from 'axios';
import { Link } from 'react-router-dom';

const CardEvent = () => {
    const [students, setStudents] = useState([]);
    const [profile, setProfile] = useState();
    const [searchName, setSearchName] = useState('');
    const [addModalShow, setAddModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [editEvent, seteditEvent] = useState([]);
    const [editProfile, setEditProfile] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);
    const [res, setRes] = useState("");
    const api = useAxios();

  useEffect(() => {

const fetchData = async () => {
      try {
        // Faire la première requête pour obtenir les données de "/test/"
        const testResponse = await api.get("/test/");
        const res = testResponse.data.response; // Récupérer la réponse
  
        // Utiliser la réponse pour faire la deuxième requête
        const profileResponse = await axios.get(
          `http://127.0.0.1:8000/api/profile/${res}/`
        );
  
        // Mettre à jour l'état avec les données obtenues
        setRes(res);
        setProfile(profileResponse.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setRes("Something went wrong");
      }
    };
    fetchData();
    
       let mounted = true;
       if(students.length && !isUpdated) {
        return;
        }
       getEvent()
         .then(data => {
           if(mounted) {
             setStudents(data);
           }
         })
       return () => {
          mounted = false;
          setIsUpdated(false);
       }
     }, [isUpdated, students])

     const handleUpdate = (e, stu,id_profile) => {
        e.preventDefault();
        setEditModalShow(true);
        seteditEvent(stu);
        setEditProfile(id_profile);
    };
    const handleDelete = (e, studentId) => {
        if(window.confirm('Are you sure ?')){
            e.preventDefault();
            deleteEvent(studentId)
            .then((result)=>{
                alert(result);
                setIsUpdated(true);
            },
            (error)=>{
                alert("Failed to Delete Student");
            })
        }
    };
    const handleAdd = (e,id_profile) => {
      e.preventDefault();
      setAddModalShow(true);
      setEditProfile(id_profile)

  };

  let AddModelClose=()=>setAddModalShow(false);
  

    let EditModelClose=()=>setEditModalShow(false);
    const filteredEvents = students.filter(crs => crs.organizer == res);

  return(
   <div className="container-fluid side-container" >

   <h1 class="par">Events List</h1>
   <div className="container11">
                    <Button  className="top-right-button"  variant="primary" onClick={event => handleAdd(event,res)}>
                       Add Event
                    </Button>
                <AddEventModal show={addModalShow} profile={editProfile} setUpdated={setIsUpdated}
                onHide={AddModelClose}></AddEventModal>
        </div>

   <div className="row side-row divstu" >
    <p id="before-table"></p>

     {filteredEvents.map((stu) =>
     <Card class="card" style={{ width: '20rem' }}>

        <Link to={`/classroom/${stu.id}`}>                      
        <Card.Img class="cardImage " variant="top" src={"http://127.0.0.1:8000"+stu.image}  /> 
        </Link>
      <Card.Body>
        <Card.Title>Title : {stu.title.substring(0, 20)+"..."}  </Card.Title>
       <Card.Title>Status : {stu.status}  </Card.Title>
        <Card.Text>Description  : {stu.description.substring(0, 20)+"..."}  </Card.Text>
        
        
        <Button className="mr-1" variant="primary" style={{width:"150px"}}
                    onClick={event => handleUpdate(event,stu,res)}>
                        Edit
                  </Button>
                  <UpdateEventModal show={editModalShow} profile={editProfile} event={editEvent} setUpdated={setIsUpdated}
                              onHide={EditModelClose}></UpdateEventModal>
                    <p></p>
        <Button className="mr-1" variant="danger" style={{width:"150px" }}
                    onClick={event => handleDelete(event,stu.id)}>
                        Delete
                  </Button>
      </Card.Body>
    </Card>)}



    </div>
  </div>
  );
};

export default CardEvent;