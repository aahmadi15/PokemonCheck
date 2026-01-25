import React, { useEffect, useState} from "react";
import "./App.css"


const ModalComponent = ({isOpen, onClose, children}) =>{
    useEffect(()=> {
        if (isOpen){
            document.body.classList.add("active-modal")
        }
        else 
        {
            document.body.classList.remove("active-modal")
        }
    }, [isOpen])
   

   if (!isOpen)
    return null;
      return (
        

        
          <div className="modal">
            <div className="overlay" onClick={onClose}>
                <div className="modal-content">
                  {children}
                </div>
            </div>
          </div>
      )}
  

export default ModalComponent;