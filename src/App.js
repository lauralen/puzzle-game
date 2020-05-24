import React, { useState } from 'react';
import axios from 'axios';
import unsplashId from './utils/unsplashId';

export default function App() {
  const [randomImage, setRandomImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  async function fetchData() {
    setError();

    try {
      setIsLoading(true);

      const res = await axios.get('https://api.unsplash.com/photos/random', {
        headers: {
          Authorization: `Client-ID ${unsplashId}`
        }
      });

      setRandomImage(res.data);
    } catch (err) {
      setError('Oops! Something went wrong');
    }
    setIsLoading(false);
  }

  return (
    <div>
      <button
        onClick={() => {
          fetchData();
        }}
      >
        Get random image
      </button>
      {randomImage ? (
        <img src={randomImage.urls.regular} alt={randomImage.alt_description} />
      ) : null}
      {isLoading ? <p>loading...</p> : null}
      {error ? <p>{error}</p> : null}
    </div>
  );
}
