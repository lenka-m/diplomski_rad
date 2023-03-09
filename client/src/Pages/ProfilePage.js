import AdminPage from "./AdminPage";
import EditorPage from "./EditorPage";
import UserPage from "./UserPage";
import { useEffect } from "react";


function ProfilePage({loggedUser}){

      if ( loggedUser && loggedUser.userRole === 'admin') {
        return <AdminPage  loggedUser = {loggedUser}/>;
      } else if (loggedUser.userRole === 'editor') {
        return <EditorPage loggedUser = {loggedUser} />;
      }  else if (loggedUser.userRole === 'none'){
        return <UserPage  loggedUser={ loggedUser}/>
      }
}
export default ProfilePage;