import React from "react";
import { Link } from "react-router-dom";
import { Col } from "react-bootstrap";
import { Row } from "react-bootstrap";


export const About = () => {

    

return <div className="about-container">
                       <h4>Este sitio fue creado usando: </h4> 
                    
                            <p>ReactJS</p> 
                            <p>NodeJS</p>
                            <p>MongoDB</p>
                            <p>Mongoose</p>                    
                            <p>Express</p>
                            <p>Apollo Server</p>
                            <p>GraphQL</p>
                            <p>Axios</p>
                            <p>Apollo Client</p>
                            <p>React Router</p>
                            <div >
                            <p style={{marginTop: "50px"}}> Se creo siguiendo el Bootcamp: <Link to="https://fullstackopen.com/es/">https://fullstackopen.com/es/</Link></p>
                            <p className="justify-content-start" style={{marginTop: "50px"}}> Mariano Nuñez - marianojnz@gmail.com  </p>
                            
                            <p className="justify-content-start"> 2022-2023  </p>
                            
                        </div>
                   

</div>




}