import styled from 'styled-components';
import { Component } from 'react';
import { connect } from 'dva';

/// /////////////////////////////////////////////
// styled
/// /////////////////////////////////////////////

const List = styled.div`
  padding: 0.5rem;
  overflow: hidden;
  overflow-y: auto;
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

class ListView extends Component {
  render() {
    const { width = 'auto', border, theme, children } = this.props;
    const style = {
      width: width,
    };
    if (border)
      style.borderRight = theme === 'black' ? '1px solid rgba(0, 0, 0, 0.1)' : '1px solid #eee';
    return <List style={style}>{children}</List>;
  }
}

export default connect(State)(ListView);
