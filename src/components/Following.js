
import { Table } from "react-bootstrap"
import { Link } from "react-router-dom"
import { ProfileNav } from "./ProfileNav"

export const Following = ({following})=>{
    const style={color: "lightblue",  padding: "10px", fontSize: "24px"}
    const loggedUser = window.localStorage.getItem('userLoggedIn')
    if(loggedUser){
    if (following.length===0){
       
        return <> <ProfileNav></ProfileNav><div style={style}>You don't follow anyone yet</div></>
    }
    else {
        return  <div>
                    <ProfileNav></ProfileNav>
                    <h4>Following</h4>
                        <Table striped>
                            <tbody>
          
                                {following.map(following => <tr key={following.followingUserId}><td> <Link to={"/users/"+following.followingUserId}> Username: {following.username} </Link></td></tr>)}
            
                            </tbody>
                        </Table>
                </div>

}}}