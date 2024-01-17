import React from "react";

const Modal = ({ element, btn_Name, btn_Style , modal_ID}) => {
  return (
    <>
      <button
        className={btn_Style}
        onClick={() => document.getElementById(modal_ID).showModal()}
      >
        {btn_Name}
      </button>
      <dialog id={modal_ID} className='modal'>
        <div className='modal-box'>
          <form method='dialog' className="">
            {/* if there is a button in form, it will close the modal */} 
            <button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>
              ✕
            </button>
          </form>
          {element}
        </div>
      </dialog>
    </>
  );
};


export const PopUp = (err) => {
  return(
    <div id = {err} className="absolute bottom-40 right-40 w-auto" onClick={() => get.getElementById(err).style.display = 'none'} >
      <div role="alert" className="alert alert-error ">
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
          <span>Error! Task failed successfully :)</span>
        </button>
      </div>
    </div>
  );
};

export default Modal;
