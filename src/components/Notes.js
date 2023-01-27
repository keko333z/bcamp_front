
import { Col, Table, Row, Container } from "react-bootstrap"
import { Link } from "react-router-dom"

const notesStyle = {
     onMouseOver: "background: #84CB63",
     border: "1px solid black",padding: "3px", 
     marginTop: "10px", 
     background: "#E0E0E0", 
     borderRadius: "8px",
     boxShadow: "2px"
    
}

export const Notes = ({ notes, path}) =>{
        
        let userN= " "
        return (
        
         
            <Container>
              
            {notes.map(note => 
            <Row style={notesStyle} key={note.id}>
                <Col style={{fontSize: "15px", width:"20%"}}> 
                    <Link  to={path+note.id}><h6>{note.title}</h6>  { userN = note?.user?.username ? "User: "+note?.user?.username : ""  }</Link></Col>
                <Col style={{fontSize: "11px", width:"20%", textAlign: "right"}}> Created: {note.date?.split('T')[0]}</Col></Row>)} 
                
            </Container>
        
        )
        }     
/*
/* userN = note?.user?.username ? ... depende del array de notas que se le pase viene con array.user.username o no- que depende del lugar de donde se lo llame al componente Notes


*/