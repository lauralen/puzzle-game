import React from 'react';
import style from './Button.module.scss';

const Button = ({ title, type, action, disabled }) => {
  return (
    <button
      className={`button ${type && style[type]}`}
      onClick={action}
      disabled={disabled}
    >
      {title}
    </button>
  );
};

export default Button;
