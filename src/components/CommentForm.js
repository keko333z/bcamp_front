import React, { useState, useEffect } from 'react'
import { Button,  Form } from "react-bootstrap"
import { useNavigate } from 'react-router-dom'
import { Notification } from '../App'
import { addComment } from '../services/comments'












export const CommentForm= ({user, noteId})=>{
const [ newBody, setNewBody ] =  useState('')
const [logged, setLogged] = useState (false)
const [message, setMessage]= useState("")
const navigate = useNavigate()


useEffect (()=>{
    
  const loggedUser = window.localStorage.getItem('userLoggedIn')

if(loggedUser){
  setLogged(true)
}
  
},[])


const handleNewComment = async () => {
    
  
  const commentObj= {
    body: newBody,
    user: user.id,
    note: noteId
  }
    
         try
         { 
         const comment= await addComment(commentObj)
         console.log(comment)
        // navigate('/notes/'+id)
         window.location.reload()
         } catch (e){console.log(`error saving the new note ${e}`)}
         
}




const handleNewBody = (event) => {
  setNewBody(event.target.value)
}

const handleSubmit=(event)=>{
    event.preventDefault()
    if(logged){
    const nComment = { body: newBody, user: user.id, note: noteId}
    if ((nComment.body === ""))
      {
        alert("the comment can't be empty") 
      }
      else 
      {
        handleNewComment(nComment)
        
        setNewBody('')
        

      } 
    }
    else {
        
        setMessage("You must be logged to comment")
        setTimeout(()=>{setMessage('')}, 2000)
    }
}

return(

<div style={{maxWidth: "80%", marginLeft:"5%",marginTop: "60px"}}> 
  <h5>Add a comment:</h5>
  
  <Form style={{height:"100px"}}  onSubmit={handleSubmit}>
  
        <Form.Group style={{padding: 5}} className="comment">
            <Form.Control value={newBody} placeholder="new comment" onChange={handleNewBody}></Form.Control>
        </Form.Group>
        
        <Button style={{ position: "relative", float: "right", marginRight:"5%", marginBottom:"15%"}} type="submit" >Save</Button>
        <Notification message={message}></Notification>
  </Form>
  

</div>
)}