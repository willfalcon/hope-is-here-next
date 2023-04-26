import React from 'react';
import styled from 'styled-components';
// import { useStaticQuery, graphql, Link } from 'gatsby';
import Link from 'next/link';
import { media } from './theme';
import useSiteContext from './SiteContext';

const Nav = ({ navOpen }) => {
  const { mainMenu } = useSiteContext();
  return (
    <StyledNav className="header-nav" open={navOpen}>
      {mainMenu?.map(item => {
        if (item.externalUrl) {
          return (
            <a className="menu-item external-link" key={item._key} href={item.externalUrl} target="_blank" rel="noreferrer">
              {item.label}
            </a>
          );
        }
        if (item.link) {
          return (
            <Link className="menu-item internal-link" key={item._key} href={`/${item.link.slug}`}>
              {item.label || item.link.title}
            </Link>
          );
        }
        return (
          <span className="menu-item blank-link" key={item._key}>
            {item.label}
          </span>
        );
      })}
    </StyledNav>
  );
};

const StyledNav = styled.nav`
  position: absolute;
  width: 60%;
  background: ${({ theme }) => theme.lightPink};
  top: 70px;
  right: 0;
  z-index: 3;
  padding-top: 80px;
  transition: 0.15s;
  transform: ${({ open }) => (open ? `translateY(0)` : `translateY(-150%)`)};
  transform: ${({ open }) => (open ? `translateY(0)` : `translateY(calc(-100% - 120px))`)};
  ${media.break`
    top: 120px;
    padding-top: 2rem;
  `}
  .menu-item {
    display: block;
    color: ${({ theme }) => theme.darkTeal};
    font-weight: ${({ theme }) => theme.font.bold};
    text-decoration: none;
    position: relative;
    padding: 2rem;
    font-size: 1.8rem;
    &:first-child {
      padding-top: 0;
    }
    &::after {
      display: block;
      content: '';
      height: 1px;
      width: 100%;
      position: absolute;
      background: ${({ theme }) => theme.orange};
      bottom: 0;
    }
  }
`;

export default Nav;
