import React from 'react';
import {Modal, Col, Row, Form, Button } from 'react-bootstrap';
import {FormControl, FormGroup, FormLabel} from 'react-bootstrap';
import { addStudent } from './EventService';
import{ useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom"

const UpdateModal = (props) => {

    const[image,setImage] = useState(null)
    const[Title,setTitle] = useState("")
    
    const[Description,setDescription] = useState("")
    const[Status,setStatus] = useState("")
    const[Committee,setCommittee] = useState("")
    const[Event_type,setEvent_type] = useState("")
    const[Start_date,setStart_date] = useState("")
    const[end_date,setend_date] = useState("")
    const[Needs,setNeeds] = useState("")
           const [errorMessage, setErrorMessage] = useState("");
           const navigate = useNavigate();

    useEffect(() => {
    // Effectuer la requête GET pour récupérer les informations de l'étudiant
       axios
      .get(`http://127.0.0.1:8000/api/event/${props.event.id}/`)
      .then((response) => {
        const Data = response.data;
        setTitle(Data.title);
        setDescription(Data.description);
        setCommittee(Data.committee);
        setEvent_type(Data.event_type);
        setStart_date(Data.start_date);
        setend_date(Data.end_date);
        setNeeds(Data.needs);
        setStatus(Data.status);
        

      })
      .catch((error) => {
        console.error('Erreur lors de la récupération des données de l\'étudiant', error);
      });
  }, [props.event.id]);

       const UpdateStudentInfo = async () => {


            
           const isConfirmed = window.confirm('Are you sure you want to update the student information?');
            if (isConfirmed) {
            let formField = new FormData()
            formField.append('title', Title)
            formField.append('description', Description)
            formField.append('organizer',props.event.organizer)
            formField.append('committee', Committee)
            formField.append('start_date', Start_date)
            formField.append('event_type', Event_type)
            formField.append('end_date', end_date)
            formField.append('needs', Needs)
            formField.append('status', Status)



            

            if(image !== null){
                formField.append('image', image)
            }
            await axios({
                method: 'put',
                url: 'http://127.0.0.1:8000/api/event/'+ props.event.id + '/',
                data: formField
            }).then((response) => {
                console.log(response.data)


            })
            window.location.reload();
      }
else return



}



    return(
        <div className="container">

            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered >

                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Update Event Information{props.event.organizer}///{props.event.id} 
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <div className="form-group">
                            {errorMessage && <div className="text-danger">{errorMessage}</div>}
                           
                                
                                <div className="form-group">
                                    <label>Status</label>
                                    <select className="form-control form-select"value={Status} onChange={(e) => setStatus(e.target.value)}>
                                        <option value="">Select Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="accepted">Accepted</option>
                                        <option value="rejected">Rejected</option>
                                    </select>
                                </div>
                                
                                
                                <div className="form-group">
                                    <p></p>
                                    <Button variant="primary" onClick={UpdateStudentInfo}  >
                                      Submit
                                    </Button>

                                </div>
                            </div>
                        </Col>
                    </Row>
                </Modal.Body>
               <Modal.Footer>
                 <Button variant="danger" type="submit" onClick={props.onHide}>
                        Close
                 </Button>
               </Modal.Footer>
            </Modal>
        </div>
    );
};


export default UpdateModal;

