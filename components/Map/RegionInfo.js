import React from 'react';
import styled from 'styled-components';
import { FaTimes } from 'react-icons/fa';
import formatPhone from '../../utils/formatPhone';
import theme, { media } from '../theme';

function stripSite(url) {
  return url.replace(/^https?\:\/\//i, '');
}

const RegionInfo = props => {
  const { region, active, top, label, phone, website, listItems, color, offset, setActive } = props;

  // TODO: strip protocol from website for display
  const { href, display } = formatPhone(phone);

  return (
    <InfoBox className="region-info" color={color.hex}>
      <p className="step-2">2. Get Help</p>

      <h2 className="region-info__label">Region {region}</h2>

      <h3 className="region-info__name">{label}</h3>

      <ul className="region-info__places">{listItems && listItems.map(item => <li key={item}>{item}</li>)}</ul>

      <a className="region-info__contact" href={website} target="_blank" rel="noreferrer">
        {stripSite(website)}
      </a>
      <a className="region-info__contact" href={href}>
        {display}
      </a>

      <button className="region-info__close" onClick={() => setActive(null)}>
        <FaTimes />
      </button>
    </InfoBox>
  );
};

const InfoBox = styled.div`
  background: #e5f2f3;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 1.5rem 2rem;

  &.enter {
    opacity: 0;
  }
  &.enter-active {
    opacity: 1;
    /* z-index: 2; */
  }
  &.enter-done {
    opacity: 1;
  }
  &.exit {
    opacity: 1;
  }
  &.exit-active {
    opacity: 0;
    /* z-index: 1; */
  }
  &.exit-done {
    opacity: 0;
  }
  &.enter-active,
  &.exit-active {
    transition: 0.5s;
  }

  ${media.break`
    grid-row: 2 / 3;
    grid-column: 1 / 2;
    position: absolute;
    top: initial;
    left: initial;
    align-self: start;

  `}
  .step-2 {
    color: ${({ theme }) => theme.orange};
    text-transform: uppercase;
    font-weight: ${({ theme }) => theme.font.bold};
  }
  .region-info {
    &__label {
      text-transform: uppercase;
      color: ${({ color }) => color};
      border-bottom: 1px solid ${({ color }) => color};
      padding-bottom: 0.5rem;
    }
    &__name {
      color: ${({ theme }) => theme.purple};
      text-transform: uppercase;
    }
    &__places {
      /* margin: 0; */
      /* padding: 0; */
      padding-left: 2rem;
      li {
        color: ${({ theme }) => theme.purple};
      }
    }
    &__contact {
      display: block;
      color: ${({ theme }) => theme.purple};
      font-weight: bold;
      text-decoration: none;
      margin-bottom: 1rem;
      font-size: 2rem;
      &:hover {
        text-decoration: underline;
      }
    }
    &__close {
      position: absolute;
      width: 40px;
      height: 40px;
      background: none;
      border: 0;
      top: 2rem;
      right: 2rem;
      padding: 0;
      margin: 0;
      ${media.break`
        display: none;
      `}
      svg {
        position: static;
        width: 100%;
        height: 100%;
        color: #9ab8ba;
        transform: none;
        margin: 0;
      }
    }
  }
`;

export default RegionInfo;
