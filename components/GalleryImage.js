import styled from 'styled-components';
import React, { useEffect, useState } from 'react';
import { urlFor } from '../utils/client';
import { rgba } from 'polished';
import { IoExpand } from 'react-icons/io5';
import { IoMdDownload } from 'react-icons/io';

const roundToNearest = (num, multiple) => {
  return Math.ceil(num / multiple) * multiple;
};

const GalleryImage = ({ caption, image, filename = null, width, setModal }) => {
  const [src, setSrc] = useState(null);
  const fullSrc = urlFor(image.image).url();
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState(null);
  console.log(error);
  useEffect(() => {
    if (width) {
      const roundedWidth = roundToNearest(width, 100);
      const src = urlFor(image.image).width(roundedWidth).url();
      setSrc(src);
    }
  }, [width]);

  const [blob, setBlob] = useState(null);

  useEffect(() => {
    fetch(fullSrc)
      .then(res => res.blob())
      .then(blob => {
        const blobURL = URL.createObjectURL(blob);
        setBlob(blobURL);
      });
  }, []);

  return (
    <Figure className="gallery__item">
      <div className="gallery__image-wrapper" style={{ position: 'relative' }}>
        {src && <img className="gallery__image" src={src} alt={image.alt} />}
        <div className="gallery__buttons">
          <button
            className="button gallery__view"
            onClick={() => {
              setModal({ image: fullSrc, alt: image.alt });
            }}
          >
            View
            <IoExpand className="icon" />
          </button>
          <a className="button gallery__download" href={blob} download={filename ? filename : true}>
            Download
            <IoMdDownload className="icon" />
          </a>
        </div>
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </Figure>
  );
};

const Figure = styled.figure`
  .gallery {
    &__image-wrapper {
      position: relative;
    }

    &__buttons {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: ${({ theme }) => rgba(theme.green, 0.5)};
      display: flex;
      gap: 1rem;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      opacity: 0;
      transition: 0.15s;
    }
  }
  :hover {
    .gallery__buttons {
      opacity: 1;
    }
  }
  .button {
    background: ${({ theme }) => theme.orange};
    color: ${({ theme }) => theme.lightPink};
    padding: 1rem 1.5rem;
    font-weight: bold;
    border-radius: 8px;
    border: 0;
    font-size: 2.2rem;
    cursor: pointer;
    text-decoration: none;
    display: flex;
    align-items: end;
    .icon {
      width: 20px;
      height: 20px;
      margin-left: 0.5rem;
    }
  }
`;

export default GalleryImage;
