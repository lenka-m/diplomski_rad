import AdminPage from "./AdminPage";
import EditorPage from "./EditorPage";
import UserPage from "./UserPage";
import { Redirect } from "react-router-dom";
function ProfilePage({loggedUser}){
  
  if (!loggedUser) {

    console.log('nema korisnika');
    return <Redirect to='/' />;
  }
    
    if (loggedUser.userRole === 'admin') {
        return <AdminPage  loggedUser = {loggedUser}/>;
      } else if (loggedUser.userRole === 'editor') {
        return <EditorPage loggedUser = {loggedUser} />;
      }  else if (loggedUser.userRole === 'none'){
        return <UserPage  loggedUser={ loggedUser}/>
      }
}
export default ProfilePage;