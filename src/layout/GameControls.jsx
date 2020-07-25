import React, { useState, useEffect } from 'react';
import style from './GameControls.module.scss';
import { formatTime } from 'utils/functions';
import Button from 'components/Button';

const GameControls = ({ isTimerActive, solved, reset, setStartGame }) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (isTimerActive) {
      const interval = setInterval(() => setSeconds(seconds + 1), 1000);
      return () => clearInterval(interval);
    }
  }, [isTimerActive, seconds]);

  return (
    <div className={style.controls}>
      <div>{formatTime(seconds)}</div>

      {solved && (
        <Button
          type='secondary'
          title='Play again'
          action={() => {
            reset();
          }}
        />
      )}
      <Button
        type={!solved ? 'secondary' : 'primary'}
        title='Go back to gallery'
        action={() => {
          setStartGame(false);
        }}
      />
    </div>
  );
};

export default GameControls;
