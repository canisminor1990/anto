import { Component } from 'react';
import { Icon, Title, Close, View } from '../components';

/// /////////////////////////////////////////////
// component
/// /////////////////////////////////////////////

class Line extends Component {
  render() {
    return [
      <Title key="title">线</Title>,
      <View key="panel">
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
        <Close name="line" single />
      </View>,
    ];
  }
}

export default Line;
