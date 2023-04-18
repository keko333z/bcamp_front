import React from "react"
import { Container, Row, Col } from "react-bootstrap"




export const Footer = () => {
   
      
    return <Container className="footerStyle">
            
                     
                        <Col xs={1} >
                            <Row >NodeJS</Row>
                            <Row>MongoDB</Row>
                            <Row>Mongoose</Row>
                        </Col>
                        <Col xs={1}>
                            <Row>Express</Row>
                            <Row>Apollo Server</Row>
                            <Row>GraphQL</Row>
                        </Col>
                        <Col xs={2} >
                            <Row>ReactJS</Row>
                            <Row>Axios</Row>
                            <Row>Apollo Client</Row>
                            <Row>React Router</Row>
                        </Col>
                        <Col xs={3}>
                            <Row> Mariano Nuñez  </Row>
                            <Row> marianojnz@gmail.com  </Row>
                            <Row> 2023  </Row>
                        </Col>
                    
            
        </Container>
        
}