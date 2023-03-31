import React, { useEffect, useState } from "react";
import { loginUser } from "../Actions/userActions";
import { useHistory } from "react-router-dom";
import logoPhoto from "../img/logo.png";
import Alert from '@mui/material/Alert';
import {Modal, Box} from "@mui/material"
import ChangePassword from "../Components/Change/ChangePassword";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minwidth: 600,
  bgcolor: '#0C2D48',
  borderRadius: '10px',
  boxShadow: 24,
  p: 4,
};

function LoginPage({ loggedUser, setLoggedUser }) {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const history = useHistory();

   // Za modal: 
   const [openForgotPass, setOpenForgotPass] = React.useState(false);
   const handleOpenForgotPass = () => setOpenForgotPass(true);
   const handleCloseForgotPass = () => setOpenForgotPass(false);

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  
  useEffect(() => {
    setError(null)
  }, [loginData]);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const user1 = await loginUser(loginData.email, loginData.password);
      setLoggedUser(user1);
      history.push("/profile");
    } catch (err) {
      if(err.response.data){
        setError(err.response.data);
      }  else setError('Greška sa serverom')
    }
  }

  return (
    <div className="page">
      <form className="loginForm" onSubmit={(e) => handleSubmit(e)}>
        <img src={logoPhoto} alt="logo"></img>

        <label>Email:</label>
        <input
          name="email"
          type="text"
          required
          value={loginData.email}
          onChange={handleChange}
        />

        <label>Password:</label>
        <input
          name="password"
          type="password"
          required
          value={loginData.password}
          onChange={handleChange}
        />
        
        {error && <Alert severity="error">{error}</Alert>}
        <button type="submit"> Login</button>
        <div>
        <u onClick={handleOpenForgotPass}>Zaboravili ste lozinku?</u>
        </div>
      </form>
      <Modal
        open={openForgotPass}
        onClose={handleCloseForgotPass}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
          <ChangePassword/>
        </Box>
      </Modal>
    </div>
  );
}

export default LoginPage;
