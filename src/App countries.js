import React, { useEffect, useState } from 'react'

import axios from 'axios'
import { addNote } from './services/notes'


const ShowCountry = (props) => {
  return (
          <div>
          {props.country.map(note => <div key={note.name}><strong>Name:</strong> {note.name} <strong>Capital</strong>: {note.capital} <strong>Region: {note.region}</strong>
          <div>Population : {note.population} Languages : {note.languages.map(lang => lang.name)}</div>
          <img src={note.flag} alt="Flag"></img></div>)}
          </div>
          )
   } 

const App = () => {
  const [ notes, setNotes ] = useState([]) 
  const [ newTitle, setNewTitle ] = useState('')
  const [ newBody, setNewBody ] = useState('')
  const [ findName, setFindName ] = useState('')
  const [ foundName, setFoundName ] = useState([])
 
  useEffect (()=>{
    axios.get('https://restcountries.com/v2/all')
    .then((response) => {
    const  {data} = response
    setNotes(data)
    })
  }, [])


  const handleNewTitle = (event) => {
    setNewTitle(event.target.value)
  }

  const handleNewBody = (event) => {
    setNewBody(event.target.value)
  }

  const handleNewNote = (event) => {
    event.preventDefault()
    const nnote = {userId: 1, title: newTitle, body: newBody, id: notes.length+1}
    notes.find(element => {
    if ((element.title === nnote.title)||(nnote.title === "") ||(nnote.body === "")){
       alert("no no no") 
       return true;
      }else {
    addNote(nnote)
    setNotes(notes.concat(nnote))
    
    setNewTitle ('')
    setNewBody ('')
    return false;
    }
  })
}

const findPerson = (event) => {
  setFindName(event.target.value)
  const text= event.target.value
  const found= notes.filter(element => {
    return element.name.toLowerCase().includes(text.toLowerCase())
  })
  setFoundName([])
  setFoundName(found)
}
const displayCountry = (name) => {
  const text= name
  const found= notes.filter(element => {
    return element.name.toLowerCase().includes(text.toLowerCase())
  })
  setFoundName([])
  setFoundName(found)
}

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleNewNote}>
        <div>
          name: <input value={newTitle} onChange={handleNewTitle}/>
        </div>
        <div><p>
          phone: <input value={newBody} onChange={handleNewBody}/>
          </p></div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Notas</h2>
      
      
      <form >
        <div>
          name: <input value={findName} onChange={findPerson} />
        </div>
      </form>

      <ol>
        {foundName.length === 1 ? (
          (<ShowCountry country={foundName}></ShowCountry>)
          ) 
          : (
          foundName.map(note => <li key={note.name}>Name: {note.name} Capital: {note.capital} <strong>Region: {note.region}</strong>
          <form><button onClick={(event)=>{event.preventDefault(); displayCountry(note.name)}} >See</button></form></li>) 
          ) }
      </ol>
    </div>
  )
}
/*<ol>
      
      {notes.map(note => <li><p key={note.name}>Name: {note.name} Capital: {note.capital} <strong>Region: {note.region}</strong></p></li>)}
      
      </ol>*/
export default App
