import { Component } from 'react';
import { connect } from 'dva';
import styled from 'styled-components';
import { Icon } from '../components';
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
  z-index: 1;
`;

const Panel = styled.div`
  margin-left: 48px;
  width: 100%;
  flex: 1;
  height: 100vh;
  padding: 1rem;
  border-left: 1px solid rgba(0, 0, 0, 0.1);
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

class WebView extends Component {
  state = {
    mode: '交互',
  };

  componentDidMount() {
    const mode = localStorage.getItem('mode');
    this.setState({ mode: mode || '交互' });
  }

  SideBar = () => (
    <SideBar>
      <Logo />
      <Icon type="icon-line" title="连线" onClick={() => window.postMessage('handleLine', null)} />
      <Icon
        type="icon-change"
        title="变向"
        onClick={() => window.postMessage('handleChange', null)}
      />
      <Icon type="icon-dash" title="虚实" onClick={() => window.postMessage('handleDash', null)} />
      <Icon type="icon-top" title="置顶" onClick={() => window.postMessage('handleTop', null)} />
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
        style={{ background: this.state.mode === '视觉' ? '#666' : '#2A72FF' }}
      >
        {this.state.mode}
      </Mode>
      <Config onClick={this.openSetting} />
    </SideBar>
  );

  render() {
    return (
      <View>
        <this.SideBar />
        <Panel>{this.props.setting ? <Setting /> : null}</Panel>
      </View>
    );
  }

  handleChangeMode = () => {
    const preMode = this.state.mode;
    const mode = preMode === '视觉' ? '交互' : '视觉';
    this.setState({ mode });
    window.postMessage('changeMode', mode);
    localStorage.setItem('mode', mode);
  };

  openSetting = () => {
    window.postMessage('openSetting', null);
    this.props.setConfig({ setting: true });
  };
}

export default connect(
  State,
  Dispatch
)(WebView);
