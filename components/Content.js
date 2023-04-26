import React from 'react';
// import { Link } from 'gatsby';
import Link from 'next/link';

import { PortableText } from '@portabletext/react';
import classNames from 'classnames';
import styled from 'styled-components';
import groq from 'groq';

import { media } from './theme';

import Button from './Button';
import Agenda from './Agenda';
import Map from './Map/Map';
import Gallery from './Gallery';
import { urlFor } from '@/utils/client';
import Image from 'next/image';

export const body = groq`
  ...,
  link->{
    "slug": slug.current
  },
  asset->{...}
`;

const customSerializers = {
  block: {
    large: ({ children }) => <p className="large-text">{children}</p>,
  },
  types: {
    button: ({ value }) => {
      return <Button {...value} />;
    },
    agenda: props => {
      return <Agenda {...props} />;
    },
    map: () => <Map />,
    image: ({ value }) => {
      const src = urlFor(value).width(900).format('jpg').url();
      const width = 900;
      const height = 900 / value.asset.metadata.dimensions.aspectRatio;

      return <Image className="content-image" src={src} alt={value.alt || ''} width={width} height={height} />;
    },
    gallery: ({ value }) => {
      return <Gallery {...value} />;
    },
  },
  marks: {
    center: props => {
      return <span className="text-center">{props.children}</span>;
    },
    file: ({
      children,
      value: {
        asset: { url },
      },
    }) => {
      return (
        <a class="file-link" href={url} target="_blank" rel="noreferrer">
          {children}
        </a>
      );
    },
    largeText: props => {
      return <p className="large-text">{props.children}</p>;
    },
    link: ({ children, value }) => {
      const { externalUrl, url } = value;
      if (externalUrl) {
        return (
          <a href={externalUrl} target="_blank" rel="noopener noreferrer">
            {children}
          </a>
        );
      }
      return <Link href={`/${url?.slug?.current || null}`}>{children}</Link>;
    },
    id: ({ children, value }) => {
      return value.id ? <span id={value.id.current}>{children}</span> : children;
    },
  },
};

const Content = React.forwardRef(function ContentComp({ className, children, style }, ref) {
  return (
    <Container style={style} className={classNames('block-content block-content-wrapper', className)} ref={ref}>
      {children && <PortableText value={children} components={customSerializers} className="block-content-wrapper portable-text" />}
    </Container>
  );
});

const Container = styled.div`
  padding: 0 1rem;
  blockquote {
    font-family: ${({ theme }) => theme.font.special};
    font-weight: ${({ theme }) => theme.font.bold};
    color: ${({ theme }) => theme.red};
    text-align: center;
    font-size: 2.4rem;
    margin: 1rem 0;
    line-height: 1.5;
    ${media.break`
      font-size: 3.6rem;
    `}
  }
  font-size: 1.8rem;
  p,
  li {
    color: ${({ theme }) => theme.navy};
    line-height: 1.5;
    margin-top: 0;
    font-size: inherit;
    ${media.break`
      
    `}
  }
  .large-text {
    color: ${({ theme }) => theme.dark};
    font-size: 2.2rem;
  }
  h1,
  h2,
  h3,
  h4 {
    > span {
      display: block;
    }
  }
  h1 {
    font-weight: ${({ theme }) => theme.font.bold};
    color: ${({ theme }) => theme.purple};
    text-align: center;
    font-size: 2.4rem;
    margin: 1rem 0;
    line-height: 1.5;
    ${media.break`
    font-size: 3.6rem;
    `}
  }
  h2 {
    color: ${({ theme }) => theme.purple};
    font-weight: ${({ theme }) => theme.font.black};
    margin: 1rem 0;
    font-size: 2.8rem;
    ${media.break`
      font-size: 3.6rem;
    `}
  }

  .columns {
    ${media.break`
      display: flex;
      align-items: center;
      .column {
        flex: 0 0 50%;
        padding: 1rem 2rem;
      }
    `}
  }
`;

const StyledListBlock = styled.div`
  padding: 1rem;
  margin: 1rem 0;

  .block-content-wrapper {
    > * {
      margin-top: 0;
    }
    p,
    li {
      color: ${({ theme }) => theme.red};
      font-size: 2.4rem;
      font-weight: ${({ theme }) => theme.font.bold};
      text-align: center;
    }
    ${media.break`
    columns: 2;
    `}
  }
`;

export default Content;
