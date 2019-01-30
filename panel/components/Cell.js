import styled, { css } from 'styled-components';
import { Icon } from 'antd';
/// /////////////////////////////////////////////
// styled
/// /////////////////////////////////////////////

const Cell = styled.div`
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  font-size: 0.7rem;
  border-radius: 0.2rem;
  cursor: pointer;
  transition: all 0.2s ease-out;
  &:active {
    transform: scale(0.95);
  }
`;

const Header = styled.div`
  width: 100%;
  margin-bottom: 0.5rem;
  font-weight: 600;
  cursor: pointer;
`;

const Dropdown = styled(Icon)`
  font-size: 0.7rem;
  opacity: 0.5;
  margin-right: 0.2rem;
`;

const Group = styled.div`
  margin-bottom: 1rem;
  overflow: hidden;
`;

Cell.Title = styled.div`
  padding: 0.2rem 0.4rem;
  border-radius: 2px;
  flex: 1;
  ${props =>
    props.active
      ? css`
          background: rgba(100, 100, 100, 0.1);
          font-weight: 600;
        `
      : null};
  &:active {
    background: rgba(100, 100, 100, 0.1);
    font-weight: 600;
  }
`;

/// /////////////////////////////////////////////
// component
/// /////////////////////////////////////////////

Cell.Group = ({ children, dropdown, active, ...other }) => {
  let style;
  if (dropdown) style = active ? null : { height: 0, marginBottom: 0 };
  return (
    <Group style={style} {...other}>
      {children}
    </Group>
  );
};

Cell.Header = ({ children, dropdown, active, ...other }) => {
  return (
    <Header {...other}>
      {dropdown ? <Dropdown type={active ? 'caret-down' : 'caret-right'} /> : null}
      {children}
    </Header>
  );
};

export default Cell;
