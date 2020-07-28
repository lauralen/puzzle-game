import React from 'react';
import style from './Header.module.scss';

import Button from 'components/Button';
import Select from 'components/Select';
import Input from 'components/Input';
import Checkbox from 'components/Checkbox';

const Header = ({
  piecesCount,
  setPiecesCount,
  keyword,
  setKeyword,
  useRandomImage,
  setUseRandomImage,
  setStartGame,
  selectedImage
}) => {
  return (
    <header className={style.header}>
      <Input
        placeholder='Search images'
        value={keyword}
        onChange={event => setKeyword(event.target.value)}
      />

      <Select
        label='Size:'
        value={piecesCount}
        name='piecesCount'
        onChange={event => setPiecesCount(Number(event.target.value))}
      >
        <option value='4'>4 pieces</option>
        <option value='16'>16 pieces</option>
        <option value='36'>36 pieces</option>
        <option value='64'>64 pieces</option>
      </Select>
      <Checkbox
        name='useRandomImage'
        type='checkbox'
        checked={useRandomImage}
        label='Random image'
        onChange={event => setUseRandomImage(event.target.checked)}
      />
      <Button
        type='primary'
        title='Start game'
        action={setStartGame}
        disabled={!selectedImage && !useRandomImage}
      />
    </header>
  );
};

export default Header;
