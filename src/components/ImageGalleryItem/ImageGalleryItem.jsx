import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({
  showModal,
  getData,
  tags,
  largeImageURL,
  webformatURL,
}) => {
  return (
    <li
      className={css.ImageGalleryItem}
      onClick={() => {
        getData(largeImageURL, tags);
        showModal();
      }}
    >
      <img
        className={css.ImageGalleryItemImage}
        src={webformatURL}
        alt={tags}
      />
    </li>
  );
};

ImageGalleryItem.propTypes = {
  showModal: PropTypes.func.isRequired,
  getData: PropTypes.func.isRequired,
  tags: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  webformatURL: PropTypes.string.isRequired,
};

export default ImageGalleryItem;
