import React, { useState, useEffect } from 'react';

import touchScreenDetect from 'hooks/touchScreenDetect';

import Header from 'layout/Header';
import Gallery from 'layout/Gallery';
import GameBoard from 'layout/GameBoard';

export default function App() {
  const [keyword, setKeyword] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [useRandomImage, setUseRandomImage] = useState(false);
  const [startGame, setStartGame] = useState(false);
  const [piecesCount, setPiecesCount] = useState(16);

  const { isTouchScreen } = touchScreenDetect();

  useEffect(() => {
    isTouchScreen &&
      window.alert(
        'The game does not support touch screens and you will not be able to move puzzle pieces. Please visit this site on desktop!'
      );
  }, [isTouchScreen]);

  useEffect(() => {
    if (useRandomImage && selectedImage) {
      setSelectedImage(null);
    }
  }, [useRandomImage]);

  useEffect(() => {
    if (useRandomImage && selectedImage) {
      setUseRandomImage(false);
    }
  }, [selectedImage]);

  useEffect(() => {
    if (!startGame) {
      setSelectedImage(null);
      setUseRandomImage(false);
    }
  }, [startGame]);

  return (
    <>
      {startGame ? (
        <GameBoard
          selectedImage={selectedImage}
          piecesCount={piecesCount}
          setStartGame={setStartGame}
        />
      ) : (
        <>
          <Header
            piecesCount={piecesCount}
            setPiecesCount={setPiecesCount}
            keyword={keyword}
            setKeyword={setKeyword}
            useRandomImage={useRandomImage}
            setUseRandomImage={setUseRandomImage}
            setStartGame={setStartGame}
            selectedImage={selectedImage}
          />
          <Gallery
            keyword={keyword}
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />
        </>
      )}
    </>
  );
}
