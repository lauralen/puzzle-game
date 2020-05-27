import React, { useState, useEffect } from "react";
import axios from "axios";
import unsplashId from "utils/unsplashId";

import Header from "./layout/Header";
import GameBoard from "./layout/GameBoard";

export default function App() {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [puzzleSize, setPuzzleSize] = useState({
    height: 400,
    width: 600,
    pieceSize: 100
  });

  useEffect(() => {
    fetchImage();
  }, []);

  async function fetchImage() {
    setError();

    try {
      setIsLoading(true);

      const res = await axios.get(
        `https://api.unsplash.com/photos/random?&h=${puzzleSize.height}&w=${puzzleSize.width}&fit=clamp`,
        {
          headers: {
            Authorization: `Client-ID ${unsplashId}`
          }
        }
      );

      setImage(res.data);
    } catch (err) {
      setError("Oops! Something went wrong");
      setIsLoading(false);
    }
  }

  return (
    <>
      <Header fetchImage={fetchImage} />
      {image && (
        <GameBoard
          image={image}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          error={error}
          puzzleSize={puzzleSize}
        />
      )}
    </>
  );
}
