import { Component } from 'react';
import { Iconfont, Title, Close, View } from '../components';
import { PostMessage } from '../utils/PostMessage';

/// /////////////////////////////////////////////
// component
/// /////////////////////////////////////////////

class Dev extends Component {
  render() {
    return (
      <>
        <Title>⚙️</Title>
        <View>
          <Iconfont
            key="序号"
            title="序号"
            type="plate-number"
            onClick={() => PostMessage('devNumber', null)}
          />
          <Iconfont
            key="组件"
            title="组件"
            type="plate-artboard"
            onClick={() => PostMessage('devSymbol', null)}
          />
          <Iconfont
            key="颜色"
            title="颜色"
            type="plate-artboard"
            onClick={() => PostMessage('devColor', null)}
          />
          <Close name="dev" single />
        </View>
      </>
    );
  }
}

export default Dev;
