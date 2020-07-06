import React, { useState, useEffect } from 'react';
import axios from 'axios';
import style from './GameBoard.module.scss';

import unsplashId from 'utils/unsplashId';
import {
  getRow,
  getColumn,
  getAdjacentPieces,
  getRandomNumberInRange,
  formatTime
} from 'utils/functions';

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
  const maxMergeDistance = 5;

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
      const column = getColumn(index, piecesPerPuzzleSide);
      const row = getRow(index, column, piecesPerPuzzleSide);

      return (piece = {
        index,
        solved: false,
        column,
        row,
        backgroundPosition: `${column * -pieceSize}px ${row * -pieceSize}px`,
        // ensure pieces are positioned within gameboard
        left: getRandomNumberInRange(50, window.innerWidth - 100),
        top: getRandomNumberInRange(50, window.innerHeight - 200),
        adjacentPieces: getAdjacentPieces(
          index,
          column,
          row,
          piecesPerPuzzleSide
        )
      });
    });
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
    const index = Number(event.dataTransfer.getData('index'));

    let updatedPieces = updatePosition(index, event);
    updatedPieces = mergePieces(index, updatedPieces);

    setPieces(updatedPieces);
  };

  const updatePosition = (index, event) => {
    const { dataTransfer, clientX, clientY } = event;

    let updatedPieces = [...pieces];

    updatedPieces[index].left =
      clientX + Number(dataTransfer.getData('leftOffset'));
    updatedPieces[index].top =
      clientY + Number(dataTransfer.getData('topOffset'));

    return updatedPieces;
  };

  const mergePieces = (index, pieces) => {
    let piece = pieces[index];
    let adjacentPieces = piece.adjacentPieces;

    if ('top' in adjacentPieces) {
      const adjacent = pieces[adjacentPieces.top];

      const verticalDist = Math.abs(adjacent.top - piece.top) - pieceSize;
      const horizontalDist = Math.abs(adjacent.left - piece.left);

      if (
        verticalDist <= maxMergeDistance &&
        horizontalDist <= maxMergeDistance
      ) {
        console.log('merged with top');
      }
    }

    if ('right' in adjacentPieces) {
      const adjacent = pieces[adjacentPieces.right];

      const verticalDist = Math.abs(adjacent.top - piece.top);
      const horizontalDist = Math.abs(adjacent.left - piece.left - pieceSize);

      if (
        horizontalDist <= maxMergeDistance &&
        verticalDist <= maxMergeDistance
      ) {
        console.log('merged with right');
      }
    }

    if ('bottom' in adjacentPieces) {
      const adjacent = pieces[adjacentPieces.bottom];

      const verticalDist = Math.abs(adjacent.top - piece.top) - pieceSize;
      const horizontalDist = Math.abs(adjacent.left - piece.left);

      if (
        verticalDist <= maxMergeDistance &&
        horizontalDist <= maxMergeDistance
      ) {
        console.log('merged with bottom');
      }
    }

    if ('left' in adjacentPieces) {
      const adjacent = pieces[adjacentPieces.left];

      const verticalDist = Math.abs(adjacent.top - piece.top);
      const horizontalDist = Math.abs(adjacent.left - piece.left) - pieceSize;

      if (
        horizontalDist <= maxMergeDistance &&
        verticalDist <= maxMergeDistance
      ) {
        console.log('merged with left');
      }
    }

    return pieces;
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
                    top: piece.top,
                    left: piece.left
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
