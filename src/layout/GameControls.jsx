import React from 'react';
import style from './GameControls.module.scss';

import Button from 'components/Button';

const GameControls = ({ time, pieces, reset, setStartGame }) => {
  return (
    <div className={style.controls}>
      <div>{time}</div>

      {!pieces.length && (
        <Button
          type='secondary'
          title='Play again'
          action={() => {
            reset();
          }}
        />
      )}
      <Button
        type={pieces.length ? 'secondary' : 'primary'}
        title='Go back to gallery'
        action={() => {
          setStartGame(false);
        }}
      />
    </div>
  );
};

export default GameControls;
