import React from 'react';
import style from './Select.module.scss';

const Select = ({ value, name, label, children, onChange }) => {
  return (
    <div className={style.select}>
      <label>{label}</label>
      <select value={value} name={name} onChange={onChange}>
        {children}
      </select>
    </div>
  );
};

export default Select;
