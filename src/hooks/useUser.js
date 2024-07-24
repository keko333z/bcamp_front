import { useContext } from "react"
import { setToken, getAllUserNotes } from "../services/notes"
import { userLogin } from "../services/login"
import { useNavigate } from "react-router-dom"
import { UserContext } from "../contexts/userContext"



export const useUser = () => {
  
    const navigate= useNavigate()

    const {  
        user, 
        setUser, 
        followers, 
        setFollowers,
        following, 
        setFollowing,
        userNotes, 
        setUserNotes
    } = useContext(UserContext)

    

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

    

    const logout = () => {
        console.log('loggin out')
        window.localStorage.removeItem('userLoggedIn')
        window.localStorage.removeItem('allUserNotes')
        setUser(null)
        setToken(null)
        setUserNotes([])
    }

    const handleLogOut = () => {
        logout()
        navigate('/')
        window.location.reload()
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
        handleLogOut,
        login
    }
}