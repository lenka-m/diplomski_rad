import { useContext } from "react";
import { UserContext } from "../Hooks/UserContext";
import AdminPage from "./AdminPage";
import EditorPage from "./EditorPage";
import UserPage from "./UserPage";

function ProfilePage(){
    const {user} = useContext(UserContext);
    
    if (user.userRole === 'admin') {
        return <AdminPage />;
      } else if (user.userRole === 'editor') {
        return <EditorPage />;
      }  else if (user.userRole === 'none'){
        return <UserPage/>
      }
}
export default ProfilePage;