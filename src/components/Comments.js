import { Container, Row, Col } from "react-bootstrap"
import React from 'react'


import {Spinner} from "react-bootstrap"






const commentsContainerStyle = {
    borderTop: "3px solid grey",
    marginTop: "50px",
    marginBottom: "20px",
    minHeight: "100px"
}

const commentRowStyle = {
    marginLeft:"10%",
    background: "#D9FABC",
    marginTop: "2px",
    borderRadius: "5px",
    border: "1px solid grey",
    width: "80%"
}



export const Comments = ({ comments }) => {
     
    
    

     if(!comments){
        return <>
        
        <Spinner animation="border" role="status" variant="success" > </Spinner>
        </>
     } else{


    return (
        <Container style={commentsContainerStyle}>
            <h5>Comments:</h5>
            {comments.map(comment => 
            <Row style={commentRowStyle} key={comment.id}>
                <b>{comment.user.username ? comment.user.username : comment.username}</b>
                <div>{comment.body+"  "}
                    <Col style= {{float:"right", fontSize: "10px"}}>
                        {comment.date?.split('T')[0]}
                    </Col>
                </div>
            </Row>)}


        </Container>
    )
}}
/*           */ 