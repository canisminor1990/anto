import styled from 'styled-components';

const Icon = styled.div`
  font-size: 1.5rem;
  width: 100%;
  height: 3rem;
  line-height: 3rem;
  text-align: center;
  transition: all 0.1s ease-out;
`;

const More = styled.div`
  font-size: 1.5rem;
  position: absolute;
  let: 0;
  top: 0;
  width: 100%;
  height: 3rem;
  line-height: 3rem;
  text-align: center;
  opacity: 0.5;
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
    ${Icon} {
      transform: scale(0.9);
    }
  }
`;

export default ({ type, more, title = '标题', ...other }) => {
  return (
    <View {...other}>
      <Icon className={['iconfont', `icon-${type}`]}>
        {more ? <More className={['iconfont', `icon-more`]} /> : null}
      </Icon>
      <Title>{title}</Title>
    </View>
  );
};
