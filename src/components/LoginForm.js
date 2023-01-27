import React from "react"
import { useState } from "react"
import { setToken, getAllUserNotes } from "../services/notes"
import { userLogin } from "../services/login"
import { Button, Container, Form } from "react-bootstrap"
import { Notification } from "../App"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import { useNavigate } from "react-router-dom"



export const LoginForm = ({setUser, setUserNotes, setFollowers, setFollowing, setErrorMessage, errorMessage}) => {
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const navigate= useNavigate()
    const handleUsername=(event)=>{
        setUsername(event.target.value)
      }
      
      
      const handlePassword=(event)=>{
        setPassword(event.target.value)
      }
      

    const handleSubmit= async (event)=>{
        event.preventDefault()
        const userObj = {
          "username": username,
          "password": password
        }
        
        try {
        const userData= await userLogin(userObj)
        setUser(userData)
        console.log(userData)
        window.localStorage.setItem('userLoggedIn',JSON.stringify(userData))
        setUsername('')
        setPassword('')
        setToken(userData.token)
        const userNotes= await getAllUserNotes(userData)
        window.localStorage.setItem('allUserNotes',JSON.stringify(userNotes.notes))
        const notes=userNotes.notes.reverse()
        setUserNotes(notes)
        setFollowers(userNotes.followers)
        setFollowing(userNotes.following)  
        console.log(userData)
        navigate('/')
        } catch (e)
        { 
          console.error(e)
          setErrorMessage("Wrong username or password")
          setTimeout(()=>{setErrorMessage('')}, 4000)
        }
        
       
}


return (
<div  style={{ background: "blue", width: "100%" }}>

<Row ><Col >
    
    <Form style={{background: "yellow", marginTop: "50px",marginLeft: "30%",border: "2px solid grey", float: "right", padding: "20px",width: "80%"}} onSubmit={handleSubmit}>
      <Form.Group style={{padding: 5}} className="username">
         <Form.Control value={username} placeholder="username" onChange={handleUsername}></Form.Control>
      </Form.Group>
      <Form.Group style={{padding: 5}} className="password">
         <Form.Control  type="password" value={password} placeholder="password" onChange={handlePassword}></Form.Control>
      </Form.Group>
      <Button style={{float:"right" }} type="submit">Login</Button>
    </Form>

</Col>
<Col ><Notification style={{float: "left"}} message={errorMessage}></Notification></Col>
</Row>

</div>
)
}