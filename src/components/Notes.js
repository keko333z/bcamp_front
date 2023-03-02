
import {    Row, Container  } from "react-bootstrap"
import { Link } from "react-router-dom"

const notesContainerStyle = {
  width:"60%",
  marginRight: "35%",
  marginTop: "20px",
  marginBottom: "20px",
}

const notesRowStyle = { 
  background: "white",
  marginTop: "20px",
  borderRadius: "5px",
  boxShadow: "rgba(255, 255, 255, 0.2) 0px 0px 0px 1px inset, rgba(0, 0, 0, 0.9) 0px 0px 0px 1px"
  //boxShadow: "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
 // boxShadow: "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px"
  
}


const notesHeader = {
  height: "30px",
  borderRadius: "1px",
  color: "#3577B0",
  boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px",
 // boxShadow: "rgba(60, 40, 200, 0.25) 0px 30px 60px -12px inset, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px inset",
  marginBottom: "18px"
}

const notesFooter = {
  textAlign:"center", 
  fontSize: "13px",
  marginRight: "10%", 
  marginTop: "8px",
  height: "30px",
  padding: "4px",
  
  color: "#3577B0",
}

export const Notes = ({notes, user, path}) =>{
        
        let userN= " "
       
        return (
        
          <Container  style={notesContainerStyle}>
          
          {notes.map(note => <Link  key={note.id} className="note-link" to={path+note.id}>
                                <Row style={notesRowStyle} key={note.id}>
                                  <div style={notesHeader}>
                                    <b>{path==="/yourposts/" ? user?.username : note?.user?.username}</b>
                                  </div>
                                  <div>
                                    <h5>{note.title+"  "}</h5>
                                  </div>
                                  <div style= {notesFooter}>
                                    <b> Views:{note.views} Likes: {note.likes} Created: {note?.date?.split('T')[0]}</b>
                                  </div>
                                </Row>
                              </Link>)}


      </Container>
            
        
        )
        }     
/*
/* userN = note?.user?.username ? ... depende del array de notas que se le pase viene con array.user.username o no- que depende del lugar de donde se lo llame al componente Notes

   {notes.map(note => 
          
            <Alert variant={"primary"} key={note.id}>  
            
                <Link className="note-link" to={path+note.id}> <b>{note.title} </b> { userN = note?.user?.username ? "User: "+note?.user?.username : ""  }</Link>
                 <div style={{float: "right"}}> Views:{note.views} Likes: {note.likes} Created: {note.date?.split('T')[0]}</div>
            </Alert>
                
            
            )} 




      v<Container>
              
         
            {notes.map(note => 
                <Card  key={note.id} className="notes-card" bg={'light'}  border="success">
                <Card.Header><b>{userN = note?.user?.username ? "User: "+note?.user?.username : ""}</b></Card.Header>
                <Card.Body>
                
                <Link className="note-link" to={path+note.id}><Card.Title>{note.title}</Card.Title></Link>
                <small className="text-muted">Views:{note.views} Likes: {note.likes} Created: {note.date?.split('T')[0]}</small> 
                  
                </Card.Body>
                
              </Card>
               )}
            </Container>
*/