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
          <form method='dialog'>
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


export const AccessBlock = ({ element, reqLvl, currLvl }) => {
  if (currLvl <= reqLvl) {
    return { element };
  } else {
    return "";
  }
};

export default Modal;
