import React from 'react';
import style from './Checkbox.module.scss';

const Checkbox = ({ value, name, label, onChange }) => {
  return (
    <>
      <input value={value} name={name} type='checkbox' onChange={onChange} />
      <label className={style.label}>{label}</label>
    </>
  );
};

export default Checkbox;
