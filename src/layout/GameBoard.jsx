import React, { useState, useEffect } from 'react';

import axios from 'axios';
import style from './GameBoard.module.scss';
import unsplashId from 'utils/unsplashId';

import Piece from 'components/Piece';
import Loader from 'components/Loader';
import Confetti from 'components/Confetti';
import GameControls from 'layout/GameControls';

const GameBoard = ({ selectedImage, piecesCount, setStartGame }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [pieces, setPieces] = useState([]);
  const [shuffled, setShuffled] = useState([]);
  const [isTimerActive, setIsTimerActive] = useState(false);

  const pieceSize = 100;
  const piecesPerPuzzleSide = Math.sqrt(piecesCount);
  const puzzleSideLength = piecesPerPuzzleSide * pieceSize;

  const unsplashUrl = 'https://api.unsplash.com/';

  useEffect(() => {
    setIsLoading(true);

    selectedImage
      ? setImageUrl(
          selectedImage.urls.raw +
            `&h=${puzzleSideLength}&w=${puzzleSideLength}&fit=crop`
        )
      : fetchRandomImage();

    let pieces = getPieces();

    setPieces(pieces);
    setShuffled(getShuffledPieces(pieces));
    setIsLoading(false);
  }, []);

  const reset = () => {
    setIsTimerActive(false);
    setIsLoading(true);

    let updatedPieces = pieces.map(piece => {
      return { ...piece, solved: false };
    });

    setPieces(updatedPieces);
    setShuffled(getShuffledPieces(updatedPieces));
    setIsLoading(false);
  };

  const fetchRandomImage = async () => {
    try {
      const res = await axios.get(`${unsplashUrl}photos/random`, {
        params: {
          h: puzzleSideLength,
          w: puzzleSideLength,
          fit: 'crop'
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
        backgroundPosition: getBackgroundPosition(index)
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

  const getShuffledPieces = pieces => {
    let shuffled = [...pieces];

    for (let i = shuffled.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
  };

  const onDragStart = (event, index) => {
    event.dataTransfer.setData('index', index);
    isTimerActive === false && setIsTimerActive(true);
  };

  const onDragOver = event => {
    event.preventDefault();
  };

  const onDrop = (event, target) => {
    const index = Number(event.dataTransfer.getData('index'));

    if (index === target) {
      let updatedPieces = pieces.map(piece => {
        if (piece.index === target) {
          return { ...piece, solved: true };
        } else return piece;
      });

      setPieces(updatedPieces);
      const shuffledPieces = shuffled.filter(piece => piece.index !== target);
      setShuffled(shuffledPieces);
      !shuffledPieces.length && setIsTimerActive(false);
    }
  };

  return (
    <>
      <div className={style.gameBoard}>
        {isLoading || !imageUrl ? (
          <Loader />
        ) : error ? (
          <p>{error}</p>
        ) : (
          <>
            <div
              className={style.puzzle}
              style={{
                width: `${piecesPerPuzzleSide * pieceSize}px`,
                height: `${piecesPerPuzzleSide * pieceSize}px`,
                backgroundImage: `url(${imageUrl})`
              }}
            >
              {pieces.map(piece => {
                return (
                  <div
                    key={piece.index}
                    className={
                      shuffled.length
                        ? piece.solved
                          ? style.solved
                          : null
                        : style.completed
                    }
                    onDragOver={event => onDragOver(event)}
                    onDrop={event => {
                      onDrop(event, piece.index);
                    }}
                  >
                    {piece.index}
                  </div>
                );
              })}
            </div>
            {!shuffled.length && <Confetti />}

            <div className={style.pieces}>
              {shuffled.map(piece => {
                return (
                  <Piece
                    key={piece.index}
                    piece={piece}
                    onDragStart={onDragStart}
                    imageUrl={imageUrl}
                  />
                );
              })}
            </div>
          </>
        )}
      </div>

      <GameControls
        isTimerActive={isTimerActive}
        solved={!shuffled.length}
        reset={reset}
        setStartGame={setStartGame}
      />
    </>
  );
};

export default GameBoard;
