import LoginForm from "./LogReg/LoginForm";
import RegisterForm from "./LogReg/RegisterForm";

import React, { useState } from 'react';

function Tester() {
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
          <button className="btn" onClick={handleIncrement}>
            Increase
          </button>
        </>
      ) : (
        <>
          <RegisterForm />
          <button className="btn" onClick={handleDecrement}>
            Decrease
          </button>
        </>
      )}
    </>
  );
}


export default Tester;