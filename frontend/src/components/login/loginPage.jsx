import 'bootstrap/dist/css/bootstrap.css';
import './login.css';
import React from 'react';
import AuthContext from "../AuthContext";
import { useNavigate } from "react-router-dom"
import { useContext } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBCheckbox,
  MDBIcon
}
from 'mdb-react-ui-kit';



const LoginPage = () => {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const sendSubmit = () => {
    navigate('/');
};
  const handleSubmit = e => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;
    if(username.length > 0 && loginUser(username, password) ){
     sendSubmit();
    };
  };

  return (
    <MDBContainer fluid className='p-5 '
    >

      <MDBRow>

        <MDBCol md='5' className='text-center text-md-start d-flex flex-column justify-content-center'>

          <h1 className="my-9 display-3 fw-bold ls-tight px-4">
            Set Up Your Event<br />
            <span className="text-primary"> Whith Us</span>
          </h1>

          <p className='px-3' style={{color: 'hsl(217, 10%, 50.8%)'}}>
           
          </p>

        </MDBCol>

        <MDBCol md='6'>
        <form  onSubmit={handleSubmit}>


          <MDBCard className='my-5'>
            <MDBCardBody className='p-5'>

              <MDBRow>
                 <p  className="text-center my-9 display-3 fw-bold ls-tight px-4"> Sign In:</p>
              </MDBRow>

              <MDBInput wrapperClass='mb-5'   type="text" name="username" id="username" placeholder='Email'/>
              <MDBInput wrapperClass='mb-4'   name="password" id="password" type='password' placeholder='Password'/>

              <div className='d-flex justify-content-center mb-4'>
                <MDBCheckbox name='flexCheck' value='' id='flexCheckDefault' label='Subscribe to our newsletter' />
              </div>

              <MDBBtn className='w-100 mb-4' size='md'>sign in</MDBBtn>

              <div className="text-center">

                <p>or sign up with:</p>

                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='facebook-f' size="sm"/>
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='twitter' size="sm"/>
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='google' size="sm"/>
                </MDBBtn>

                <MDBBtn tag='a' color='none' className='mx-3' style={{ color: '#1266f1' }}>
                  <MDBIcon fab icon='github' size="sm"/>
                </MDBBtn>

              </div>

            </MDBCardBody>
          </MDBCard>
 </form  >


        </MDBCol>

      </MDBRow>

    </MDBContainer>
  );
}

export default LoginPage;