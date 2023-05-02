import React from 'react';
import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem';
import css from './ImageGallery.module.css';

const ImageGallery = ({ showModal, dataToRender, getData }) => {
  return (
    <ul className={css.ImageGallery} name="gallery">
      <ImageGalleryItem
        showModal={showModal}
        getData={getData}
        imeges={dataToRender}
      />
    </ul>
  );
};

ImageGallery.propTypes = {
  showModal: PropTypes.func.isRequired,
  getData: PropTypes.func.isRequired,
  dataToRender: PropTypes.arrayOf(PropTypes.object),
};

export default ImageGallery;
