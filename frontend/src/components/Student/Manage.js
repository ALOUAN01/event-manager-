import React,{ useEffect, useState }from 'react';
import {MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';
import {Button,ButtonToolbar } from 'react-bootstrap';
import { FaEdit } from 'react-icons/fa';
import AddEventModal from "./AddEventModal";
import UpdateModal from "./UpdateModal";
import { getEvent} from './EventService';
import { Link } from 'react-router-dom';
import { useNavigate } from "react-router-dom"


const Manage = () => {
    const [students, setStudents] = useState([]);
    const [addModalShow, setAddModalShow] = useState(false);
    const [editModalShow, setEditModalShow] = useState(false);
    const [editEvent, setEditEvent] = useState([]);
    const [editProfile, setEditProfile] = useState([]);
    const [isUpdated, setIsUpdated] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
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

    const handleUpdate = (e, stu) => {
        e.preventDefault();
        setEditModalShow(true);
        setEditEvent(stu);
    };

    const handleAdd = (e) => {
        e.preventDefault();
        setAddModalShow(true);

    };



    let AddModelClose=()=>setAddModalShow(false);
    let EditModelClose=()=>setEditModalShow(false);

    return(
        <div className="container-fluid side-container ">
        <h1 class="par">Manage Events</h1>
        <div className="container11">
                    <Button  className="top-right-button"  variant="primary" onClick={handleAdd}>
                       Add Event
                    </Button>
                <AddEventModal show={addModalShow} setUpdated={setIsUpdated}
                onHide={AddModelClose}></AddEventModal>
        </div>
        <div className="row side-row " >

            <MDBTable align='middle' hover >
                <MDBTableHead dark>
                <tr  className='table-secondary' >
                  <th scope='col'>title</th>
                  <th scope='col'>organizer</th>
                  <th scope='col'>committee</th>
                  <th scope='col'>event_type</th>
                  <th scope='col'>start_date</th>
                  <th scope='col'>end_date</th>
                  <th scope='col'>status</th>
                  <th scope='col'>Action</th>
                </tr>
                </MDBTableHead>
                <MDBTableBody>
                  { students.map((stu) =>

                  <tr key={stu.id}>


                  <td >

                    <div className='d-flex align-items-center'>

                        <img  className='rounded-circle' src={"http://127.0.0.1:8000"+stu.image} alt='' style={{ width: '45px', height: '45px' }}  ></img>

                        <div className='ms-3'>
                        <Link to={`/StudentInfo/${stu.id}`} style={{ color: 'black' }} >
                            <p className='fw-bold mb-1' style={{ color: 'black' }} >{stu.title} </p>
                        </Link>
                            <p className='text-muted mb-0'>{stu.description.substring(0, 20)}</p>
                          </div>


                    </div>
                  </td>


                  <td>
                  <p className='fw-normal mb-1'>{stu.organizer}</p>
                  </td>
                  <td>
                  <p className='fw-normal mb-1'>{stu.committee}</p>
                  </td>

                  <td>
                  <p className='fw-normal mb-1'>{stu.event_type}</p>
                  </td>
                  <td>
                  <p className='fw-normal mb-1'>{stu.start_date}</p>
                  </td>
                  <td>
                  <p className='fw-normal mb-1'>{stu.end_date}</p>
                  </td>
                  <td>
                  <p className='fw-normal mb-1'>{stu.status}</p>
                  </td>



                  <td>


                  <span>&nbsp;&nbsp;&nbsp;</span>
                  <Button className="mr-2"
                    onClick={event => handleUpdate(event,stu)}>
                        <FaEdit />
                  </Button>
                  <UpdateModal show={editModalShow}  event={editEvent} setUpdated={setIsUpdated}
                              onHide={EditModelClose}></UpdateModal>
                </td>
                </tr>)}
              </MDBTableBody>
            </MDBTable>
          </div>
        </div>
    );
};

export default Manage;