import { Component } from 'react';
import { Iconfont, Title, Close, View } from '../components';
import { PostMessage } from '../utils/PostMessage';

/// /////////////////////////////////////////////
// component
/// /////////////////////////////////////////////

class Layer extends Component {
  render() {
    return (
      <>
        <Title>层</Title>
        <View>
          <Iconfont
            key="对齐"
            title="对齐"
            type="layer-layout"
            onClick={() => PostMessage('handleLayout', null)}
          />
          <Iconfont
            key="排序"
            title="排序"
            type="layer-sort"
            onClick={() => PostMessage('handleSort', null)}
          />
          <Iconfont
            key="置顶"
            title="置顶"
            type="layer-top-lite"
            onClick={() => PostMessage('handleTopLite', null)}
          />
          <Iconfont
            key="置底"
            title="置底"
            type="layer-bottom-lite"
            onClick={() => PostMessage('handleBottomLite', null)}
          />
          <Iconfont
            key="大置顶"
            title="大置顶"
            type="layer-top"
            onClick={() => PostMessage('handleTop', null)}
          />
          <Iconfont
            key="大置底"
            title="大置底"
            type="layer-bottom"
            onClick={() => PostMessage('handleBottom', null)}
          />
          <Iconfont
            key="调高"
            title="调高"
            type="layer-height"
            onClick={() => PostMessage('handleHeight', null)}
          />
          <Iconfont
            key="混合"
            title="混合"
            type="layer-blender"
            onClick={() => PostMessage('handleBlender', null)}
          />
          <Close name="layer" single />
        </View>
      </>
    );
  }
}

export default Layer;
