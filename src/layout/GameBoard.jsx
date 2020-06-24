import React, { useState, useEffect } from 'react';
import axios from 'axios';
import unsplashId from 'utils/unsplashId';
import style from './GameBoard.module.scss';

import Loader from 'components/Loader';
import Button from 'components/Button';

const GameBoard = ({ selectedImage, piecesCount, setStartGame }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const [pieces, setPieces] = useState([]);
  const [shuffled, setShuffled] = useState([]);

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
    setShuffled(getShuffledPieces(pieces));
    setIsLoading(false);
  }, []);

  async function fetchRandomImage() {
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
  }

  const getPieces = () => {
    let pieces = [...Array(piecesCount)];

    return pieces.map((piece, index) => {
      return (piece = {
        position: index,
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
    return index < piecesPerSide ? index : getColumn(index - piecesPerSide);
  };

  const getRow = (index, column) => {
    return (index - column) / piecesPerSide;
  };

  const getShuffledPieces = pieces => {
    let shuffled = [...pieces];

    for (let i = shuffled.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }

    return shuffled;
  };

  const onDragStart = (event, piece) => {
    event.dataTransfer.setData('piece', piece);
  };

  const onDragOver = event => {
    event.preventDefault();
  };

  const onDrop = (event, target) => {
    let piece = Number(event.dataTransfer.getData('piece'));

    if (piece === target) {
      let updatedPieces = pieces.map(piece => {
        if (piece.position === target) {
          return { ...piece, solved: true };
        } else return piece;
      });

      setPieces(updatedPieces);
      setShuffled(shuffled.filter(piece => piece.position !== target));
    } else return;
  };

  return (
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
              width: `${piecesPerSide * pieceSize}px`,
              height: `${piecesPerSide * pieceSize}px`,
              backgroundImage: `url(${imageUrl})`
            }}
          >
            {pieces.map(piece => {
              return (
                <div
                  key={piece.position}
                  className={piece.solved ? style.solved : null}
                  onDragOver={event => onDragOver(event)}
                  onDrop={event => {
                    onDrop(event, piece.position);
                  }}
                >
                  {piece.position}
                  {piece.solved}
                </div>
              );
            })}
          </div>
          {shuffled.length ? (
            <div className={style.pieces}>
              {shuffled.map(piece => {
                return (
                  <div
                    key={piece.position}
                    draggable
                    onDragStart={event => onDragStart(event, piece.position)}
                    style={{
                      backgroundImage: `url(${imageUrl})`,
                      backgroundPosition: `${piece.backgroundPosition}`
                    }}
                  >
                    {piece.position}
                  </div>
                );
              })}
            </div>
          ) : (
            <Button
              type='primary'
              title='Go back to main page'
              action={() => {
                setStartGame(false);
              }}
            />
          )}
        </>
      )}
    </div>
  );
};

export default GameBoard;
