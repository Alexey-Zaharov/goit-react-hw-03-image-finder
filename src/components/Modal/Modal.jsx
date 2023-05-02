import { Component } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = event => {
    if (event.code === 'Escape') {
      this.props.showModal();
    }
  };

  render() {
    const { img, showModal } = this.props;
    return createPortal(
      <div
        className={css.Overlay}
        onClick={event => {
          if (event.target === event.currentTarget) {
            showModal();
          }
        }}
      >
        <div className={css.Modal}>
          <img src={img.webformatURL} alt={img.tags} />
        </div>
      </div>,
      modalRoot
    );
  }
}

Modal.propTypes = {
  showModal: PropTypes.func.isRequired,
  img: PropTypes.objectOf(PropTypes.string),
};

export default Modal;
