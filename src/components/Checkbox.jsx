import React from 'react';
import style from './Checkbox.module.scss';

const Checkbox = ({ checked, name, label, onChange }) => {
  return (
    <div className={style.checkbox}>
      <input
        checked={checked}
        name={name}
        type='checkbox'
        onChange={onChange}
      />
      <label>{label}</label>
    </div>
  );
};

export default Checkbox;
