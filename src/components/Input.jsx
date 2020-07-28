import React from 'react';
import style from './Input.module.scss';

const Input = ({ value, name, label, type, onChange, placeholder }) => {
  return (
    <div className={style.input}>
      <label>{label}</label>
      <input
        value={value}
        name={name}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Input;
