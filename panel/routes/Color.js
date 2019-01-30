import { Component } from 'react';
import styled, { css } from 'styled-components';
import Data from '../color.json';
import _ from 'lodash';
import { Switch } from 'antd';
import { Title, View, Close, Cell, ButtonGroup } from '../components';
import { PostMessage } from '../utils/PostMessage';
import ColorBuilder from './ColorBuild';

/// /////////////////////////////////////////////
// styled
/// /////////////////////////////////////////////

const SwitchTitle = styled.span`
  display: inline-block;
  margin-right: 1rem;
  cursor: pointer;
  ${props =>
    props.active
      ? css`
          border-bottom: 2px solid #2a72ff;
          color: rgba(100, 100, 100, 1);
        `
      : null}
`;

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

/// /////////////////////////////////////////////
// component
/// /////////////////////////////////////////////

class Color extends Component {
  state = {
    tab: '色板',
    activeColor: null,
    border: false,
  };

  SwitchTitle = ({ name }) => (
    <SwitchTitle active={this.state.tab === name} onClick={() => this.setState({ tab: name })}>
      {name}
    </SwitchTitle>
  );

  mapGroup = (group, index) => {
    return (
      <Cell.Group key={index}>
        <Cell.Header>{group.name}</Cell.Header>
        {_.sortBy(group.colors, 'key').map(this.mapColor)}
      </Cell.Group>
    );
  };

  mapColor = (color, index) => {
    let style;
    let desc;
    let points = [];
    if (color.type === 'Color') {
      style = color.color;
      desc = (
        <Sub>
          <Point style={{ background: color.color }} />
          <Desc>{color.color}</Desc>
        </Sub>
      );
    } else {
      let stopColors = [];
      _.forEach(color.color.stops, (stop, index) => {
        stopColors.push(stop.color);
        points.push(<Point key={index} style={{ background: stop.color }} />);
        points.push(<Desc key={stop.color}>{stop.color}</Desc>);
      });
      desc = <Sub>{points}︎</Sub>;
      style = `linear-gradient(135deg,${stopColors.join(',')})`;
    }

    return (
      <Cell key={index} onClick={() => this.handleClick(color.name, color)}>
        <Icon style={{ background: style }} />
        <Cell.Title>
          {color.name}
          {desc}
        </Cell.Title>
      </Cell>
    );
  };

  render() {
    return [
      <Title key="title">
        <this.SwitchTitle name="色板" />
        <this.SwitchTitle name="色轮" />
      </Title>,
      <View key="panel" width={this.props.width} inner>
        {this.state.tab === '色板' ? (
          <Panel key="color">{_.sortBy(Data, 'key').map(this.mapGroup)}</Panel>
        ) : (
          <Panel key="color">
            <ColorBuilder />
          </Panel>
        )}
        <ButtonGroup>
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
      </View>,
    ];
  }

  handleClick = (name, color) => {
    this.setState({ activeColor: name });
    const data = { border: this.state.border, ...color };
    PostMessage('handleColor', JSON.stringify(data));
  };
}

export default Color;
