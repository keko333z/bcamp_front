import React from "react";
import { useQuery } from "@apollo/client";
import { MOST_LIKED } from "../graphql/queries";
import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";



export const MostLiked = () =>{

    const path="/notes/"
    const result = useQuery(MOST_LIKED)
    if (result.loading)  {
        return <div>loading...</div>
      }
    else {
    
        return <>

        <h4>Most Liked Posts:</h4>
        
        <Container  className="sideNotesContainerStyle">
      
            {result.data.mostLiked.map(note => 
                        <Link className="sideNotesHeader" key={note.id} to={path+note.id}>
                            <Row className="sideNotesRowStyle" key={note.id}>
                              <div >
                                <b>User: {note?.user}  Likes: {note.likes}</b>
                              </div>
                              <div >
                                <h5>{note.title+"  "}</h5>
                              </div>
                              
                            </Row>
                        </Link>
                    )}



        </Container>



    </>




}}