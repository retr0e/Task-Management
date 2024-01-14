import React from "react";

const Modal = ({ element , btn_Name , btn_Style }) => {
  return (
    <>
        <button className={btn_Style} onClick={()=>document.getElementById('my_modal_3').showModal()}>{btn_Name}</button>
        <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
        <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>      
        </form>
            {element}
        </div>
        </dialog>
    </>
  );
};

export default Modal;