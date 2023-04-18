
import { Row, Container } from "react-bootstrap"
import { Link } from "react-router-dom"



export const Notes = ({notes, user, path}) =>{
        
        let userN= " "
       
        return (
        
          <Container className="notes-container">
          <h4 >Latest Posts:</h4>
          {notes.map(note => <Link  key={note.id} className="note-link" to={path+note.id}>
                                <Row className="notes-row"  key={note.id}>
                                  <div className="notes-header">
                                    <b>{path==="/yourposts/" ? user?.username : note?.user?.username}</b>
                                  </div>
                                  <div >
                                    <h5>{note.title+"  "}</h5>
                                  
                                  {path==="/yourposts/" ? "" : <div style={{ opacity: "0.85", textAlign: "justify",width: "95%", marginLeft: "3%",  fontSize: "13px", padding: "15px"}}dangerouslySetInnerHTML={{ __html: note?.body?.substring(0,300)+"..." }}></div>}
                                  </div>
                                  <div className="notes-footer">
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