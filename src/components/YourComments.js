import React from "react";
import {  useMutation, useQuery } from "@apollo/client";
import { ALL_COMMENTS } from "../graphql/queries";
import { DELETE_COMMENT } from "../graphql/mutations";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { ProfileNav } from "./ProfileNav"

const commentsContainerStyle = {
    
    marginBottom: "20px",
    padding: "20px", 
    width: "60%",
    marginLeft:"10%"
}

const commentRowStyle = {
    
    background: "#D9FABC",
    marginTop: "2px",
    borderRadius: "5px",
    border: "1px solid grey"
}



export const YourComments = () =>{

    const loggedUser = window.localStorage.getItem('userLoggedIn')
    const user=JSON.parse(loggedUser)
   
      
   const [removeComment] = useMutation(DELETE_COMMENT)
  
    const result = useQuery(ALL_COMMENTS, {variables: { userid: user.id }, })
      
    const handleDelete= (id) => {

        if (window.confirm("Delete the comment?")){
            try {   
                removeComment({variables: { cid: id }}) //misma nombre que en la definicion de la mutation: cid
                window.location.reload()
            }
            catch(e){console.log(e)}
        
        } 
        
   }
   

    if ((result.loading)|| (!loggedUser)) {
        return <div>loading...</div>
      }
    else {
        if(result.data.allComments.length===0){

            return <><ProfileNav></ProfileNav><h4>You dont have any comments yet!</h4></>
        }
        else{
      
    return <>
            <ProfileNav></ProfileNav>
            <Container style={commentsContainerStyle}>
            
                {result.data.allComments.map(comment => 
                <Row style={commentRowStyle} key={comment.id}>
                    <Link className="note-link" to={"/notes/"+comment.noteId}><b>Go to comment: Post: {comment.note}  </b>
                        <div>{comment.body+"  "}
                            <Col style= {{float:"right", fontSize: "10px"}}>
                                {comment.date}
                            </Col>
                        </div>
                    </Link><Button style={{width: "25%", marginLeft: "73%", marginBottom: "2%"}} variant="outline-dark" onClick={()=>handleDelete(comment.id)}>Delete</Button>
                </Row>)}


             </Container>
    
    </>




}}}
/*

 
    
     
*/ 