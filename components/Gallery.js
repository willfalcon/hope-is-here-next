import React, { useState } from 'react';
import styled from 'styled-components';
// import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import GalleryImage from './GalleryImage';
import { useMeasure } from 'react-use';
import { rgba } from 'polished';

import { IoCloseSharp } from 'react-icons/io5';

const Gallery = ({ images, columns }) => {
  const [ref, size] = useMeasure();

  const imageWidth = size.width / columns - 20 * (columns - 1);
  const [modalImage, setModal] = useState(null);
  return (
    <>
      <GalleryContainer className="gallery" columns={columns} ref={ref}>
        {images.map(image => {
          return <GalleryImage key={image._key} {...image} width={imageWidth} setModal={setModal} />;
        })}
      </GalleryContainer>
      {modalImage && (
        <Modal className="image-modal">
          <img className="image-modal__image" src={modalImage.image} alt={modalImage.alt} />
          <button
            className="close"
            onClick={() => {
              setModal(null);
            }}
          >
            <IoCloseSharp className="close-icon" />
          </button>
        </Modal>
      )}
    </>
  );
};

const Modal = styled.div`
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: ${rgba('black', 0.8)};
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 4;
  .close {
    position: absolute;
    top: 5rem;
    right: 5rem;
    background: none;
    border: 0;
    cursor: pointer;
  }
  .close-icon {
    fill: white;
    stroke: white;
    width: 50px;
    height: 50px;
  }
  img {
    width: 700px;
    max-width: 100%;
  }
`;

const GalleryContainer = styled.div`
  display: grid;
  grid-template-columns: ${({ columns = 3 }) => `repeat(${columns}, 1fr)`};
  gap: 2rem;
  grid-auto-rows: auto;
  /* align-items: center; */
  figure {
    margin: 0;
  }
`;
export default Gallery;
