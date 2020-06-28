import React, { useState, useEffect } from 'react';
import axios from 'axios';
import unsplashId from 'utils/unsplashId';
import style from './GameBoard.module.scss';
import { getRandomNumberInRange, formatTime } from 'utils/functions';

import Loader from 'components/Loader';
import Button from 'components/Button';

const GameBoard = ({ selectedImage, piecesCount, setStartGame }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [pieces, setPieces] = useState([]);
  const [time, setTime] = useState(0);

  const pieceSize = 100;
  const piecesPerSide = Math.sqrt(piecesCount);
  const sideLength = piecesPerSide * pieceSize;

  const unsplashUrl = 'https://api.unsplash.com/';

  useEffect(() => {
    setIsLoading(true);

    selectedImage
      ? setImageUrl(
          selectedImage.urls.raw + `&h=${sideLength}&w=${sideLength}&fit=clamp`
        )
      : fetchRandomImage();

    let pieces = getPieces();

    setPieces(pieces);
    setIsLoading(false);
  }, []);

  const reset = () => {
    setTime(0);
    setIsLoading(true);

    let updatedPieces = pieces.map(piece => {
      return { ...piece, solved: false };
    });

    setPieces(updatedPieces);
    setIsLoading(false);
  };

  useEffect(() => {
    if (pieces.length && time !== 0) {
      const timer = setInterval(() => setTime(time + 1), 1000);
      return () => clearInterval(timer);
    }
  }, [time]);

  const fetchRandomImage = async () => {
    try {
      const res = await axios.get(`${unsplashUrl}photos/random`, {
        params: {
          h: sideLength,
          w: sideLength,
          fit: 'clamp'
        },
        headers: {
          Authorization: `Client-ID ${unsplashId}`
        }
      });

      setImageUrl(res.data.urls.custom);
    } catch (err) {
      setError('Oops! Something went wrong');
      setIsLoading(false);
    }
  };

  const getPieces = () => {
    let pieces = [...Array(piecesCount)];

    return pieces.map((piece, index) => {
      return (piece = {
        index,
        solved: false,
        backgroundPosition: getBackgroundPosition(index),
        // ensure pieces are positioned within gameboard
        positionX: getRandomNumberInRange(50, window.innerWidth - 100),
        positionY: getRandomNumberInRange(50, window.innerHeight - 200)
      });
    });
  };

  const getBackgroundPosition = index => {
    const column = getColumn(index);
    const row = getRow(index, column);

    let left = column * -pieceSize;
    let top = row * -pieceSize;

    return `${left}px ${top}px`;
  };

  const getColumn = index => {
    return index < piecesPerSide ? index : getColumn(index - piecesPerSide);
  };

  const getRow = (index, column) => {
    return (index - column) / piecesPerSide;
  };

  const onDragStart = (event, index) => {
    event.dataTransfer.setData('index', index);
    time === 0 && setTime(1);
  };

  const onDragOver = event => {
    event.preventDefault();
  };

  const onDrop = (event, target) => {
    const index = Number(event.dataTransfer.getData('index'));

    pieces[index].positionY = event.clientY - 50;
    pieces[index].positionX = event.clientX - 50;

    setPieces(pieces);
  };

  return (
    <div
      className={style.gameBoard}
      onDragOver={event => onDragOver(event)}
      onDrop={event => {
        onDrop(event);
      }}
    >
      {isLoading || !imageUrl ? (
        <Loader />
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <div className={style.pieces}>
            {pieces.map(piece => {
              return (
                <div
                  key={piece.index}
                  draggable
                  onDragStart={event => onDragStart(event, piece.index)}
                  style={{
                    backgroundImage: `url(${imageUrl})`,
                    backgroundPosition: `${piece.backgroundPosition}`,
                    top: piece.positionY,
                    left: piece.positionX
                  }}
                >
                  {piece.index}
                </div>
              );
            })}
          </div>

          <div className={style.controls}>
            <div>{formatTime(time)}</div>

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
        </>
      )}
    </div>
  );
};

export default GameBoard;
