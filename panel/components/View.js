import styled from 'styled-components';
import QueueAnim from 'rc-queue-anim';

/// /////////////////////////////////////////////
// styled
/// /////////////////////////////////////////////

const View = styled(QueueAnim)`
  width: 368px;
  height: calc(100vh - 50px);
  overflow: hidden;
`;

/// /////////////////////////////////////////////
// component
/// /////////////////////////////////////////////

export default ({ children, width = 48, padding, inner }) => {
  const style = {
    width: width + 'px',
    padding: padding ? '1rem' : 0,
    display: inner ? 'flex' : 'block',
  };
  return (
    <View duration={200} interval={50} type="bottom" style={style}>
      {children}
    </View>
  );
};
