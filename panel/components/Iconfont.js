import styled from 'styled-components';

const Img = styled.div`
  font-size: 1.5rem;
  width: 100%;
  height: 3rem;
  line-height: 3rem;
  text-align: center;
  transition: all 0.1s ease-out;
`;
const Title = styled.div`
  text-align: center;
  margin-top: -0.5rem;
  font-size: 0.7rem;
  font-weight: 500;
  opacity: 0.7;
`;

const View = styled.div`
  margin-top: 0.2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  &:active {
    ${Img} {
      transform: scale(0.9);
    }
  }
`;

export default ({ type, title = '标题', ...other }) => {
  return (
    <View {...other}>
      <Img className={['iconfont', `icon-${type}`]} />
      <Title>{title}</Title>
    </View>
  );
};
