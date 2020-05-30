import React from 'react';
import style from './Gallery.module.scss';

const Gallery = ({ images, isLoading, error }) => {
  return (
    <div className={style.gallery}>
      {isLoading ? (
        <p>loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          {images &&
            images.map((img, index) => {
              return (
                <img
                  key={index}
                  src={img.urls.regular}
                  alt={img.alt_description}
                />
              );
            })}
        </>
      )}
    </div>
  );
};

export default Gallery;
