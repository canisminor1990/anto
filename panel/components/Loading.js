import styled from 'styled-components';
import { Spin } from 'antd';
/// /////////////////////////////////////////////
// styled
/// /////////////////////////////////////////////

const View = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

/// /////////////////////////////////////////////
// component
/// /////////////////////////////////////////////

const Loading = () => (
  <View>
    <Spin tip="Loading..." />
  </View>
);

export default Loading;
