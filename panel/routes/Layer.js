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

class Layer extends Component {
  render() {
    return [
      <Title key="title" theme={this.props.theme}>
        层
      </Title>,
      <View
        key="panel"
        duration={200}
        interval={50}
        animConfig={{ opacity: [0.6, 0], translateY: [0, 50] }}
      >
        <Icon
          key="对齐"
          title="对齐"
          type="icon-layout"
          onClick={() => window.postMessage('handleLayout', null)}
        />
        <Icon
          key="排序"
          title="排序"
          type="icon-sort"
          onClick={() => window.postMessage('handleSort', null)}
        />
        <Icon
          key="置顶"
          title="置顶"
          type="icon-top"
          onClick={() => window.postMessage('handleTop', null)}
        />
        <Icon
          key="置底"
          title="置底"
          type="icon-bottom"
          onClick={() => window.postMessage('handleBottom', null)}
        />
        <Close onClick={this.handleClose} />
      </View>,
    ];
  }

  handleClose = () => {
    this.props.setConfig({ layer: false });
    window.postMessage('closePanel', null);
  };
}

export default connect(
  State,
  Dispatch
)(Layer);
