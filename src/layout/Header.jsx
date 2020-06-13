import React from 'react';
import style from './Header.module.scss';

import Button from 'components/Button';
import Select from 'components/Select';
import Input from 'components/Input';
import Checkbox from 'components/Checkbox';

const Header = ({
  puzzleSize,
  setPuzzleSize,
  keyword,
  setKeyword,
  useRandomImage,
  setUseRandomImage,
  setStartGame,
  selectedImage
}) => {
  const { rows, columns } = puzzleSize;

  const handleChange = event => {
    const { name, value } = event.target;
    setPuzzleSize({ ...puzzleSize, [name]: Number(value) });
  };

  const handleKeywordChange = event => {
    setKeyword(event.target.value);
  };

  const handleCheck = event => {
    setUseRandomImage(event.target.checked);
  };

  return (
    <header className={style.header}>
      <Input
        placeholder='Search images'
        value={keyword}
        onChange={handleKeywordChange}
      />

      <Select
        label='Puzzle row count:'
        value={rows}
        name='rows'
        onChange={handleChange}
      >
        <option value='4'>4</option>
        <option value='6'>6</option>
        <option value='8'>8</option>
      </Select>
      <Select
        label='Puzzle column count:'
        value={columns}
        name='columns'
        onChange={handleChange}
      >
        <option value='4'>4</option>
        <option value='6'>6</option>
        <option value='8'>8</option>
      </Select>
      <Checkbox
        name='useRandomImage'
        type='checkbox'
        checked={useRandomImage}
        label='Use random image'
        onChange={handleCheck}
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
