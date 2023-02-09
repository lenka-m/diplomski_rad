import { useContext } from "react";
import { UserContext } from "../Hooks/UserContext";
import "../css/profile.css";
function EditorPage(){
    const {user} = useContext(UserContext);
    
    return(
       <div className="ProfilePage">
            <h1>{user.firstName} {user.lastName}</h1>
            
       </div>
    )
}
export default EditorPage;