import React, { useEffect, useState } from 'react'
import {Route, useNavigate, Routes} from 'react-router-dom'
import { addNote, getAll, deleteRecurse, update, setToken } from './services/notes'
import { NoteForm } from './components/NotesForm'
import { LoginForm } from './components/LoginForm'
import { Footer } from './components/Footer'
import { Note } from './components/Note'
import { UserNote } from './components/UserNote'
import { NotFound } from './components/NotFound'
import { Container } from 'react-bootstrap'
import { Followers } from './components/Followers'
import { Following } from './components/Following'
import { YourNotes } from './components/YourNotes'
import { Header } from './components/Header'
import { Home } from './components/Home'
import {User} from './components/User'
import { Register } from './components/Register'
import { YourComments } from './components/YourComments'
import { ProfileNav } from './components/ProfileNav'




const notificationMessage = {
  color: "red",
  borderRadius: 3,
  float: "left",
  padding: "10px"
}
export const Notification = ({message}) => {
  return  <div style={notificationMessage}>{message}</div>
       
}


const App = () => {
  const [ notes, setNotes ] = useState([]) 
  const [ followers, setFollowers] = useState([]) 
  const [ following, setFollowing ] = useState([]) 
  const [ findName, setFindName ] = useState('')
  const [ foundName, setFoundName ] = useState([])
  const [user, setUser] = useState(null)
  const [userNotes, setUserNotes] = useState([])
  const [errorMessage, setErrorMessage] = useState('')
  
  const navigate=useNavigate()

  
  

  useEffect (()=>{
    getAll().then(anotes=>setNotes(anotes.reverse()))
  },[])

  useEffect (()=>{
    //se ejecuta cada vez q se recarga la pagina y solo esa vez
   
    const loggedUser = window.localStorage.getItem('userLoggedIn')
    const loggedUserNotes = window.localStorage.getItem('allUserNotes')
    if(loggedUser){
      const user=JSON.parse(loggedUser)
      setUser(user)
      setToken(user.token)
      const loggedUNotes=JSON.parse(loggedUserNotes)
      setUserNotes(loggedUNotes.reverse())
      setFollowers(user.followers)
      setFollowing(user.following)
    }
  }, [])

const handleNewNote = async (noteObj) => {
     let exist=null
     exist=userNotes.find(element =>(element.title === noteObj.title)) 
        if (!exist)
        {
          try
          { 
          const note= await addNote(noteObj)//.then(note => {setNotes(note)})  
          const newUserNotes=userNotes.concat(note)
          setUserNotes(newUserNotes)
          setNotes(notes.concat(note))
          window.localStorage.removeItem('allUserNotes')
          window.localStorage.setItem('allUserNotes',JSON.stringify(newUserNotes))
          console.log(newUserNotes)
          navigate('/notes/'+note.id)
          window.location.reload()
          } catch (e){console.log(`error saving the new note ${e}`)}
     
        } 
        else 
        {
            update(exist.id, noteObj).then(response => {console.log(response.data); }).catch(error => {
            return <Notification message={error}></Notification>})
        }
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


const displayNote = (name) => {
  const text= name
  const found= notes.filter(element => {
    return element.name.toLowerCase().includes(text.toLowerCase())
  })
  setFoundName([])
  setFoundName(found)
}


const deletePerson = (id)=>{
  deleteRecurse(id).then(response => console.log("Deleted "+response.data))
}



const handleLogOut= ()=>{
  console.log('loggin out')
  window.localStorage.removeItem('userLoggedIn')
  window.localStorage.removeItem('allUserNotes')
  setUser(null)
  setToken(null)
  setUserNotes([])
  navigate('/')
  window.location.reload()
}


 

  return (
    <><Header user={user} handleLogOut={handleLogOut}></Header>
    <div style={{background: "white",padding: "30px",borderRight: "2px solid grey", borderLeft: "2px solid grey", maxWidth: "70%", marginLeft: "15%", minHeight:"1800px",}}>
       
       <Container> 
           
          <Routes >
            <Route path="/login" element={
                 <LoginForm  errorMessage={errorMessage} setUser={setUser} setUserNotes={setUserNotes} setFollowers={setFollowers} setFollowing={setFollowing} setErrorMessage={setErrorMessage}/>
              }></Route>
            <Route path="/" element={<Home  notes={notes} user={user}/>}></Route>
            <Route path="/registration" element={<Register  notes={notes}/>}></Route>
            <Route path="/yourcomments" element={<YourComments/>}></Route>
            <Route path="/yourposts" element={<YourNotes  userNotes={userNotes} user={user} />}></Route>
            <Route path="/profile" element={<YourNotes  userNotes={userNotes} user={user}/>}></Route>
            <Route path="/yourposts/:id"  element={<UserNote  userNotes={userNotes} setUserNotes={setUserNotes}/>}></Route>
            <Route path="/notes/:id"   element={<Note user={user} setUser={setUser} setNotes={setNotes} notes={notes}/>}></Route>
            <Route path="/users/:id" element={
                <User  user={user} setUser={setUser} setFollowing={setFollowing}  notes={notes}/>
                }></Route>
            <Route path="/followers" element={<Followers followers={followers}/>}></Route>
            <Route path="/following" element={<Following following={following}/>}></Route>
            <Route path="/newnote" element={<NoteForm handleNewNote={handleNewNote}/>}></Route>
            <Route path="/*" element={<NotFound />} />
          </Routes>       

       
      
        </Container>
      
    </div>
    <Footer></Footer>
    </>
  )}


/*<ol>
      
      {notes.map(note => <li><p key={note.name}>Name: {note.name} Capital: {note.capital} <strong>Region: {note.region}</strong></p></li>)}
      
      </ol>*/

/* <button onClick={()=>deletePerson(note.id)}>Delete</button>*/
export default App

//<button onClick={()=>deletePerson(note.id)}>Delete</button>

/*
<form >
        <div>
          name: <input value={findName} onChange={findPerson} />
        </div>
      </form>
*/