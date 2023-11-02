import { Navbar, Nav, Container, NavDropdown } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { useAdminLogoutMutation } from '../slice/adminApiSlice';
// import { adminLogout } from '../slice/adminAuthSlice'
import React from "react";
import { useNavigate } from "react-router-dom";


const AdminHeader = () => {
  
 return (
   <header>
     <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
       <Container>
         <Navbar.Brand href="/admin">MERN App</Navbar.Brand>
         <Navbar.Toggle aria-controls="basic-navbar-nav" />
         <Navbar.Collapse id="basic-navbar-nav">
           <Nav className="ms-auto">
             <Nav.Link href="/admin/login">
               <FaSignInAlt /> Sign In
             </Nav.Link>
             <Nav.Link href="/admin/register">
               <FaSignOutAlt /> Sign Up
             </Nav.Link>
           
           </Nav>
         </Navbar.Collapse>
       </Container>
     </Navbar>
   </header>
 );
};

export default AdminHeader;