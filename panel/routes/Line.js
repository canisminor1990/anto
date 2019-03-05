import { Component } from 'react';
import { Iconfont, Title, Close, View } from '../components';
import { PostMessage } from '../utils/PostMessage';

/// /////////////////////////////////////////////
// component
/// /////////////////////////////////////////////

class Line extends Component {
  render() {
    return (
      <>
        <Title>线</Title>
        <View>
          <Iconfont
            key="连线"
            title="连线"
            type="line-link"
            onClick={() => PostMessage('handleLine', null)}
          />
          <Iconfont
            key="变向"
            title="变向"
            type="line-change"
            onClick={() => PostMessage('handleChange', null)}
          />
          <Iconfont
            key="虚实"
            title="虚实"
            type="line-dash"
            onClick={() => PostMessage('handleDash', null)}
          />
          <Iconfont
            key="说明"
            title="说明"
            type="line-note"
            onClick={() => PostMessage('setRound', null)}
          />
          <Iconfont
            key="判断"
            title="判断"
            type="line-if"
            onClick={() => PostMessage('setIf', null)}
          />
          <Close name="line" single />
        </View>
      </>
    );
  }
}

export default Line;
