import { Component } from 'react';
import { connect } from 'dva';
import styled from 'styled-components';
import { Icon } from '../components';
import Note from './Note';
import Layer from './Layer';
import Setting from './Setting';

/// /////////////////////////////////////////////
// styled
/// /////////////////////////////////////////////

const View = styled.div`
  display: flex;
`;

const SideBar = styled.div`
  width: 48px;
  height: 100vh;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  border-right: 1px solid rgba(0, 0, 0, 0.1);
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
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  margin-bottom: 0.5rem;
`;

const Mode = styled.div`
  position: fixed;
  bottom: 1.8rem;
  width: 48px;
  color: #fff;
  font-size: 0.7rem;
  text-align: center;
  line-height: 1.5rem;
  opacity: 0.4;
  transition: all 0.2s ease-out;
  cursor: pointer;
  border: 0.3rem solid #222;
  border-radius: 1.5rem;
  &:hover {
    opacity: 1;
  }
`;

const Config = styled.div`
  position: fixed;
  bottom: 0;
  width: 48px;
  height: 32px;
  background-image: url('icon-setting.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: 32px;
  opacity: 0.2;
  transition: all 0.2s ease-out;
  cursor: pointer;
  &:hover {
    opacity: 1;
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

  SideBar = () => (
    <SideBar style={{ background: this.props.theme === 'black' ? '#222' : '#fff' }}>
      <Logo />
      <Icon type="icon-line" title="连线" onClick={() => window.postMessage('handleLine', null)} />
      <Icon
        type="icon-change"
        title="变向"
        onClick={() => window.postMessage('handleChange', null)}
      />
      <Icon type="icon-dash" title="虚实" onClick={() => window.postMessage('handleDash', null)} />
      <Icon type="icon-layer" title="图层" onClick={this.openLayer} />
      <Icon type="icon-note" title="标注" onClick={this.openNote} />
      <Icon
        type="icon-title"
        title="制标"
        onClick={() => window.postMessage('handleTitle', null)}
      />
      <Icon
        type="icon-export"
        title="制版"
        onClick={() => window.postMessage('handleExport', null)}
      />
      <Mode
        onClick={this.handleChangeMode}
        style={{
          background: this.props.mode === '视觉' ? '#666' : '#2A72FF',
          borderColor: this.props.theme === 'black' ? '#222' : '#fff',
        }}
      >
        {this.props.mode}
      </Mode>
      <Config onClick={this.openSetting} />
    </SideBar>
  );

  render() {
    return (
      <View style={{ background: this.props.theme === 'black' ? '#222' : '#fff' }}>
        <this.SideBar />
        <Panel>
          {this.props.note ? <Note /> : null}
          {this.props.layer ? <Layer /> : null}
          {this.props.setting ? <Setting /> : null}
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

  openSetting = () => {
    window.postMessage('openSetting', null);
    this.props.setConfig({ setting: true });
  };

  openNote = () => {
    window.postMessage('openPanel', null);
    this.props.setConfig({ note: true });
  };

  openLayer = () => {
    window.postMessage('openPanel', null);
    this.props.setConfig({ layer: true });
  };
}

export default connect(
  State,
  Dispatch
)(WebView);
