import { Component } from 'react';
import styled from 'styled-components';
import { Form, Input, Button } from 'antd';
import { connect } from 'dva';

const FormItem = Form.Item;

/// /////////////////////////////////////////////
// styled
/// /////////////////////////////////////////////

const View = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Title = styled.div`
  font-size: 1.5rem;
  color: #999;
  margin-bottom: 1rem;
`;

const Group = styled.div`
  display: flex;
  width: 100%;
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
    return (
      <View>
        <div>
          <Title>设置</Title>
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
      </View>
    );
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
