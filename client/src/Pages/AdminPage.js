import { useContext, useState,   } from "react";
import ProfileComponent from "../Components/ProfileComponent";
import AllUsers from "../Components/AllUsers";
import RegisterNewUser from "../Components/RegisterNewUser";
import { UserContext } from "../Hooks/UserContext";
import "../css/profile.css";
import AllActivities from "../Components/AllActivities";
import AllProjekti from "../Components/AllProjekti";



function AdminPage(){
    const {user} = useContext(UserContext);
    const [registerVisible, setRegisterVisible] = useState(false);

    const [projektiVisible, setProjektiVisible] = useState(false);
    return(
       <div className="ProfilePage">
            {/* <h1> Welcome { user.firstName}</h1>   */}
            
            <ProfileComponent/>
            <AllActivities/>
            <div className="buttons">
                <button onClick= {()=> { setRegisterVisible(true); setProjektiVisible(false)}} > Nov Nalog</button>
                <button onClick= {()=> { setProjektiVisible(true);setRegisterVisible(false); }} >Projekti</button>
            </div>
             {registerVisible && <RegisterNewUser/>}
             {projektiVisible && <AllProjekti/>}
    
            
       </div>
    )
}
export default AdminPage;