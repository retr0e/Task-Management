import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

import '../scss/stylesheet2.scss';
import LoginForm from "./LogReg/LoginForm";
import RegisterForm from "./LogReg/RegisterForm";

function RenderLoginPage(){ 
    const [x, setX] = useState(0);
  
    const handleIncrement = () => {
      setX(x + 1);
    };
  
    const handleDecrement = () => {
      setX(x - 1);
    };
  
    return (
      <>
        {x === 0 ? (
          <>
            <LoginForm />
            <a className="link-opacity-100 align-self-baseline" onClick={handleIncrement}>
              Nie masz konta?
            </a>
          </>
        ) : (
          <>
            <RegisterForm />
            <a className="link-opacity-100 d-row-flex" onClick={handleDecrement}>
              Masz konto?
            </a>
          </>
        )}
      </>
    );
  
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <div className=''>

        <RenderLoginPage/>
    </div>
  </React.StrictMode>,
)




