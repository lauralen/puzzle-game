import React, { useState, useEffect } from 'react';
import axios from 'axios';
import unsplashId from 'utils/unsplashId';
import style from './Gallery.module.scss';

import Loader from 'components/Loader';
import Button from 'components/Button';

const Gallery = ({ keyword, selectedImage, setSelectedImage }) => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const unsplashUrl = 'https://api.unsplash.com/';

  useEffect(() => {
    setError();
    setImages([]);
    setIsLoading(true);

    const timer = setTimeout(() => {
      keyword === '' ? fetchImages(1) : fetchImagesByKeyword(keyword, 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [keyword]);

  const fetchImages = async page => {
    try {
      setIsLoading(true);

      const res = await axios.get(`${unsplashUrl}photos`, {
        params: { page: page, per_page: 10 },
        headers: {
          Authorization: `Client-ID ${unsplashId}`
        }
      });

      let results = res.data;

      if (page === 1) {
        setImages(results);
      } else {
        setImages(images.concat(results));
      }

      setPage(page);
      setIsLoading(false);
    } catch (err) {
      setError('Oops! Something went wrong');
      console.log(err);
      setIsLoading(false);
    }
  };

  const fetchImagesByKeyword = async (keyword, page) => {
    try {
      setIsLoading(true);

      const res = await axios.get(`${unsplashUrl}search/photos`, {
        params: { query: keyword, page: page, per_page: 10 },
        headers: {
          Authorization: `Client-ID ${unsplashId}`
        }
      });

      const { results } = res.data;

      if (page === 1) {
        setImages(results);
      } else {
        setImages(images.concat(results));
      }

      setPage(page);
      setIsLoading(false);
    } catch (err) {
      setError('Oops! Something went wrong');
      console.log(err);
      setIsLoading(false);
    }
  };

  return (
    <div className={style.gallery}>
      <div className={style.grid}>
        {images &&
          images.map((img, index) => {
            return (
              <div
                key={index}
                className={[
                  style.img,
                  img === selectedImage ? style.selected : null
                ].join(' ')}
                style={{
                  backgroundImage: `url(${img.urls.small})`
                }}
                onClick={() => {
                  setSelectedImage(
                    selectedImage === images[index] ? null : images[index]
                  );
                }}
              >
                <div className={style.credits}>
                  Photo by{' '}
                  <a
                    href={img.user.links.html}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    {img.user.name}
                  </a>{' '}
                  /{' '}
                  <a
                    href='https://unsplash.com/'
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    Unsplash
                  </a>
                </div>
              </div>
            );
          })}
      </div>
      {error && <p>{error}</p>}
      {isLoading && <Loader />}
      {!isLoading && page <= 5 && (
        <Button
          action={() => {
            keyword === ''
              ? fetchImages(page + 1)
              : fetchImagesByKeyword(keyword, page + 1);
          }}
          title='Load more'
          type='primary'
        />
      )}
    </div>
  );
};

export default Gallery;
