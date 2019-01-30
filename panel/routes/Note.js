import { Component } from 'react';
import { Iconfont, Title, Close, View } from '../components';
import { PostMessage } from '../utils/PostMessage';

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
          onClick={() => PostMessage('setHeader', null)}
        />
        <Iconfont
          key="小标题"
          title="小标题"
          type="note-subtitle"
          onClick={() => PostMessage('setSubHeader', null)}
        />
        <Iconfont
          key="注释"
          title="注释"
          type="note-text"
          onClick={() => PostMessage('setText', null)}
        />
        <Iconfont
          key="注释块"
          title="注释块"
          type="note-block"
          onClick={() => PostMessage('setBlock', null)}
        />
        <Iconfont
          key="注释列"
          title="注释列"
          type="note-quoter"
          onClick={() => PostMessage('setList', null)}
        />
        <Iconfont
          key="列表"
          title="列表"
          type="note-list"
          onClick={() => PostMessage('setUl', null)}
        />
        <Iconfont
          key="节点"
          title="节点"
          type="note-point"
          onClick={() => PostMessage('setPoint', null)}
        />
        <Iconfont
          key="变更"
          title="变更"
          type="note-changelog"
          onClick={() => PostMessage('setChangelog', null)}
        />
        <Close name="note" single />
      </View>,
    ];
  }
}

export default Note;
