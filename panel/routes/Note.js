import { Component } from 'react';
import { connect } from 'dva';
import { Icon } from '../components';
import { Title, View, Close } from './Line';

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

class Note extends Component {
  render() {
    return [
      <Title key="title" theme={this.props.theme}>
        注
      </Title>,
      <View key="panel" duration={200} interval={50} type="bottom">
        <Icon
          key="大标题"
          title="大标题"
          type="icon-header"
          onClick={() => window.postMessage('setHeader', null)}
        />
        <Icon
          key="小标题"
          title="小标题"
          type="icon-subheader"
          onClick={() => window.postMessage('setSubHeader', null)}
        />
        <Icon
          key="注释"
          title="注释"
          type="icon-text"
          onClick={() => window.postMessage('setText', null)}
        />
        <Icon
          key="注释块"
          title="注释块"
          type="icon-block"
          onClick={() => window.postMessage('setBlock', null)}
        />
        <Icon
          key="注释列"
          title="注释列"
          type="icon-list"
          onClick={() => window.postMessage('setList', null)}
        />
        <Icon
          key="列表"
          title="列表"
          type="icon-ul"
          onClick={() => window.postMessage('setUl', null)}
        />
        <Icon
          key="节点"
          title="节点"
          type="icon-point"
          onClick={() => window.postMessage('setPoint', null)}
        />
        <Icon
          key="变更"
          title="变更"
          type="icon-changelog"
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
)(Note);
