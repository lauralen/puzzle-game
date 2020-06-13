import React, { useState, useEffect } from 'react';
import axios from 'axios';
import unsplashId from 'utils/unsplashId';
import style from './Gallery.module.scss';

import Loader from 'components/Loader';
import Button from 'components/Button';

const Gallery = ({ keyword, selectedImage, setSelectedImage }) => {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState({ page: true, images: false });
  const [error, setError] = useState();

  const unsplashUrl = 'https://api.unsplash.com/';

  useEffect(() => {
    setError();
    setImages([]);
    setIsLoading({ ...isLoading, page: true });

    setPage(1);
    keyword === '' ? fetchImages() : fetchImagesByKeyword(keyword);
  }, [keyword]);

  useEffect(() => {
    setError();
    keyword === '' ? fetchImages() : fetchImagesByKeyword(keyword);
  }, [page]);

  async function fetchImages() {
    try {
      setIsLoading({ ...isLoading, images: true });

      const res = await axios.get(`${unsplashUrl}photos`, {
        params: { page: page, per_page: 20 },
        headers: {
          Authorization: `Client-ID ${unsplashId}`
        }
      });

      setImages(images.concat(res.data));
      setIsLoading({ images: false, page: false });
    } catch (err) {
      setError('Oops! Something went wrong');
      console.log(err);
      setIsLoading({ images: false, page: false });
    }
  }

  async function fetchImagesByKeyword() {
    try {
      setIsLoading({ ...isLoading, images: true });

      const res = await axios.get(`${unsplashUrl}search/photos`, {
        params: { query: keyword, page: page, per_page: 20 },
        headers: {
          Authorization: `Client-ID ${unsplashId}`
        }
      });

      setImages(images.concat(res.data.results));
      setIsLoading({ images: false, page: false });
    } catch (err) {
      setError('Oops! Something went wrong');
      console.log(err);
      setIsLoading({ images: false, page: false });
    }
  }

  return (
    <div className={style.gallery}>
      {isLoading.page ? (
        <Loader />
      ) : error ? (
        <p>{error}</p>
      ) : (
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
                    backgroundImage: `url(${img.urls.regular})`
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
          {page <= 5 ? (
            <Button
              action={() => {
                setPage(page + 1);
              }}
              title='Load more'
              type='secondary'
              disabled={isLoading.images}
            />
          ) : null}
        </div>
      )}
    </div>
  );
};

export default Gallery;
