import React from 'react';
import style from './Input.module.scss';

const Input = ({ value, name, label, type, onChange, placeholder }) => {
  return (
    <>
      <label className={style.label}>{label}</label>
      <input
        value={value}
        name={name}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
      />
    </>
  );
};

export default Input;
