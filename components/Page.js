import React from 'react';
import styled from 'styled-components';

import Content from './Content';
import Hero from './Hero';

const Page = ({ title, content, hero }) => {
  return (
    <>
      {hero?.image ? <Hero {...hero} title={title} /> : <PageTitle className="page-title">{title}</PageTitle>}
      <StyledPage>{content && <Content>{content}</Content>}</StyledPage>;
    </>
  );
};

const PageTitle = styled.h1`
  text-align: center;
  padding: 1rem 0.5rem;
  font-size: 4rem;
  width: 900px;
  max-width: 100%;
  margin: 0 auto;
`;

const StyledPage = styled.div`
  padding: 0 0.5rem;
  width: 900px;
  max-width: 100%;
  margin: 0 auto;
`;

export default Page;
