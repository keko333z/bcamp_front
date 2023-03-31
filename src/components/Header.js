import {  Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import React from "react"



export const  Header = ({user, handleLogOut}) => {
   
    
      
        if (user === null){
            return <div className="header-style">
                    <div style={{ marginBottom: "30px", marginLeft: "20%", marginTop:"30px", float: "left",  width: "80%"}}>
                    <Row style={{ width: "35%"}}>
                        <Col><Link className="header-link-style"  to="/">Home</Link></Col>
                        <Col><Link className="header-link-style" to="/login">Login</Link></Col>
                        <Col><Link className="header-link-style" to="/registration">Register</Link></Col>
                        <Col><Link className="header-link-style" to="/about">About</Link></Col>
                    </Row>
                    </div>
                </div>
          }
          else 
          {
            return <div className="header-style">
                 <div style={{paddingBottom: "20px", marginLeft: "8%"}}>Logged as: <b>{user.username} </b> <Link className="header-link-style" onClick={handleLogOut}>Log Out</Link></div>
                 <div style={{marginLeft: "20%", float: "left", width: "60%"}}>
                 <Link className="header-link-style" to="/">Home</Link>
                 <Link className="header-link-style" to="/newnote">New Post</Link>
                 <Link className="header-link-style" to="/profile">Profile</Link>
                 <Link className="header-link-style" to="/about">About</Link>
          
                </div>
          
                </div>
}}




