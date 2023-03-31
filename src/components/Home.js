import { Notes } from "./Notes"
import { HomeSide } from "./HomeSide"




export const Home = ({notes, user}) => {
const path="/notes/"

return (
    <div className="home">     
        <HomeSide></HomeSide>
        
        <Notes  notes={notes} user={user} path={path}></Notes>    
        
    </div>


)

}