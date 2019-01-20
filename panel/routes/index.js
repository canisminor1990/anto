import { Component } from 'react';
import { connect } from 'dva';
import styled from 'styled-components';
import { Iconfont } from '../components';
import QueueAnim from 'rc-queue-anim';
// Panel
import Symbol from './Symbol';
import Color from './Color';
import Line from './Line';
import Note from './Note';
import Layer from './Layer';
import Plate from './Plate';
import Setting from './Setting';

/// /////////////////////////////////////////////
// styled
/// /////////////////////////////////////////////

const View = styled.div`
  display: flex;
  background: ${props => (props.theme === 'black' ? '#222' : '#f5f5f5')};
  color: ${props => (props.theme === 'black' ? '#aaa' : '#777')};
`;

const SideBar = styled.div`
  background: ${props => (props.theme === 'black' ? '#222' : '#f5f5f5')};
  width: 48px;
  height: 100vh;
  overflow: hidden;
  position: fixed;
  display: flex;
  flex-direction: column;
  align-items: center;
  top: 0;
  left: 0;
  border-right: ${props =>
    props.theme === 'black' ? '1px solid rgba(0, 0, 0, 0.1)' : '1px solid #eee'};
  z-index: 999;
`;

const Panel = styled.div`
  margin-left: 48px;
  width: 100%;
  flex: 1;
  height: 100vh;
`;

const Logo = styled.div`
  width: 100%;
  height: 48px;
  background-image: url('logo.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: 28px auto;
  cursor: pointer;
  box-shadow: ${props =>
    props.theme === 'black' ? '0 4px 12px rgba(0, 0, 0, 0.2)' : '0 4px 8px rgba(0, 0, 0, 0.05)'};
`;

const Mode = styled.div`
  position: fixed;
  bottom: 1.8rem;
  width: 2.5rem;
  color: #fff;
  font-size: 0.7rem;
  text-align: center;
  line-height: 1.5rem;
  opacity: 0.4;
  transition: all 0.2s ease-out;
  cursor: pointer;
  border-radius: 1.5rem;
  &:hover {
    opacity: 1;
  }
  &:active {
    transform: scale(0.9);
  }
`;

const Config = styled.div`
  position: fixed;
  bottom: 0;
  width: 3rem;
  height: 2rem;
  line-height: 2rem;
  text-align: center;
  opacity: 0.2;
  transition: all 0.2s ease-out;
  cursor: pointer;
  &:hover {
    opacity: 1;
  }
  &:active {
    transform: scale(0.9);
  }
`;

/// /////////////////////////////////////////////
// connect
/// /////////////////////////////////////////////

const State = state => {
  return {
    ...state.store,
    ...state.config,
  };
};

const Dispatch = dispatch => ({
  setConfig(obj) {
    dispatch({ type: `config/update`, payload: obj });
  },
  setStore(obj) {
    dispatch({ type: `store/update`, payload: obj });
  },
});

/// /////////////////////////////////////////////
// component
/// /////////////////////////////////////////////

class WebView extends Component {
  componentDidMount() {}

  state = {
    symbol: 370,
    color: 220,
    setting: 250,
  };

  SideBar = () => (
    <SideBar theme={this.props.theme}>
      <Logo theme={this.props.theme} />
      <QueueAnim duration={200} interval={50} type="bottom">
        <Iconfont
          key="组件"
          title="组件"
          type="main-symbol"
          onClick={() => this.openPanel('symbol', this.state.symbol)}
        />
        <Iconfont
          key="色板"
          title="色板"
          type="main-color"
          onClick={() => this.openPanel('color', this.state.color)}
        />
        <Iconfont key="连线" title="连线" type="main-line" onClick={() => this.openPanel('line')} />
        <Iconfont
          key="图层"
          title="图层"
          type="main-layer"
          onClick={() => this.openPanel('layer')}
        />
        <Iconfont key="标注" title="标注" type="main-note" onClick={() => this.openPanel('note')} />
        <Iconfont
          key="制版"
          title="制版"
          type="main-plate"
          onClick={() => this.openPanel('plate')}
        />
        <Iconfont
          key="说明"
          title="说明"
          type="main-yuque"
          onClick={() => window.postMessage('handleYuque', null)}
        />
      </QueueAnim>
      <Mode
        onClick={this.handleChangeMode}
        theme={this.props.theme}
        style={{ background: this.props.mode === '视觉' ? '#666' : '#2A72FF' }}
      >
        {this.props.mode}
      </Mode>
      <Config
        className="iconfont icon-setting"
        onClick={() => this.openPanel('setting', this.state.setting)}
      />
    </SideBar>
  );

  render() {
    return (
      <View theme={this.props.theme}>
        <this.SideBar />
        <Panel>
          {this.props.symbol ? <Symbol width={this.state.symbol} /> : null}
          {this.props.color ? <Color width={this.state.color} /> : null}
          {this.props.line ? <Line /> : null}
          {this.props.note ? <Note /> : null}
          {this.props.layer ? <Layer /> : null}
          {this.props.plate ? <Plate /> : null}
          {this.props.setting ? <Setting width={this.state.setting} /> : null}
        </Panel>
      </View>
    );
  }

  handleChangeMode = () => {
    const preMode = this.props.mode;
    const mode = preMode === '视觉' ? '交互' : '视觉';
    this.props.setStore({ mode });
    window.postMessage('changeMode', mode);
  };

  openPanel = (name, width = null) => {
    window.postMessage('openPanel', width);
    this.props.setConfig({ [name]: true });
  };
}

export default connect(
  State,
  Dispatch
)(WebView);
