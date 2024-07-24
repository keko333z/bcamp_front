import { createContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { setToken } from "../services/notes";


export const UserContext = createContext()

export const UserProvider = ({children}) => {
    const [ user, setUser ] = useState(null)
    const [ followers, setFollowers ] = useState([]) 
    const [ following, setFollowing ] = useState([])
    const [ userNotes, setUserNotes ] = useState([])

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

    return (
        <UserContext.Provider value={{
            user, 
            setUser, 
            followers, 
            setFollowers,
            following, 
            setFollowing,
            userNotes, 
            setUserNotes
        }}>
            {children}
        </UserContext.Provider>
    )
}