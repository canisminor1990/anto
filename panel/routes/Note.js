import { Component } from 'react';
import { Iconfont, Title, Close, View } from '../components';

/// /////////////////////////////////////////////
// component
/// /////////////////////////////////////////////

class Note extends Component {
  render() {
    return [
      <Title key="title">注</Title>,
      <View key="panel">
        <Iconfont
          key="大标题"
          title="大标题"
          type="note-title"
          onClick={() => window.postMessage('setHeader', null)}
        />
        <Iconfont
          key="小标题"
          title="小标题"
          type="note-subtitle"
          onClick={() => window.postMessage('setSubHeader', null)}
        />
        <Iconfont
          key="注释"
          title="注释"
          type="note-text"
          onClick={() => window.postMessage('setText', null)}
        />
        <Iconfont
          key="注释块"
          title="注释块"
          type="note-block"
          onClick={() => window.postMessage('setBlock', null)}
        />
        <Iconfont
          key="注释列"
          title="注释列"
          type="note-quoter"
          onClick={() => window.postMessage('setList', null)}
        />
        <Iconfont
          key="列表"
          title="列表"
          type="note-list"
          onClick={() => window.postMessage('setUl', null)}
        />
        <Iconfont
          key="节点"
          title="节点"
          type="note-point"
          onClick={() => window.postMessage('setPoint', null)}
        />
        <Iconfont
          key="变更"
          title="变更"
          type="note-changelog"
          onClick={() => window.postMessage('setChangelog', null)}
        />
        <Close name="note" single />
      </View>,
    ];
  }
}

export default Note;
