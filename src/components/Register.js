import React from "react"
import { useState } from "react"
import { Button, Form } from "react-bootstrap"
import { newUser } from "../services/users"
import { useNavigate} from "react-router-dom"
import { Notification } from "../App"




export const Register = () => {
    const [ username, setUsername ] = useState('')
    const [ name, setName ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ repeatPassword, setRepeatPassword] = useState('')
    
    
    const navigate= useNavigate()

   

    const handleUsername=(event)=>{
        setUsername(event.target.value)
        
   
    }
   
    const handleName=(event)=>{
        setName(event.target.value)
        
        
    }
      
      
    const handlePassword=(event)=>{
        setPassword(event.target.value)
    }

    const handleRepeatPassword=(event)=>{
        const repeatPass = event.target.value
        setRepeatPassword(repeatPass)
    }
    
    const handleSubmit= async (event) => {
        event.preventDefault() //controlar que todos los campos esten completos
        
        if(password===repeatPassword){
            if((name.length > 20 )|| (username.length > 20)){
                window.alert("name or username is too long")
            }
            else{
                try {
                    const userObj = { username: username, name: name, passwordHash: password}
                    const resp = await newUser(userObj)
                    
                    if(resp)
                    {
                        window.confirm("User created, you can log in now" )
                        navigate("/")
                    }   
                    else window.alert("Semething went wrong, try again later")
                }
                catch (e){ console.log("Couldn't create the user"+e )}
        
            }}
        
         else 
        {
        alert("Passwords doesn't match")
        }
    }
    
    return (

    <div style={{width: "100%"}}>
        
        <Form className="registerForm" onSubmit={handleSubmit}>
            
            <Form.Group style={{padding: 5}} className="name">
                {name.length > 20 ? <Notification message={"Name too long, 20 chars max"} /> : ""}
                <Form.Control value={name} placeholder="name"  onChange={handleName}></Form.Control>
            </Form.Group>
            <Form.Group style={{padding: 5}} className="username">
                {username.length > 20 ? <Notification message={"Username too long, 20 chars max"} /> : ""}
                <Form.Control value={username} placeholder="username"  onChange={handleUsername}></Form.Control>
            </Form.Group>
            <Form.Group style={{padding: 5}} className="password">
                <Form.Control  type="password" value={password} placeholder="password" onChange={handlePassword}></Form.Control>
            </Form.Group>
            <Form.Group style={{padding: 5}} className="password">
                <Form.Control  type="password" value={repeatPassword} placeholder="Repeat password" onChange={handleRepeatPassword}></Form.Control>
            </Form.Group>
            <Button style={{float:"right" }} type="submit">Submit</Button>
            
        </Form>

    </div>
    )
}