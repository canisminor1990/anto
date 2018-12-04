import { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'dva';
import { Icon } from '../components';

/// /////////////////////////////////////////////
// styled
/// /////////////////////////////////////////////

const Title = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  font-size: 1.2rem;
  align-items: center;
  justify-content: center;
  font-weight: bolder;
  color: #333;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  margin-bottom: 0.5rem;
`;

const View = styled.div`
  width: 48px;
`;

const Close = styled.div`
  position: fixed;
  bottom: 0;
  left: 48px;
  width: 48px;
  height: 32px;
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
`;

/// /////////////////////////////////////////////
// connect
/// /////////////////////////////////////////////

const State = state => {
  return {};
};

const Dispatch = dispatch => ({
  setConfig(obj) {
    dispatch({ type: `config/update`, payload: obj });
  },
});

/// /////////////////////////////////////////////
// component
/// /////////////////////////////////////////////

class Setting extends Component {
  state = {
    name: '',
  };

  render() {
    return [
      <Title key="title">线</Title>,
      <View key="panel">
        <Icon
          type="icon-link"
          title="连线"
          onClick={() => window.postMessage('handleLine', null)}
        />
        <Icon
          type="icon-change"
          title="变向"
          onClick={() => window.postMessage('handleChange', null)}
        />
        <Icon
          type="icon-dash"
          title="虚实"
          onClick={() => window.postMessage('handleDash', null)}
        />
        <Icon type="icon-round" title="标签" onClick={() => window.postMessage('setRound', null)} />
        <Close onClick={this.handleClose} />
      </View>,
    ];
  }

  handleClose = () => {
    this.props.setConfig({ note: false });
    window.postMessage('closePanel', null);
  };
}

export default connect(
  State,
  Dispatch
)(Setting);
