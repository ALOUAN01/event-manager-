
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navigation from "./components/Navigation";
import Home from "./components/Home";
import StudentInfo from "./components/Student/StudentInfo";
import Manage from "./components/Student/Manage";
import ManageStudent from "./components/Student/manageStudent"
import Manage_staff from "./components/Teacher/Manage_teacher";
import Dashboard from "./components/Dashboard";
import CardEvent from "./components/Student/CardEvent";
import ClassroomList from "./components/Classroom/ClassroomList";
import Manage_course from "./components/Course/Manage_course";
import Classroom from "./components/Classroom/Classroom";
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Manage_grade from "./components/Grade/Manage_grade";
import ModuleInf from "./components/Course/ModuleInf";
import { AuthProvider } from "./components/AuthContext";
import Register from "./components/login/registerPage";
import Login from "./components/login/loginPage";


function App() {
  return (
<BrowserRouter>
<AuthProvider>
     <Navigation />
       <Routes>
         <Route exact path="/" element={<Home/>} />
         <Route path="/dashboard" element={<Dashboard/>} />
         <Route path="/cardEvent" element={<CardEvent/>} />
         <Route path="/manage" element={<Manage/>} />
         <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
         <Route path="/manage_staff" element={<Manage_staff/>} />
         <Route path="/manage_course" element={<Manage_course/>} />
         <Route path="/classroomlist" element={<ClassroomList/>} />
         <Route path="/classroom/:class_name" element={<Classroom/>}/>
         <Route path="/StudentInfo/:studentid" element={<StudentInfo/>}/>
         <Route path="/ModuleInf/:moduleid" element={<ModuleInf/>}/>
         <Route path="/managestudent" element={<ManageStudent/>}/>




       </Routes>
       </AuthProvider>
</BrowserRouter>

  );
}

export default App;
