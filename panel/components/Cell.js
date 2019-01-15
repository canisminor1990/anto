import styled, { css } from 'styled-components';

const Cell = styled.div`
  margin-bottom: 0.5rem;
  display: flex;
  align-items: center;
  font-size: 0.75rem;
  border-radius: 0.2rem;
  cursor: pointer;
  transition: all 0.2s ease-out;
  &:active {
    transform: scale(0.95);
  }
`;

Cell.Header = styled.div`
  width: 100%;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: rgba(100, 100, 100, 0.4);
`;

Cell.Group = styled.div`
  margin-bottom: 1.5rem;
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
`;

export default Cell;
