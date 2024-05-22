import React from 'react';
import {Modal, Col, Row, Form, Button } from 'react-bootstrap';
import {FormControl, FormGroup, FormLabel} from 'react-bootstrap';
import { addStudent } from './EventService';
import{ useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom"

const AddEventModal = (props) => {


           const[image,setImage] = useState(null)
           const[Title,setTitle] = useState("")
           
           const[Description,setDescription] = useState("")
           const[Committee,setCommittee] = useState("")
           const[Event_type,setEvent_type] = useState("")
           const[Start_date,setStart_date] = useState("")
           const[end_date,setend_date] = useState("")
           const[Needs,setNeeds] = useState("")
           
           const [errorMessage, setErrorMessage] = useState("");
           const navigate = useNavigate();

        const AddStudentInfo = async () => {
            if (!Title ||  !Description || !Committee || !Start_date || !end_date || !Needs ||  !image) {
            setErrorMessage("Please complete all required fields.....");
            return;
        }
            let formField = new FormData()
            formField.append('title', Title)
            formField.append('description', Description)
            formField.append('organizer', props.profile)
            formField.append('committee', Committee)
            formField.append('start_date', Start_date)
            formField.append('event_type', Event_type)
            formField.append('end_date', end_date)
            formField.append('needs', Needs)
            formField.append('status', 'pending')

            if(image !== null){
                formField.append('image', image)
            }
            await axios({
                method: 'post',
                url: 'http://127.0.0.1:8000/api/events/',
                data: formField
            }).then((response) => {
                console.log(response.data)
                navigate('/cardEvent')

            })
            window.location.reload();


}
       const handleBlur = (e) => {

        if (e.target.name === 'Title' && e.target.value.length < 3) {
            setErrorMessage("Le prénom doit contenir au moins 3 caractères.");
        }
        else
        setErrorMessage("");

    };








    return(
        <div className="container">

            <Modal
                {...props}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered >

                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Fill In Event Information {props.profile}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Row>
                        <Col sm={6}>
                            <div className="form-group">
                            {errorMessage && <div className="text-danger">{errorMessage}</div>}
                                <div className="form-group" >
                                    <label>Title</label>
                                    <input  class="form-control group " type="text" name="Title" value={Title} onChange={(e) => setTitle(e.target.value)  } onBlur={handleBlur}/>
                                </div>
                                

                                <div className="form-group">
                                    <label>Description</label>
                                    <input  class="form-control group "  type="text" name="Description"  value={Description} onChange={(e) => setDescription(e.target.value)  } />
                                </div>
                                <div className="form-group">
                                    <label>Committee</label>
                                    <input  class="form-control group "  type="text" name="Committee" value={Committee} onChange={(e) => setCommittee(e.target.value)  } />
                                </div>
                                <div className="form-group">
                                    <label>Event Type</label>
                                    <input  class="form-control group "  type="text" name="Event_type" value={Event_type} onChange={(e) => setEvent_type(e.target.value)  } />
                                </div>
                                <div className="form-group">
                                    <label>Start_date</label>
                                    <input  class="form-control group "  type="date" name="Start_date" value={Start_date} onChange={(e) => setStart_date(e.target.value)  } />
                                </div>
                                <div className="form-group">
                                    <label>End_date</label>
                                    <input  class="form-control group "  type="date" name="end_date" value={end_date} onChange={(e) => setend_date(e.target.value)  } />
                                </div>
                                <div className="form-group">
                                    <label>Needs</label>
                                    <input  class="form-control group "  type="text" name="Needs" value={Needs} onChange={(e) => setNeeds(e.target.value)  } />
                                </div>
                               
                               
                                <div className="form-group">
                                    <label>Image</label>
                                    <input  class="form-control group "  type="file" name="image"  onChange={(e) => setImage(e.target.files[0])  } />
                                </div>
                                <div className="form-group">
                                    <p></p>
                                    <Button variant="primary" onClick={AddStudentInfo}  >
                                      Submit
                                    </Button>

                                </div>
                            </div>
                        </Col>
                    </Row>
                </Modal.Body>
                <Modal.Footer>
                <Button variant="danger" type="submit" onClick={props.onHide} >
                        Close
                </Button>

                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default AddEventModal;