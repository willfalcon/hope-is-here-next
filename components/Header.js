import styled from 'styled-components';
import React, { useState } from 'react';
// import { useStaticQuery, graphql, Link } from 'gatsby';
// import { GatsbyImage, getImage } from 'gatsby-plugin-image';
import { ImPhone } from 'react-icons/im';
import Link from 'next/link';
// import useSiteContext from './SiteContext';
import { media } from './theme';
import formatPhone from '../utils/formatPhone';
import NavToggle from './NavToggle';
import Nav from './Nav';
import useSiteContext from './SiteContext';
import HIHPin from './HIHPin';

const Header = () => {
  const { contactNumber, phoneLabel, clinicLink } = useSiteContext();

  const [navOpen, toggleNav] = useState(false);

  return (
    <StyledHeader className="header">
      <StyledDMHLogo className="header__logo dmh-logo" href="/">
        {/* <GatsbyImage className="dmh" image={getImage(whiteDMH)} alt="DMH Logo" /> */}
        <img className="dmh" src="/dmh.png" alt="DMH Logo" />
        <img className="wordmark" src="/mdmh-wordmark.png" alt="Mississippi Department of Mental Health" />

        <img className="mobile-logo" src="/white_dmh_logo.png" alt="Mississippi Department of Mental Health" />
      </StyledDMHLogo>

      <div className="header__nav-wrap">
        {contactNumber && (
          <a className="phone header__button" href={formatPhone(contactNumber).href}>
            <ImPhone />
            <span>{phoneLabel}</span>
          </a>
        )}
        {clinicLink &&
          (clinicLink.link ? (
            <Link className="clinic-link header__button" href={clinicLink.link.slug}>
              <HIHPin />
              <span>{clinicLink.label}</span>
            </Link>
          ) : (
            <a className="clinic-link header__button" href={clinicLink.externalUrl}>
              <HIHPin style={{ width: '50px' }} />
              <span>{clinicLink.label}</span>
            </a>
          ))}
        <NavToggle navOpen={navOpen} toggleNav={toggleNav} />
      </div>
      <Nav navOpen={navOpen} />
    </StyledHeader>
  );
};

const StyledDMHLogo = styled(Link)`
  background: ${({ theme }) => theme.teal};
  padding: 1rem;
  ${media.break`
    display: flex;
    align-items: center;
  `}
`;
const StyledHeader = styled.header`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: 70px;
  background: ${({ theme }) => theme.teal};
  grid-template-areas: 'logo nav';
  justify-items: start;
  .header {
    &__nav-wrap {
      background: ${({ theme }) => theme.green};
      grid-area: nav;
      display: flex;
    }
    &__logo {
      grid-area: logo;
      width: 100%;
      .dmh {
        flex: 0 1 200px;
        max-width: 200px;
        display: none;
      }
      .wordmark {
        flex: 0 1 400px;
        max-width: 400px;
        display: none;
      }
      .mobile-logo {
      }
      ${media.break`
        display: flex;
        justify-content: flex-start;
        .dmh {
          display: block;
        }
        .wordmark {
          display: block;
        }
        .mobile-logo {
          display: none;
        }
      `}
    }
    &__button {
      grid-area: phone;
      display: flex;

      align-items: center;
      justify-content: center;
      padding: 0.5rem;
      margin-left: 1rem;
      svg {
        color: ${({ theme }) => theme.lightCoral};
        fill: ${({ theme }) => theme.lightCoral};
        width: 40px;
        height: 40px;
        margin-bottom: 1rem;
      }
      text-decoration: none;
      span {
        color: white;
        text-transform: uppercase;
        text-align: center;
        font-weight: ${({ theme }) => theme.font.semibold};
        flex: 0 1 60%;
        display: none;
      }
      ${media.break`
      background: none;
      flex-direction: column;
      align-self: center;
      padding-bottom: 0;
      height: 80px;
      svg {
        width: 30px;
        height: 30px;
      }
      span {
        display: block;
        color: ${({ theme }) => theme.lightCoral};
        flex: initial;
        font-size: 1.2rem;
        font-weight: ${({ theme }) => theme.font.bold};
      }
    `}
    }
  }
  ${media.break`
    grid-template-columns: 1fr auto;
    grid-template-rows: auto;
    grid-template-areas:
      'logo nav';
    justify-items: center;
    height: 80px;
  `}

  .nav-toggle {
    grid-area: toggle;
  }

  .phone {
  }
`;

export default Header;
