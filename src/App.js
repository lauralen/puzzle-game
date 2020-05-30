import React, { useState, useEffect } from 'react';
import axios from 'axios';
import unsplashId from 'utils/unsplashId';

import Header from './layout/Header';
import Gallery from './layout/Gallery';
import GameBoard from './layout/GameBoard';

export default function App() {
  const [images, setImages] = useState(null);
  const [keyword, setKeyword] = useState('');
  const [randomImage, setRandomImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [puzzleSize, setPuzzleSize] = useState({
    rows: 4,
    columns: 6,
    pieceSize: 100
  });
  const unsplashUrl = 'https://api.unsplash.com/';

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    setError();
    keyword === '' ? fetchImages() : fetchImagesByKeyword(keyword);
  }, [keyword]);

  async function fetchImages() {
    try {
      setIsLoading(true);

      const res = await axios.get(`${unsplashUrl}photos`, {
        params: { per_page: 5 },
        headers: {
          Authorization: `Client-ID ${unsplashId}`
        }
      });

      setImages(res.data);
      console.log(res.data);
      setIsLoading(false);
    } catch (err) {
      setError('Oops! Something went wrong');
      setIsLoading(false);
    }
  }

  async function fetchImagesByKeyword() {
    try {
      setIsLoading(true);

      const res = await axios.get(`${unsplashUrl}search/photos`, {
        params: { query: keyword, per_page: 5 },
        headers: {
          Authorization: `Client-ID ${unsplashId}`
        }
      });

      setImages(res.data.results);
      setIsLoading(false);
    } catch (err) {
      setError('Oops! Something went wrong');
      setIsLoading(false);
    }
  }

  async function fetchRandomImage() {
    try {
      setIsLoading(true);

      const res = await axios.get(`${unsplashUrl}photos/random`, {
        params: {
          h: puzzleSize.rows * 100,
          w: puzzleSize.columns * 100,
          fit: 'clamp'
        },
        headers: {
          Authorization: `Client-ID ${unsplashId}`
        }
      });

      setRandomImage(res.data);
    } catch (err) {
      setError('Oops! Something went wrong');
      setIsLoading(false);
    }
  }

  return (
    <>
      <Header
        fetchRandomImage={fetchRandomImage}
        puzzleSize={puzzleSize}
        setPuzzleSize={setPuzzleSize}
        keyword={keyword}
        setKeyword={setKeyword}
        fetchImages={fetchImages}
      />
      <Gallery
        images={images}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
        error={error}
      />
      {randomImage && (
        <GameBoard
          image={randomImage}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          error={error}
          puzzleSize={puzzleSize}
        />
      )}
    </>
  );
}
