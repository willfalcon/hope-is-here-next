import React, { useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import classNames from 'classnames';

import useViewportSizes from 'use-viewport-sizes';

import Meta from './Meta';
import Header from './Header';

import { SiteContextProvider } from './SiteContext';
import theme, { media } from './theme';
import GlobalStyle from './GlobalStyle';
import useWindowSize from '@/utils/hooks';

const Wrapper = props => {
  const { home = false, children, className, site, meta, seo, title } = props;
  // const [, height, updateVpSizes] = useViewportSizes();
  const [, height] = useWindowSize();

  return (
    <ThemeProvider theme={theme}>
      <SiteContextProvider home={home} data={{ ...site }}>
        <img
          height="1"
          width="1"
          style={{ borderStyle: 'none', position: 'absolute' }}
          alt=""
          src="https://insight.adsrvr.org/track/pxl/?adv=b9zgc1x&ct=0:5x6qgs7&fmt=3"
        />
        <SiteWrapper height={height} className={classNames('site-wrapper', className)} home={home}>
          {/* <Meta {...data?.sanityPage} {...data?.sanityHome} home={home} location={location} /> */}
          <Meta home={home} {...meta} seo={seo} title={title} />
          <Header />
          <PageContainer className="page-container">{children}</PageContainer>
          <GlobalStyle />
        </SiteWrapper>
      </SiteContextProvider>
    </ThemeProvider>
  );
};

const PageContainer = styled.div`
  /* width: 1024px; */
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  /* padding: 0 0.5rem; */
  /* padding-bottom: 90px; */
  height: 100%;
  width: 100%;
  aside {
    .button {
      display: block;
      font-size: 2.4rem;
      padding: 1.5rem 2rem;
    }
  }
`;

const SiteWrapper = styled.div`
  ${({ home }) =>
    home &&
    `
    min-height: 100vh;
    display: grid;
    grid-template-rows: auto 1fr;
  `}
`;

export const site = `
  "site": *[_type == "headerSettings"][0] {
    mainMenu[] {
      ...,
      link->{
        title,
        "slug": slug.current
      }
    },
    contactNumber,
    phoneLabel,
    clinicLink {
      ...,
      link->{
        "slug": slug.current
      }
    }
  },
  "meta": *[_type == "siteSettings"][0] {
    customCSS,
    siteName
  },
  "regions": *[_type == "mapRegion"] | order(region asc) {
    ...
  }
`;

export default Wrapper;
