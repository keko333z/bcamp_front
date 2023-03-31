
import { Nav } from "react-bootstrap"


export const ProfileNav = () =>{
   
    const loggedUser = window.localStorage.getItem('userLoggedIn')
    const path=window.location.pathname
    
    if(loggedUser){
      
        return(
        <>
        
        <Nav style={{marginBottom: "100px"}} activeKey={path} variant="tabs">
            <Nav.Item>
                <Nav.Link  href="#/yourposts">Posts</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link  href="#/yourcomments">Comments</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="#/followers">Followers</Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link  href="#/following">Following</Nav.Link>
            </Nav.Item>
        </Nav>
        

        </>
    )}}
    /*<Link style={linkStyle} to="/followers">Followers</Link>
        <Link style={linkStyle} to="/following">Following</Link>
        <h3>Your Posts</h3>
        <Notes notes={userNotes} path={path}></Notes>
        <h3>Your comments</h3>     
        <YourComments userId={user.id}></YourComments>*/