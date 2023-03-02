import React from "react";
import { useQuery } from "@apollo/client";
import { MOST_VIEWED } from "../graphql/queries";
import { Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";





export const MostViewed = () =>{
    
    const path="/notes/"
    const result = useQuery(MOST_VIEWED)
    if (result.loading)  {
        return <div>loading...</div>
      }
    else {
    
    return <>

            <h4>Most viewed Posts:</h4>
            
            <Container  className="sideNotesContainerStyle">
          
                {result.data.mostViewed.map(note => 
                            <Link className="sideNotesHeader" key={note.id} to={path+note.id}>
                                <Row className="sideNotesRowStyle" key={note.id}>
                                  <div >
                                    <b>User: {note?.user}  Views: {note.views}</b>
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
// 