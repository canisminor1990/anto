import styled from 'styled-components';

const Img = styled.div`
  width: 100%;
  height: 48px;
  background-image: ${props => `url("${props.type}.png")`};
  background-position: center;
  background-repeat: no-repeat;
  background-size: 32px;
  transition: all 0.1s ease-out;
`;
const Title = styled.div`
  text-align: center;
  color: #999;
  margin-top: -0.5rem;
  font-size: 0.7rem;
  font-weight: 500;
`;

const View = styled.div`
  margin-top: 0.2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  opacity: 0.6;
  transition: all 0.2s ease-out;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
  &:active {
    ${Img} {
      transform: scale(0.9);
    }
  }
`;

export default ({ type, title = '标题', ...other }) => {
  return (
    <View {...other}>
      <Img type={type} />
      <Title>{title}</Title>
    </View>
  );
};
