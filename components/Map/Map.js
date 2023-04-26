import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
// import { useStaticQuery, graphql } from 'gatsby';

import { TransitionGroup, CSSTransition } from 'react-transition-group';

import RegionInfo from './RegionInfo.js';
import MapRegions from './hih-regions_MAP.js';
import RegionSelect from './RegionSelect.js';
import { media } from '../theme.js';
import useSiteContext from '../SiteContext.js';
import useWindowSize from '@/utils/hooks.js';

const Map = () => {
  // const [vW, vH, updateVpSizes] = useViewportSizes();
  const [vW] = useWindowSize();
  const mobile = vW < 768;

  const width = mobile ? 400 : 500;
  const aspect = 250 / 427;
  const height = width / aspect;

  // a = w / h
  // ah = w
  // h = w / a
  const [active, setActive] = useState(null);

  useEffect(() => {
    if (!mobile) {
      setActive(8);
    }
  }, [mobile]);

  // const {
  //   allSanityMapRegion: { edges: regionNodes },
  // } = useStaticQuery(graphql`
  //   {
  //     allSanityMapRegion(sort: { fields: region }) {
  //       edges {
  //         node {
  //           id
  //           label
  //           listItems
  //           phone
  //           region
  //           website
  //           offset
  //           color {
  //             hex
  //           }
  //         }
  //       }
  //     }
  //   }
  // `);

  // const regions = regionNodes.map(region => ({ ...region.node }));
  const { regions } = useSiteContext();

  return (
    <MapContainer className="map-container">
      <h3 className="map-heading">Community Health Centers Map</h3>
      <MapStyles className="map" height={height} width={width} active={active}>
        <MapRegionHeading className="map-regions-heading">1. Select your region.</MapRegionHeading>
        <MapRegions active={active} setActive={setActive} />
        {mobile && (
          <TransitionGroup>
            <CSSTransition key={active} timeout={500}>
              <>{active && <RegionInfo {...regions[regions.findIndex(region => region.region === active)]} setActive={setActive} />}</>
            </CSSTransition>
          </TransitionGroup>
        )}
      </MapStyles>
      {!mobile && (
        <TransitionGroup>
          <CSSTransition key={active} timeout={500}>
            <>{active && <RegionInfo {...regions[regions.findIndex(region => region.region === active)]} setActive={setActive} />}</>
          </CSSTransition>
        </TransitionGroup>
      )}
      {/* <InfoBoxes className="info-boxes">
        {regions.map(region => (
          <RegionInfo key={region.id} {...region} active={active} />
        ))}
      </InfoBoxes> */}

      <RegionSelect regions={regions} setActive={setActive} />
    </MapContainer>
  );
};

const MapRegionHeading = styled.h4`
  text-align: center;
  color: ${({ theme }) => theme.orange};
  text-transform: uppercase;
  display: none;
  padding-left: 10rem;
  ${media.break`
  display: block;
  `}
`;

const MapContainer = styled.div`
  position: relative;
  width: 100%;
  /* padding-top: 50px; */

  .map-heading {
    text-align: center;
    color: #18527d;
    text-transform: uppercase;
    grid-row: 1 / 2;
    grid-column: 1 / 2;
    ${media.break`
      text-align: left;
      font-size: 3rem;
    `}
  }

  ${media.break`
    display: grid;
    width: 900px;
    margin: 0 auto;
    grid-template-columns: 2fr 3fr;
    grid-template-rows: auto 1fr;
    
  `}
`;

const MapStyles = styled.div`
  position: relative;
  /* flex: 0 0 1024px; */
  max-width: 100%;
  margin-left: auto;
  margin-right: auto;
  height: ${({ height }) => height + 20}px;
  width: ${({ width }) => width}px;
  margin-bottom: -18rem;
  grid-row: 1 / 3;
  grid-column: 2 / 3;
  svg {
    position: absolute;
    width: ${({ width }) => width}px;
    height: ${({ height }) => height + 20}px;
    pointer-events: none;
    margin-top: -8rem;
    perspective: 500px;
    .region {
      position: relative;
      pointer-events: initial;
      cursor: pointer;
      z-index: 0;
      > g {
        transition: 0.15s;
      }
      &:hover {
        > g {
          transform: scale(1.03) translateX(-15px) translateY(-15px) translateZ(15px);
          z-index: 1;
          > text {
            transition: 0.15s;
            opacity: 1;
          }
        }
      }
    }
  }
`;

export default Map;
