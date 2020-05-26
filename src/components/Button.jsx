import React from 'react';
import style from './Button.module.scss';

const Button = ({ title, type, action }) => {
  return (
    <button className={`button ${type && style[type]}`} onClick={action}>
      {title}
    </button>
  );
};

export default Button;
