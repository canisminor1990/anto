import styled from 'styled-components';
import { Component } from 'react';
import { connect } from 'dva';

/// /////////////////////////////////////////////
// styled
/// /////////////////////////////////////////////

const Text = styled.div`
  width: 100%;
  height: 48px;
  display: flex;
  font-size: 1.2rem;
  align-items: center;
  padding: 0 1rem;
  font-weight: bolder;
  color: rgba(100, 100, 100, 0.4);
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

class Title extends Component {
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

export default connect(State)(Title);
