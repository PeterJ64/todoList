import plus from "../plus.png";
import { useState } from "react";
import Modal from "./Modal";

export const AddCard = () =>{
    const [showModal, setShowModal] = useState(false);

    return(<>
        <div className="card bg-base-100 shadow-xl card-class my-class box-shadow" onClick={() => setShowModal(true)}>
          <div className="card-body">
            <div className="card-actions justify-center" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height:'100%' }}>
            <img src={plus} alt="PLUS" style={{ width: '25%', height: '25%', opacity:'0.3'}}/>
            <p>Add Todo list</p>
            </div>
          </div>
        </div>
        <Modal show={showModal} onClose={() => setShowModal(false)}/>
</>
    )
}