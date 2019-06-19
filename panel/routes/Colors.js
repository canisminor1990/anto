import { hsl } from 'polished';
import { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'dva';
import _ from 'lodash';
import { Slider, Switch } from 'antd';
import { Title, View, Close, Cell, ButtonGroup, Check, Loading } from '../components';
import { PostMessage } from '../utils/PostMessage';

/// /////////////////////////////////////////////
// styled
/// /////////////////////////////////////////////

const Panel = styled.div`
  padding: 1rem;
  width: 100%;
  height: calc(100% - 50px);
  overflow-y: auto;
`;

const Icon = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 2px;
  background: #333;
  margin-right: 0.5rem;
`;

const Sub = styled.div`
  display: flex;
  align-items: center;
`;
const Point = styled.div`
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  margin-right: 0.25rem;
`;
const Desc = styled.span`
  opacity: 0.5;
  + ${Point} {
    margin-left: 0.5rem;
  }
`;

const Flex = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
  align-items: center;
`;

const SliderBox = styled.div`
  width: 100%;
  display: flex;
  height: 4rem;
  align-items: center;
  margin-bottom: 14rem;
`;

const ColorBlock = styled.div`
  width: 2rem;
  height: 2rem;
  background: ${props => hsl(props.h, props.s, props.l)};
  cursor: pointer;
  color: ${props => hsl(props.h, props.s, props.l - 0.5 > 0 ? props.l - 0.5 : 0)};
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.7rem;
  &:active {
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
    transform: scale(1.2);
    z-index: 10;
    border-radius: 2px;
  }
`;

const Group = styled.div`
  width: 8rem;
  height: 8rem;
  position: fixed;
  top: 7rem;
  left: 2.8rem;
  transform: rotate(${props => props.deg}deg);
`;

/// /////////////////////////////////////////////
// connect
/// /////////////////////////////////////////////
const State = state => {
  return {
    check: state.check,
    loading: state.loading.global || state.colors.length === 0,
    colors: state.colors || {},
  };
};

const Dispatch = dispatch => ({
  getColors() {
    dispatch({ type: `colors/get` });
  },
});

/// /////////////////////////////////////////////
// component
/// /////////////////////////////////////////////

class Colors extends Component {
  state = {
    tab: '色板',
    activeColor: null,
    border: false,
    count: 8,
    header: {},
  };

  localStorageName = 'dropdown-color';

  componentDidMount() {
    this.props.getColors();
    let state = localStorage.getItem(this.localStorageName);
    if (state) {
      this.setState({ header: JSON.parse(state) });
    } else {
      localStorage.setItem(this.localStorageName, '{}');
    }
  }

  SwitchTitle = ({ name }) => (
    <Title.Switch active={this.state.tab === name} onClick={() => this.setState({ tab: name })}>
      {name}
    </Title.Switch>
  );

  mapColor = group => {
    const List = [];
    _.forEach(group, (data, key) => {
      const desc = (
        <Sub>
          <Desc>{data.desc}</Desc>
        </Sub>
      );
      List.push(
        <Cell key={key} onClick={() => this.handleClick(data.color)}>
          <Icon style={{ background: data.desc }} />
          <Cell.Title>
            {data.name}
            {desc}
          </Cell.Title>
        </Cell>
      );
    });
    return List;
  };

  ColorCircle = () => {
    const List = [];
    const Groups = [];

    const alpha = (1 - 0.575) / 5;
    for (let i = 0; i < this.state.count; i++) {
      let Colors = [];
      let angle = 220 + (360 / this.state.count) * i;
      if (angle > 360) angle = angle - 360;
      List.push(
        <Group deg={angle}>
          <ColorBlock style={{ borderRadius: '2px' }} h={angle} s={1} l={0.575} />
        </Group>
      );
      for (let i = 6; i > 0; i--) {
        const l = 1 - alpha * i;
        Colors.push(
          <ColorBlock
            key={i}
            h={angle}
            s={1}
            l={l}
            onClick={() => this.handleClick(hsl(angle, 1, l))}
          >
            {5 - i > 0 ? `+${5 - i}` : 5 - i}
          </ColorBlock>
        );
      }
      const hslColor = hsl(angle, 1, 0.575);
      Groups.push(
        <Flex>
          <Point style={{ background: hslColor }} />
          <Desc>{hslColor}</Desc>
        </Flex>
      );
      Groups.push(<Flex>{Colors}</Flex>);
    }

    return (
      <div>
        <SliderBox>
          <Slider
            style={{ flex: 1 }}
            defaultValue={this.state.count}
            min={1}
            max={30}
            onChange={e => this.setState({ count: e })}
          />
        </SliderBox>
        {List}
        <Cell.Header>色彩列表</Cell.Header>
        {Groups}
      </div>
    );
  };

  ColorView = () => {
    const List = [];
    _.forEach(this.props.colors, (group, key) => {
      const active = !this.state.header[key];
      List.push(
        <div key={key}>
          <Cell.Header dropdown active={active} onClick={() => this.handleHeader(key)}>
            {key}
          </Cell.Header>
          <Cell.Group dropdown active={active}>
            {this.mapColor(group)}
          </Cell.Group>
        </div>
      );
    });
    return List;
  };
  CheckView = () => (this.props.loading ? <Loading /> : <this.ColorView />);

  render() {
    return (
      <>
        <Title>
          <this.SwitchTitle name="色板" />
          <this.SwitchTitle name="色轮" />
        </Title>
        <View width={this.props.width} inner>
          <Panel key="panel">
            {this.state.tab === '色板' ? (
              this.props.check ? (
                <this.CheckView />
              ) : (
                <Check />
              )
            ) : (
              <this.ColorCircle />
            )}
          </Panel>
          <ButtonGroup key="btn">
            <div>
              描边：
              <Switch
                checkedChildren="开"
                unCheckedChildren="关"
                onChange={e => this.setState({ border: e })}
              />
            </div>
          </ButtonGroup>
          <Close name="color" />
        </View>
      </>
    );
  }

  handleHeader = name => {
    const newState = this.state.header;
    newState[name] = !this.state.header[name];
    this.setState({ header: newState });
    localStorage.setItem(this.localStorageName, JSON.stringify(newState));
  };

  handleClick = color => {
    const data = { border: this.state.border, color };
    PostMessage('handleColor', JSON.stringify(data));
  };
}

export default connect(
  State,
  Dispatch
)(Colors);
