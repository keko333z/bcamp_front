import React, { useState } from 'react'
import { addNote } from './services/notes'

const Filtered = (props) => {
  return <div>{props.fperson.map(person => <p key={person.id}>{person.name} num: {person.phone}</p>)}</div>
}
const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas' , phone: 11111111, id: 0},
    { name: 'Ada Lovelace', phone: 39-44-5323523, id: 2 },
    { name: 'Dan Abramov', phone: 12-43-234345, id: 3 },
    { name: 'Mary Poppendieck', phone: 39-23-6423122, id: 4 }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')
  const [ findName, setFindName ] = useState('')
  const [ foundName, setFoundName ] = useState([])

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewPhone = (event) => {
    setNewPhone(event.target.value)
  }

  const handleNewPerson = (event) => {
    event.preventDefault()
    const nperson = {name: newName, phone: newPhone, id: persons.length+1}
    persons.find(element => {
    if (element.name === nperson.name) {
       alert("no no no") 
       return true;
      }else {
        const resp=addNote(nperson)
    setPersons(persons.concat(resp))
    setNewName ('')
    return false;
    }
  })
}
const findPerson = (event) => {
  setFindName(event.target.value)
  const text= event.target.value
  const found= persons.filter(element => {
    return element.name.toLowerCase().includes(text.toLowerCase())

  })
  setFoundName([])
  setFoundName(found)
 // return (<div>{found.map(person => <p key={person.id}>{person.name} num: {person.phone}</p>)}</div>)
}


  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={handleNewPerson}>
        <div>
          name: <input value={newName} onChange={handleNewName}/>
        </div>
        <div>
          phone: <input value={newPhone} onChange={handleNewPhone}/>
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      
      <div>
      
      {persons.map(person => <p key={person.id}>{person.name} num: {person.phone}</p>)}
      
      </div>
      <form >
        <div>
          name: <input value={findName} onChange={findPerson} />
        </div>
      </form>
      <Filtered fperson={foundName} />
    </div>
  )
}

export default App
