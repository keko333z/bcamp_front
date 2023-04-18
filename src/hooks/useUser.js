import { useState, useEffect } from "react"
import { setToken } from "../services/notes"
import { userLogin } from "../services/login"
import { getAllUserNotes } from "../services/notes"



export const useUser = () => {
    const [ user, setUser ] = useState(null)
    const [ followers, setFollowers ] = useState([]) 
    const [ following, setFollowing ] = useState([])
    const [ userNotes, setUserNotes ] = useState([])

    const updateUser = (u) => {
        setUser(u)
    }

    const updateFollowers = (u) => {
        setFollowers(u)
    }

    const updateFollowing = (u) => {
        setFollowing(u)
    }

    const updateUserNotes = (u) => {
        setUserNotes(u)
    }

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

    const logout = () => {
        console.log('loggin out')
        window.localStorage.removeItem('userLoggedIn')
        window.localStorage.removeItem('allUserNotes')
        setUser(null)
        setToken(null)
        setUserNotes([])
    }

    const login = async (userObj) => {
        const userData= await userLogin(userObj)
        setUser(userData)
        window.localStorage.setItem('userLoggedIn',JSON.stringify(userData))
        setToken(userData.token)
        const userNotes= await getAllUserNotes(userData)
        window.localStorage.setItem('allUserNotes',JSON.stringify(userNotes.notes))
        const notes=userNotes.notes.reverse()
        setUserNotes(notes)
        setFollowers(userNotes.followers)
        setFollowing(userNotes.following)
    }

    return {
        user,
        updateUser,
        followers,
        updateFollowers,
        following, 
        updateFollowing, 
        userNotes,
        updateUserNotes,
        logout,
        login
    }
}