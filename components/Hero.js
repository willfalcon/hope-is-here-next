import React from 'react';
import styled from 'styled-components';
// import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import Content from './Content';
import theme, { media } from './theme';
import { rgba } from 'polished';
import { urlFor } from '@/utils/client';
import Image from 'next/image';

const Hero = ({ title, image, heading, text, backgroundColor }) => {
  const src = urlFor(image).url();
  console.log(image);
  return (
    <StyledHero className="hero" color={backgroundColor?.hex || theme.purple}>
      <Image
        className="hero__image"
        src={src}
        alt={image.alt}
        width={image.asset.metadata.dimensions.width}
        height={image.asset.metadata.dimensions.height}
      />
      <h1 className="hero__heading">{heading || title}</h1>
      {text && <Content className="hero__text">{text}</Content>}
    </StyledHero>
  );
};

const StyledHero = styled.div`
  .hero {
    &__heading {
      padding: 0 1.5rem;
      color: ${({ color }) => color};
    }
    &__text {
      padding: 0 1.5rem;
    }
  }
  ${media.break`
    position: relative;
    color: white;
    width: 100%;
    padding-top: 15rem;
    &::before {
      content: '';
      width: 100%;
      height: 90%;
      left: 0;
      bottom: 0;
      background: linear-gradient(to top, ${({ color }) => rgba(color, 0.9)}, ${({ color }) => rgba(color, 0)});
      position: absolute;
      z-index: 1;
    }
    .hero {
      &__image {
        position: absolute;
        width: 100%;
        height: 100%;
        object-fit: cover;
        top: 0;
        left: 0;
        z-index: 0;
      }
      &__heading {
        color: white;
        position: relative;
        z-index: 2;
        text-align: center;
        width: 800px;
        max-width: 100%;
        font-size: 5rem;
        margin: 1rem auto;
      }
      &__text {
        position: relative;
        z-index: 2;
        text-align: center;
        width: 800px;
        max-width: 100%;
        margin-left: auto;
        margin-right: auto;
        font-size: 2rem;
        padding-bottom: .5rem;
    }
  `}
`;

export default Hero;
