import React from 'react';
import style from './Checkbox.module.scss';

const Checkbox = ({ checked, name, label, onChange }) => {
  return (
    <>
      <input
        checked={checked}
        name={name}
        type='checkbox'
        onChange={onChange}
      />
      <label className={style.label}>{label}</label>
    </>
  );
};

export default Checkbox;
