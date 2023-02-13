
import "../css/profile.css";
function EditorPage({loggedUser}){
    const user = loggedUser;
    
    return(
       <div className="ProfilePage">
            <h1>{user.firstName} {user.lastName}</h1>
            
       </div>
    )
}
export default EditorPage;