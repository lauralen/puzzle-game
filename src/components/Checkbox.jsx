import React from 'react';
import style from './Checkbox.module.scss';

const Checkbox = ({ value, name, label, onChange }) => {
  return (
    <>
      <label className={style.label}>{label}</label>
      <input value={value} name={name} type='checkbox' onChange={onChange} />
      <span />
    </>
  );
};

export default Checkbox;
