import React from 'react';
import styled from 'styled-components';
import { media } from './theme';

const NavToggle = ({ navOpen, toggleNav }) => {
  return (
    <Toggle className="nav-toggle" open={navOpen} onClick={() => toggleNav(!navOpen)}>
      <span />
      <span />
      <span />
      <span>Menu</span>
    </Toggle>
  );
};

const Toggle = styled.button`
  background: none;
  border: 0;
  position: relative;
  width: 120px;
  height: 80px;
  z-index: 4;
  cursor: pointer;
  ${media.break`
    align-self: center;
  `}
  span {
    background: ${({ theme }) => theme.lightCoral};
    position: absolute;
    width: 40px;
    height: 6px;
    border-radius: 3px;
    top: 0;
    left: 0;
    opacity: 1;
    transition: 0.15s;
    &:nth-child(1) {
      transform: ${({ open }) =>
        open ? `translateX(40px) translateY(30px) rotate(45deg)` : `translateX(40px) translateY(19px) rotate(0)`};
    }
    &:nth-child(2) {
      transform: translateX(40px) translateY(30px);
      opacity: ${({ open }) => (open ? 0 : 1)};
    }
    &:nth-child(3) {
      transform: ${({ open }) =>
        open ? `translateX(40px) translateY(30px) rotate(-45deg)` : `translateX(40px) translateY(41px) rotate(0)`};
    }
    &:nth-child(4) {
      display: none;
      ${media.break`
        text-transform: uppercase;
        color: ${({ theme }) => theme.lightCoral};
        display: block;
        left: 50%;
        transform: translateX(-50%) translateY(55px);
        background: none;
        font-weight: bold;
        font-size: 1.2rem;
        text-align: center;
      `}
    }
  }
`;

export default NavToggle;
