import React from 'react';
import style from './ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export default function ImageGalleryItem({
  webformatURL,
  largeImageURL,
  onClick,
}) {
  const handleChange = () => onClick(largeImageURL);

  return (
    <div className={style.ImageGalleryItem} onClick={handleChange}>
      <img src={webformatURL} alt={''} className={style.image} />
    </div>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};
