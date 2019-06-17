import styled, { css } from 'styled-components';
import { Component } from 'react';
import { connect } from 'dva';

/// /////////////////////////////////////////////
// styled
/// /////////////////////////////////////////////

const Text = styled.div`
  width: 100%;
  height: 48px;
  line-height: 48px;
  display: flex;
  font-size: 1.2rem;
  align-items: center;
  padding: 0 1rem;
  font-weight: bolder;
  color: rgba(100, 100, 100, 0.4);
`;

const Switch = styled.span`
  display: inline-block;
  margin-right: 1rem;
  cursor: pointer;
  ${props =>
    props.active
      ? css`
          border-bottom: 3px solid #2a72ff;
          color: rgba(100, 100, 100, 1);
        `
      : null}
`;

/// /////////////////////////////////////////////
// connect
/// /////////////////////////////////////////////

const State = state => {
  return {
    theme: state.store.theme,
  };
};

/// /////////////////////////////////////////////
// component
/// /////////////////////////////////////////////

class TitleClass extends Component {
  render() {
    const style = {
      boxShadow:
        this.props.theme === 'black'
          ? '0 4px 12px rgba(0, 0, 0, 0.2)'
          : '0 4px 8px rgba(0, 0, 0, 0.05)',
    };
    return (
      <Text key="title" style={style}>
        {this.props.children}
      </Text>
    );
  }
}

const Title = connect(State)(TitleClass);
Title.Switch = Switch;
export default Title;
