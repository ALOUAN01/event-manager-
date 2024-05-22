import React from 'react';
import "../App.css";
import logo from '../static/logo1.png';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBSidebarFooter,
} from 'cdbreact';
import { NavLink } from 'react-router-dom';
import { useContext } from "react";
import AuthContext from "./AuthContext";
import {Modal, Col, Row, Form, Button } from 'react-bootstrap';

const Navigation = () => {
  const { user, logoutUser } = useContext(AuthContext);

  return (
    <>
      <Navbar bg="dark" variant="dark" expand="lg" id="my-nav" className="custom-navbar">
        <Navbar.Brand className="logo" href="/">
          <img
            src={logo}
            width="150"
            height="40"
            className="d-inline-block align-center"
            alt="React Bootstrap logo"
          />{' '}
        </Navbar.Brand>
        <Container>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
            </Nav>
            <Nav>
              {user ? (
                <>
                  <Nav.Link href="/Login">
                    <Button  className="btn btn-dark" onClick={logoutUser}>Logout</Button>
                  </Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link href="/login">Login</Nav.Link>
                  <Nav.Link href="/register">Register</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <div className='sidebar'>
        {user ? (
          <>
            <CDBSidebar textColor="#333" backgroundColor="#fff" >
              <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
                <a href="/" className="text-decoration-none" style={{ color: 'inherit' }}>
                  Navigate
                </a>
              </CDBSidebarHeader>

              <CDBSidebarContent className="sidebar-content">
                <CDBSidebarMenu >
                  <NavLink exact to="/" activeClassName="activeClicked" >
                    <CDBSidebarMenuItem icon="university" className="sidebar-item">Home</CDBSidebarMenuItem>
                  </NavLink>
                  <NavLink exact to="/cardEvent" activeClassName="activeClicked">
                    <CDBSidebarMenuItem icon="list" className="sidebar-item">Events List</CDBSidebarMenuItem>
                  </NavLink>
                  <NavLink exact to="/manage" activeClassName="activeClicked">
                    <CDBSidebarMenuItem icon="user" className="sidebar-item">Manager</CDBSidebarMenuItem>
                  </NavLink>
                  <NavLink exact to="/managestudent" activeClassName="activeClicked">
                    <CDBSidebarMenuItem icon="list" className="sidebar-item">Students List</CDBSidebarMenuItem>
                  </NavLink>
                  
                  
                  
                </CDBSidebarMenu>
              </CDBSidebarContent>

              <CDBSidebarFooter style={{ textAlign: 'center' }}>
                <div
                  style={{
                    padding: '20px 5px',
                  }}
                >
                  <img
                    src={logo}
                    width="250"
                    height="50"
                    className="d-inline-block align-center"
                    alt="React Bootstrap logo"
                  />{' '}
                </div>
              </CDBSidebarFooter>
            </CDBSidebar>
          </>
        ) : (<></>)
        }
      </div>
    </>
  );
};

export default Navigation;
