import styled from 'styled-components';
import { Component } from 'react';
import { connect } from 'dva';

/// /////////////////////////////////////////////
// styled
/// /////////////////////////////////////////////

const Btn = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  width: 3rem;
  height: 2rem;
  line-height: 2rem;
  text-align: center;
  opacity: 0.2;
  transition: all 0.2s ease-out;
  cursor: pointer;
  text-align: center;
  &:hover {
    opacity: 1;
  }
  &:active {
    transform: scale(0.9);
  }
`;

/// /////////////////////////////////////////////
// connect
/// /////////////////////////////////////////////

const State = () => ({});

const Dispatch = dispatch => ({
  setConfig(obj) {
    dispatch({ type: `config/update`, payload: obj });
  },
});

/// /////////////////////////////////////////////
// component
/// /////////////////////////////////////////////

class Close extends Component {
  handleClose = name => {
    this.props.setConfig({ [name]: false });
    window.postMessage('closePanel', null);
  };

  render() {
    return (
      <Btn className="iconfont icon-close" onClick={() => this.handleClose(this.props.name)} />
    );
  }
}

export default connect(
  State,
  Dispatch
)(Close);
