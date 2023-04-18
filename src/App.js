import React, { useState } from 'react'
import {Route, useNavigate, Routes} from 'react-router-dom'
import { addNote, update, setToken } from './services/notes'
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
import { About } from './components/About'
import { useNotes } from './hooks/useNotes'
import { useUser } from './hooks/useUser'





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
   
  const [errorMessage, setErrorMessage] = useState('')
  const {notes, updateNotes} = useNotes()
  const user = useUser()
  const navigate=useNavigate()

  const handleNewNote = async (noteObj) => {
    let exist=null
    exist=user.userNotes.find(element =>(element.title === noteObj.title)) 
        if (!exist)
        {
          try
          { 
          const note= await addNote(noteObj)//.then(note => {setNotes(note)})  
          const newUserNotes=user.userNotes.concat(note)
          user.updateUserNotes(newUserNotes)
          updateNotes(notes.concat(note))
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



const handleLogOut= ()=>{
  user.logout()
  navigate('/')
  window.location.reload()
}


 

  return (
    <>
    <Header user={user.user} handleLogOut={handleLogOut}></Header>
    
    <Container className='app-container'>
          <Routes >
            <Route path="/login" element={
                 <LoginForm  errorMessage={errorMessage} login={user.login} setErrorMessage={setErrorMessage}/>
              }></Route>
            <Route path="/" element={<Home  notes={notes} user={user.user}/>}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/registration" element={<Register  notes={notes}/>}></Route>
            <Route path="/yourcomments" element={<YourComments/>}></Route>
            <Route path="/yourposts" element={<YourNotes  userNotes={user.userNotes} user={user.user} />}></Route>
            <Route path="/profile" element={<YourNotes  userNotes={user.userNotes} user={user.user}/>}></Route>
            <Route path="/yourposts/:id"  element={<UserNote  userNotes={user.userNotes} setUserNotes={user.updateUserNotes}/>}></Route>
            <Route path="/notes/:id"   element={<Note user={user.user} setUser={user.updateUser} setNotes={updateNotes} notes={notes}/>}></Route>
            <Route path="/users/:id" element={
                <User  user={user.user} setUser={user.updateUser} setFollowing={user.updateFollowing}  notes={notes}/>
                }></Route>
            <Route path="/followers" element={<Followers followers={user.followers}/>}></Route>
            <Route path="/following" element={<Following following={user.following}/>}></Route>
            <Route path="/newnote" element={<NoteForm handleNewNote={handleNewNote}/>}></Route>
            <Route path="/*" element={<NotFound />} />
          </Routes>
      </Container>

    <Footer/>  
    
    </>
  )}

  export default App
