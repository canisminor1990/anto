import styled from 'styled-components';
import { Component } from 'react';
import { connect } from 'dva';

/// /////////////////////////////////////////////
// styled
/// /////////////////////////////////////////////

const Group = styled.div`
  position: fixed;
  padding: 1rem;
  bottom: 0;
  left: 48px;
  display: flex;
  width: calc(100% - 48px);
  button {
    flex: 1;
  }
  button + button {
    margin-left: 0.5rem;
  }
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

class ButtonGroup extends Component {
  render() {
    const style = {
      background: this.props.theme === 'black' ? '#222' : '#f5f5f5',
    };
    return <Group style={style}>{this.props.children}</Group>;
  }
}

export default connect(State)(ButtonGroup);
