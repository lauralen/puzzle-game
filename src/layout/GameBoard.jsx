import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from './GameBoard.module.scss';

import unsplashId from 'utils/unsplashId';
import { getRandomNumberInRange, formatTime } from 'utils/functions';

import Loader from 'components/Loader';
import GameControls from 'layout/GameControls';

const GameBoard = ({ selectedImage, piecesCount, setStartGame }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [pieces, setPieces] = useState([]);
  const [timeCounter, setTimeCounter] = useState(0);

  const pieceSize = 100;
  const piecesPerPuzzleSide = Math.sqrt(piecesCount);
  const puzzleSideLength = piecesPerPuzzleSide * pieceSize;

  const unsplashUrl = 'https://api.unsplash.com/';

  useEffect(() => {
    setIsLoading(true);

    selectedImage
      ? setImageUrl(
          selectedImage.urls.raw +
            `&h=${puzzleSideLength}&w=${puzzleSideLength}&fit=clamp`
        )
      : fetchRandomImage();

    let pieces = getPieces();

    setPieces(pieces);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (pieces.length && timeCounter !== 0) {
      const timeCounter = setInterval(
        () => setTimeCounter(timeCounter + 1),
        1000
      );
      return () => clearInterval(timeCounter);
    }
  }, [timeCounter]);

  const reset = () => {
    setTimeCounter(0);
    setIsLoading(true);

    let updatedPieces = pieces.map(piece => {
      return { ...piece, solved: false };
    });

    setPieces(updatedPieces);
    setIsLoading(false);
  };

  const fetchRandomImage = async () => {
    try {
      const res = await axios.get(`${unsplashUrl}photos/random`, {
        params: {
          h: puzzleSideLength,
          w: puzzleSideLength,
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
    return index < piecesPerPuzzleSide
      ? index
      : getColumn(index - piecesPerPuzzleSide);
  };

  const getRow = (index, column) => {
    return (index - column) / piecesPerPuzzleSide;
  };

  const onDragStart = (event, index) => {
    const { target, dataTransfer, clientX, clientY } = event;

    let style = window.getComputedStyle(target, null);

    dataTransfer.setData('index', index);
    dataTransfer.setData(
      'leftOffset',
      parseInt(style.getPropertyValue('left'), 10) - clientX
    );
    dataTransfer.setData(
      'topOffset',
      parseInt(style.getPropertyValue('top'), 10) - clientY
    );

    timeCounter === 0 && setTimeCounter(1);
  };

  const onDragOver = event => {
    event.preventDefault();
  };

  const onDrop = event => {
    const { dataTransfer, clientX, clientY } = event;

    let updatedPieces = [...pieces];

    const index = Number(dataTransfer.getData('index'));

    updatedPieces[index].positionX =
      clientX + Number(dataTransfer.getData('leftOffset'));
    updatedPieces[index].positionY =
      clientY + Number(dataTransfer.getData('topOffset'));

    setPieces(updatedPieces);
  };

  return (
    <>
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
        )}
      </div>

      <GameControls
        time={formatTime(timeCounter)}
        pieces={pieces}
        reset={reset}
        setStartGame={setStartGame}
      />
    </>
  );
};

export default GameBoard;
