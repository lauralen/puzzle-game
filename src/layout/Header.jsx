import React from 'react';
import style from './Header.module.scss';
import Button from 'components/Button';

const Header = ({ fetchImage }) => {
  return (
    <header className={style.header}>
      <Button type='primary' title='Get random image' action={fetchImage} />
    </header>
  );
};

export default Header;
