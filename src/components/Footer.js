import React from "react"
import { Container, Row, Col } from "react-bootstrap"




export const Footer = () => {
   
      
    return <div className="footerStyle">
            <Container fluid="md">
                    <Row  className="justify-content-center">
                        <Col xs={2} >
                            <Row >NodeJS</Row>
                            <Row>MongoDB</Row>
                            <Row>Mongoose</Row>
                        </Col>
                        <Col xs={2}>
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
                        <Col xs={4}>
                            <Row className="justify-content-start"> Mariano Nuñez  </Row>
                            <Row className="justify-content-start"> marianojnz@gmail.com  </Row>
                        </Col>
                    </Row>
            </Container>
        </div>
        
}