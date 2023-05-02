import React from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ showModal, getData, imeges }) => {
  return imeges.map(({ id, tags, largeImageURL, webformatURL }) => {
    return (
      <li
        key={id}
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
  });
};

ImageGalleryItem.propTypes = {
  showModal: PropTypes.func.isRequired,
  getData: PropTypes.func.isRequired,
  imeges: PropTypes.arrayOf(PropTypes.object),
};

export default ImageGalleryItem;
