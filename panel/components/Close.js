import styled from 'styled-components';
import { Component } from 'react';
import { connect } from 'dva';

/// /////////////////////////////////////////////
// styled
/// /////////////////////////////////////////////

const Btn = styled.div`
  position: fixed;
  bottom: 0;
  width: 2rem;
  height: 2rem;
  background-image: url('icon-close.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: 32px;
  opacity: 0.2;
  transition: all 0.2s ease-out;
  cursor: pointer;
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
    const style = {
      right: this.props.single ? '8px' : 0,
    };
    return <Btn style={style} onClick={() => this.handleClose(this.props.name)} />;
  }
}

export default connect(
  State,
  Dispatch
)(Close);
