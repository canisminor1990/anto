import { Component } from 'react';
import styled from 'styled-components';
import { Form, Input, Button } from 'antd';
import { connect } from 'dva';

const FormItem = Form.Item;

/// /////////////////////////////////////////////
// styled
/// /////////////////////////////////////////////

const View = styled.div`
  padding: 1rem;
  width: 250px;
`;

const Title = styled.div`
  font-size: 1.2rem;
  color: #999;
  width: 100%;
  height: 48px;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  font-weight: 600;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  margin-bottom: 0.5rem;
`;

const Group = styled.div`
  background: #222;
  position: fixed;
  padding: 1rem;
  bottom: 0;
  left: 48px;
  display: flex;
  width: 250px;
  button {
    flex: 1;
  }
  button + button {
    margin-left: 0.5rem;
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

class Setting extends Component {
  state = {
    name: '',
  };

  componentDidMount() {
    const config = localStorage.getItem('config');
    console.log('[config]', config);
    this.setState(config ? JSON.parse(config) : {});
  }

  render() {
    return [
      <Title key="title">设置</Title>,
      <View key="panel">
        <div>
          <FormItem label="花名">
            <Input
              placeholder="请输入花名"
              defaultValue={this.state.name}
              onChange={e => this.handleChange(e.target.value, 'name')}
            />
          </FormItem>
        </div>
        <Group>
          <Button style={{ background: '#333' }} onClick={this.handleClose}>
            取消
          </Button>
          <Button type="primary" onClick={this.handleSave}>
            保存
          </Button>
        </Group>
      </View>,
    ];
  }

  handleChange = (e, key) => {
    this.setState({ [key]: e });
  };

  handleClose = () => {
    this.props.setConfig({ setting: false });
    window.postMessage('closeSetting', null);
  };

  handleSave = () => {
    localStorage.setItem('config', JSON.stringify(this.state));
    this.props.setConfig({ setting: false });
    window.postMessage('closeSetting', this.state);
  };
}

export default connect(
  State,
  Dispatch
)(Setting);
