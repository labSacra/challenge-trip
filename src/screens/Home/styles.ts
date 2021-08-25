import styled from 'styled-components/native';

export const WrapperView = styled.View`
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  margin: 20px;
`;

export const StyledImage = styled.Image.attrs(() => ({
  resizeMode: 'contain',
}))`
  width: 314px;
  height: 226px;
`;
