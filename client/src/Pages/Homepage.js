
import React from 'react'
import Modal from '../Components/Modal'
import { useState } from 'react'
import "../css/homepage.css";

function Homepage() {
    const [isOpenModal, setIsOpenModal] = useState(false);

    return (
    
    <div className='homepage'>
    
    {isOpenModal && <Modal text = "Uspešno ste se ulogovali na svoj profil!" closeModal={setIsOpenModal}/>}
    </div>
  )
}

export default Homepage