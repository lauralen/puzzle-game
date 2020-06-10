import React from "react";
import Loader from "components/Loader";
import style from "./Gallery.module.scss";

const Gallery = ({
  images,
  isLoading,
  error,
  selectedImage,
  setSelectedImage
}) => {
  return (
    <div className={style.gallery}>
      {isLoading ? (
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
                  className={`img ${img === selectedImage && "selected"}`}
                  className={[
                    style.img,
                    img === selectedImage ? style.selected : null
                  ].join(" ")}
                  style={{
                    backgroundImage: `url(${img.urls.regular})`
                  }}
                  onClick={() => {
                    setSelectedImage(images[index]);
                  }}
                >
                  <div className={style.credits}>
                    Photo by{" "}
                    <a
                      href={img.user.links.html}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {img.user.name}
                    </a>{" "}
                    /{" "}
                    <a
                      href="https://unsplash.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Unsplash
                    </a>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
};

export default Gallery;
