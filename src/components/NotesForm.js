
import React, { useState, useMemo } from 'react'
import { Button,  Form } from "react-bootstrap"
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Quill } from 'react-quill';









export const NoteForm= ({user, handleNewNote})=>{
  const [ newTitle, setNewTitle ] = useState('')
  const [ newBody, setNewBody ] =  useState('')
  const [chars, setChars]= useState(0)

  function imageHandler() {
    var range = this.quill.getSelection();
    var value = prompt('please copy paste the image url here.');
    if(value){
        this.quill.insertEmbed(range.index, 'image', value, Quill.sources.USER);
    }
}

  const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline','strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['link', 'image'],
      ['clean']
      ],
      handlers: {
        image: imageHandler
      }
    }
  }), [])

  
  const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet',
    'link', 'image'
  ]


const handleNewTitle = (event) => {
  setNewTitle(event.target.value)
}

const handleNewBody = (html) => {
    setNewBody(html)
    setChars(newBody.length)
}

const handleSubmit=(event)=>{
    event.preventDefault()
    if((chars > 10000)||(newTitle.length >= 100)){
      window.alert("Title or Post too long")
    }
    else{
    const nnote = {title: newTitle, body: newBody}
    if ((nnote.title === "") ||(nnote.body === ""))
      {
        alert("no no no, complete all the fields") 
      }
      else 
      {
        handleNewNote(user, nnote)
        setNewTitle('')
        setNewBody('')
      }}
}
const loggedUser = window.localStorage.getItem('userLoggedIn')

if(loggedUser){
return(

<div style={{maxWidth: "75%"}}> 
  <h3>New Post</h3>
  <Form  style={{ height: "400px"}} onSubmit={handleSubmit}>
        
        <Form.Group style={{padding: 5}} className="title">
            <Form.Control value={newTitle} placeholder="new title" onChange={handleNewTitle}></Form.Control>
        </Form.Group>
        
        {chars+ "/10000"}
        <Form.Group className="body">
          <ReactQuill  
                    style={{ height: "500px"}} 
                    modules={modules} 
                    formats={formats} 
                    theme="snow" 
                    onChange={handleNewBody}             
          /> 
        </Form.Group>
        <Button style={{ position: "relative", float: "right", marginRight:"5%", marginBottom:"15%"}} type="submit" >Save</Button>
  </Form>
 

</div>
)}}
