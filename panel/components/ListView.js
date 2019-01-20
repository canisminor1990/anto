import styled from 'styled-components';
import { Component } from 'react';
import { connect } from 'dva';

/// /////////////////////////////////////////////
// styled
/// /////////////////////////////////////////////

const List = styled.div`
  padding: 1rem;
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
    const { width = 'auto', border, theme, flex, grey, children } = this.props;
    const style = {
      width: width,
    };
    if (border)
      style.borderRight = theme === 'black' ? '1px solid rgba(0, 0, 0, 0.1)' : '1px solid #eee';

    if (flex) style.flex = 1;

    if (grey) style.background = '#f5f5f5';
    return <List style={style}>{children}</List>;
  }
}

export default connect(State)(ListView);
