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
            onClick={() => PostMessage('handleNumber', null)}
          />
          <Iconfont
            key="生产"
            title="生产"
            type="plate-artboard"
            onClick={() => PostMessage('handleBuild', null)}
          />
          <Close name="dev" single />
        </View>
      </>
    );
  }
}

export default Dev;
