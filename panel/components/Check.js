import styled from 'styled-components';
import { Icon } from 'antd';
/// /////////////////////////////////////////////
// styled
/// /////////////////////////////////////////////

const Title = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const CheckIcon = styled(Icon)`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

/// /////////////////////////////////////////////
// component
/// /////////////////////////////////////////////

const Check = () => (
  <Title>
    <CheckIcon type="sketch" />
    请保证阿里内网链接
  </Title>
);

export default Check;
