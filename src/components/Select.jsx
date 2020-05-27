import React from 'react';
import style from './Select.module.scss';

const Select = ({ value, name, label, children, onChange }) => {
  return (
    <>
      <label className={style.label}>{label}</label>
      <select value={value} name={name} onChange={onChange}>
        {children}
      </select>
    </>
  );
};

export default Select;
