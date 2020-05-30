import React from 'react';
import style from './Header.module.scss';

import Button from 'components/Button';
import Select from 'components/Select';
import Input from 'components/Input';

const Header = ({
  fetchRandomImage,
  puzzleSize,
  setPuzzleSize,
  keyword,
  setKeyword
}) => {
  const { rows, columns } = puzzleSize;

  const handleChange = event => {
    const { name, value } = event.target;
    setPuzzleSize({ ...puzzleSize, [name]: Number(value) });
  };

  const handleKeywordChange = event => {
    setKeyword(event.target.value);
  };

  return (
    <header className={style.header}>
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

      <Input
        placeholder='Search images'
        value={keyword}
        onChange={handleKeywordChange}
      />
      <Button
        type='primary'
        title='Get random image'
        action={fetchRandomImage}
      />
    </header>
  );
};

export default Header;
