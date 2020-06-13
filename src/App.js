import React, { useState } from 'react';
import Header from 'layout/Header';
import Gallery from 'layout/Gallery';
import GameBoard from 'layout/GameBoard';

export default function App() {
  const [keyword, setKeyword] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [useRandomImage, setUseRandomImage] = useState(null);
  const [startGame, setStartGame] = useState(null);
  const [puzzleSize, setPuzzleSize] = useState({
    rows: 4,
    columns: 6,
    pieceSize: 100
  });

  return (
    <>
      {startGame ? (
        <GameBoard selectedImage={selectedImage} puzzleSize={puzzleSize} />
      ) : (
        <>
          <Header
            puzzleSize={puzzleSize}
            setPuzzleSize={setPuzzleSize}
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
