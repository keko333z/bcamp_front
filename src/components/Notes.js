
import { Table } from "react-bootstrap"
import { Link } from "react-router-dom"



export const Notes = ({notes, path}) =>{

        return (
        <div>
         
         <Table striped>
            <tbody>
              
            {notes.map(note => <tr key={note.id}><td> <Link to={path+note.id}>{note.id} title: {note.title} Body: {note.body} </Link></td></tr>)}
                
            </tbody>
         </Table>
        </div>
)}
/*{notes.map(note => <tr key={note.notes.id}><td> <Link to={"/notes/"+note.notes.id}>{note.id} title: {note.notes.title} User: {note.username} </Link></td></tr>)}*/