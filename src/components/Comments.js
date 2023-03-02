import { Container, Row, Col } from "react-bootstrap"
import React, { useState, useEffect } from 'react'
import { getNoteComments } from "../services/comments"
import {Spinner} from "react-bootstrap"






const commentsContainerStyle = {
    borderTop: "3px solid grey",
    marginTop: "50px",
    marginBottom: "20px"
}

const commentRowStyle = {
    marginLeft:"10%",
    background: "#D9FABC",
    marginTop: "2px",
    borderRadius: "5px",
    border: "1px solid grey",
    width: "80%"
}



export const Comments = ({noteId}) => {
     const [ comments, setComments ] = useState([])
     //console.log(noteId)
     
     useEffect (()=>{
        try{
        getNoteComments(noteId).then(comments=>setComments(comments))
        }
        catch(e){console.log("Error getting the comments "+e)}
      },[noteId])
    
       
     
     console.log(comments)
    



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
                <b>{comment.user.username}</b>
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