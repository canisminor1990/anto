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
      <Title key="title">注</Title>,
      <View key="panel">
        <Icon
          type="icon-header"
          title="链路"
          onClick={() => window.postMessage('setHeader', null)}
        />
        <Icon type="icon-text" title="注释" onClick={() => window.postMessage('setText', null)} />
        <Icon
          type="icon-block"
          title="注释块"
          onClick={() => window.postMessage('setBlock', null)}
        />
        <Icon type="icon-list" title="注释列" onClick={() => window.postMessage('setList', null)} />
        <Icon type="icon-ul" title="列表" onClick={() => window.postMessage('setUl', null)} />
        <Icon type="icon-point" title="节点" onClick={() => window.postMessage('setPoint', null)} />
        <Icon type="icon-if" title="判断" onClick={() => window.postMessage('setIf', null)} />
        <Icon
          type="icon-changelog"
          title="变更"
          onClick={() => window.postMessage('setChangelog', null)}
        />
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
