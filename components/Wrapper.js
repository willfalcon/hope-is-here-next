import React, { useEffect } from 'react';
import styled, { ThemeProvider } from 'styled-components';
import classNames from 'classnames';

import useViewportSizes from 'use-viewport-sizes';

// import Meta from './Meta';
import Header from './Header';

import { SiteContextProvider } from './SiteContext';
import theme, { media } from './theme';
import GlobalStyle from './GlobalStyle';

const Wrapper = props => {
  const { home = false, children, className, data, location, site } = props;

  const [, height, updateVpSizes] = useViewportSizes();

  useEffect(() => {
    if (!height) {
      updateVpSizes();
    }
  }, []);

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
        <SiteWrapper height={height} className={classNames('site-wrapper', className)}>
          {/* <Meta {...data?.sanityPage} {...data?.sanityHome} home={home} location={location} /> */}
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
  padding-bottom: 90px;
  aside {
    .button {
      display: block;
      font-size: 2.4rem;
      padding: 1.5rem 2rem;
    }
  }
`;

const SiteWrapper = styled.div``;

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
  "regions": *[_type == "mapRegion"] {
    ...
  }
`;

export default Wrapper;
