import { Container,  Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom"
import React from "react"



export const  Header = ({user, handleLogOut}) => {
    const linkStyle = {
        padding : 10,
        textDecoration: "none",
        fontFamily: "Arial",
        color: "#1B82D3",
        fontWeight: "600",
      }
      const headerStyle = {
        position: "sticky",
        minHeight:" 100px",
        top: 0,
        zIndex: 999,
        background: "white",
        boxShadow: "rgba(6, 24, 44, 0.4) 0px 0px 0px 2px, rgba(6, 24, 44, 0.65) 0px 4px 6px -1px, rgba(255, 255, 255, 0.08) 0px 1px 0px inset"
      }
    
      
        if (user === null){
            return <div style={headerStyle}>
                    <div style={{ marginBottom: "100px", marginLeft: "20%", marginTop: "30px", float: "left", width: "60%"}}>
                    <Row style={{ width: "35%"}}>
                        <Col><Link style={linkStyle} to="/">Home</Link></Col>
                        <Col><Link style={linkStyle} to="/login">Login</Link></Col>
                        <Col><Link style={linkStyle} to="/registration">Register</Link></Col>
                    </Row>
                    </div>
                </div>
          }
          else 
          {
            return <div style={headerStyle}>
                 <div style={{paddingBottom: "20px", marginLeft: "8%"}}>Logged as: <b>{user.username} </b> <Link style={linkStyle} onClick={handleLogOut}>Log Out</Link></div>
                 <div style={{marginLeft: "20%", float: "left", width: "60%"}}>
                 <Link style={linkStyle} to="/">Home</Link>
                 <Link style={linkStyle} to="/newnote">New Post</Link>
                 <Link style={linkStyle} to="/profile">Profile</Link>
                 
          
                </div>
          
                </div>
}}




