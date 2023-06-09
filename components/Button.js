import React from 'react';
import styled, { css } from 'styled-components';
import classNames from 'classnames';
import { darken } from 'polished';
import Link from 'next/link';
// import { OutboundLink } from 'gatsby-plugin-google-gtag';

const Button = ({ className, link, url, text, buttonId, newWindow }) => {
  return newWindow ? (
    <StyledOutboundLink className={classNames(className, 'button')} href={url} id={buttonId} target="_blank" rel="noopener">
      {text}
    </StyledOutboundLink>
  ) : link ? (
    <StyledLink className={classNames(className, 'button')} href={`/${link.slug}`} id={buttonId}>
      {text}
    </StyledLink>
  ) : (
    <StyledButton className={classNames(className, 'button')} href={url} id={buttonId}>
      {text}
    </StyledButton>
  );
};

const buttonStyles = css`
  background: ${({ theme }) => theme.orange};
  color: white;
  text-decoration: none;
  text-align: center;
  padding: 1rem 2rem;
  border-radius: 23px;
  display: inline-block;
  font-weight: ${({ theme }) => theme.font.bold};
  font-size: 2rem;
  transition: 0.3s;
  margin-bottom: 2rem;
  :hover {
    background: ${({ theme }) => darken(0.15, theme.orange)};
  }
`;

const StyledOutboundLink = styled.a`
  ${buttonStyles}
`;

const StyledButton = styled.a`
  ${buttonStyles}
`;

const StyledLink = styled(Link)`
  ${buttonStyles}
`;

export default Button;
