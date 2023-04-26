import React from 'react';
import styled from 'styled-components';

import Content from './Content';

const Agenda = ({ items }) => {
  return (
    <StyledAgenda className="agenda">
      {items.map(item => {
        return (
          <div className="agenda__item" key={item._key}>
            <h3 className="agenda__label">{item.label}</h3>
            <Content className="agenda__text">{item.text}</Content>
          </div>
        );
      })}
    </StyledAgenda>
  );
};

const StyledAgenda = styled.div`
  .agenda {
    &__item {
      display: flex;
      gap: 1rem;
    }
    &__label {
      flex: 0 0 40%;
      margin-top: 0;
    }
  }
`;

export default Agenda;
