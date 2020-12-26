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
  const [draggedPiece, setDraggedPiece] = useState(null);

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
    const { touches } = event;

    const { clientX, clientY } = touches ? touches[0] : event;

    setDraggedPiece({
      index: index,
      initialPosition: { x: clientX, y: clientY }
    });

    isTimerActive === false && setIsTimerActive(true);
  };

  const onDrag = event => {
    if (!draggedPiece) return;

    const { clientX, clientY } = event.touches ? event.touches[0] : event;

    const dropPoint = document.elementsFromPoint(clientX, clientY);
    const target = dropPoint.find(el => el.id === 'dropzone');

    let targetIndex;

    if (target) {
      let index = target.getAttribute('index');
      targetIndex = Number(index);
    }

    let x = clientX - draggedPiece.initialPosition.x;
    let y = clientY - draggedPiece.initialPosition.y;

    setDraggedPiece({ ...draggedPiece, position: { x, y }, targetIndex });
  };

  const onDrop = () => {
    const { index, targetIndex } = draggedPiece;

    if (typeof targetIndex === 'number' && index === targetIndex) {
      let updatedPieces = pieces.map(piece => {
        if (piece.index === targetIndex) {
          return { ...piece, solved: true };
        } else return piece;
      });
      setPieces(updatedPieces);
      const shuffledPieces = shuffled.filter(
        piece => piece.index !== targetIndex
      );
      setShuffled(shuffledPieces);
      !shuffledPieces.length && setIsTimerActive(false);
    }

    setDraggedPiece(null);
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
                const { index, solved } = piece;

                return (
                  <div
                    key={index}
                    id='dropzone'
                    index={index}
                    className={
                      shuffled.length
                        ? solved
                          ? style.solved
                          : null
                        : style.completed
                    }
                  />
                );
              })}
            </div>

            {!shuffled.length && <Confetti />}

            <div className={style.pieces}>
              {shuffled.map(piece => {
                const { index } = piece;

                return (
                  <Piece
                    key={index}
                    piece={piece}
                    imageUrl={imageUrl}
                    onDragStart={event => onDragStart(event, index)}
                    onDrag={event => onDrag(event)}
                    onDrop={() => {
                      onDrop();
                    }}
                    position={
                      index === draggedPiece?.index
                        ? draggedPiece.position
                        : null
                    }
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
