import React from 'react';
import style from './Header.module.scss';

import Button from 'components/Button';
import Select from 'components/Select';

const Header = ({ fetchImage, puzzleSize, setPuzzleSize }) => {
  const { rows, columns } = puzzleSize;

  const handleChange = event => {
    const { name, value } = event.target;
    setPuzzleSize({ ...puzzleSize, [name]: Number(value) });
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

      <Button type='primary' title='Get random image' action={fetchImage} />
    </header>
  );
};

export default Header;
