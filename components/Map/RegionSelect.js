import React from 'react';
import styled from 'styled-components';
import { media } from '../theme';

const RegionSelect = ({ regions, setActive }) => {
  return (
    <>
      <RegionSelectHeading className="region-select-heading">1. Select your region.</RegionSelectHeading>
      <RegionSelectorList className="region-selector-list">
        {regions.map(region => {
          return (
            <li className="region-select" key={region.id} style={{ backgroundColor: region.color.hex }}>
              <button className="region-select__button" onClick={() => setActive(region.region)}>
                <span>{region.region}</span>
              </button>
            </li>
          );
        })}
      </RegionSelectorList>
    </>
  );
};

const RegionSelectHeading = styled.h4`
  text-align: center;
  color: ${({ theme }) => theme.orange};
  text-transform: uppercase;
  ${media.break`
    display: none;
  `}
`;

const RegionSelectorList = styled.ul`
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  list-style: none;
  margin: 0;
  padding: 0;
  width: 250px;
  margin-left: auto;
  margin-right: auto;
  gap: 1rem;
  ${media.break`
    display: none;
  `}
  .region-select {
    flex: 0 0 50px;
    height: 50px;
    border-radius: 50%;
    padding: 0;
    position: relative;
    margin-bottom: 1.2rem;
    &__button {
      height: 100%;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background: none;
      border: 0;
      color: white;
      font-size: 3rem;
      font-weight: ${({ theme }) => theme.font.semibold};
    }
    span {
      position: absolute;
      top: 22px;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
`;

export default RegionSelect;
