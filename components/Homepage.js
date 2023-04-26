import Image from 'next/image';
import styled from 'styled-components';
import Content from './Content';
import { media } from './theme';

export default function HomePage(props) {
  return (
    <StyledHomepage className="homepage">
      <Image className="homepage__background" src="/collage.jpg" alt="" width={2000} height={1200} />
      <Content className="homepage__content">{props.content}</Content>
    </StyledHomepage>
  );
}

const StyledHomepage = styled.div`
  padding: 2rem;
  ${media.break`
    padding: 0;
  `}
  .homepage {
    &__background {
      position: absolute;

      object-fit: cover;
      top: 70px;
      left: 0;
      ${media.break`
        position: static;

      `}
    }
    &__content {
      max-width: 100%;
      top: 120px;
      background: white;
      padding: 3rem 2rem;
      position: relative;
      ${media.break`
        left: 20px;
        position: absolute;
        width: 500px;
      `}
    }
  }
`;
