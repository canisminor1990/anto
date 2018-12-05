import { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'dva';
import { Icon } from '../components';
import QueueAnim from 'rc-queue-anim';

/// /////////////////////////////////////////////
// styled
/// /////////////////////////////////////////////

export const Title = styled.div`
  width: 48px;
  height: 48px;
  display: flex;
  font-size: 1.2rem;
  align-items: center;
  justify-content: center;
  font-weight: bolder;
  color: rgba(100, 100, 100, 0.4);
  box-shadow: ${props =>
    props.theme === 'black' ? '0 4px 12px rgba(0, 0, 0, 0.2)' : '0 4px 8px rgba(0, 0, 0, 0.05)'};
  margin-bottom: 0.5rem;
`;

export const View = styled(QueueAnim)`
  width: 48px;
`;

export const Close = styled.div`
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
  &:active {
    transform: scale(0.9);
  }
`;

/// /////////////////////////////////////////////
// connect
/// /////////////////////////////////////////////

const State = state => {
  return {
    store: state.store,
    ...state.store,
    ...state.config,
  };
};

const Dispatch = dispatch => ({
  setConfig(obj) {
    dispatch({ type: `config/update`, payload: obj });
  },
});

/// /////////////////////////////////////////////
// component
/// /////////////////////////////////////////////

class Line extends Component {
  render() {
    return [
      <Title key="title" theme={this.props.theme}>
        线
      </Title>,
      <View
        key="panel"
        duration={200}
        interval={50}
        animConfig={{ opacity: [0.6, 0], translateY: [0, 50] }}
      >
        <Icon
          key="连线"
          title="连线"
          type="icon-link"
          onClick={() => window.postMessage('handleLine', null)}
        />
        <Icon
          key="变向"
          title="变向"
          type="icon-change"
          onClick={() => window.postMessage('handleChange', null)}
        />
        <Icon
          key="虚实"
          title="虚实"
          type="icon-dash"
          onClick={() => window.postMessage('handleDash', null)}
        />
        <Icon
          key="说明"
          title="说明"
          type="icon-round"
          onClick={() => window.postMessage('setRound', null)}
        />
        <Icon
          key="判断"
          title="判断"
          type="icon-if"
          onClick={() => window.postMessage('setIf', null)}
        />
        <Close onClick={this.handleClose} />
      </View>,
    ];
  }

  handleClose = () => {
    this.props.setConfig({ line: false });
    window.postMessage('closePanel', null);
  };
}

export default connect(
  State,
  Dispatch
)(Line);
