import { Component } from 'react';
import styled from 'styled-components';
import Data from '../color.json';
import _ from 'lodash';
import { Switch } from 'antd';
import { Title, View, Close, Cell, ButtonGroup } from '../components';

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

/// /////////////////////////////////////////////
// component
/// /////////////////////////////////////////////

class Color extends Component {
  state = {
    activeColor: null,
    border: false,
  };

  mapGroup = group => {
    return (
      <Cell.Group>
        <Cell.Header>{group.name}</Cell.Header>
        {_.sortBy(group.colors, 'key').map(this.mapColor)}
      </Cell.Group>
    );
  };

  mapColor = color => {
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
      _.forEach(color.color.stops, stop => {
        stopColors.push(stop.color);
        points.push(<Point style={{ background: stop.color }} />);
        points.push(<Desc>{stop.color}</Desc>);
      });
      desc = <Sub>{points}︎</Sub>;
      style = `linear-gradient(135deg,${stopColors.join(',')})`;
    }

    return (
      <Cell onClick={() => this.handleClick(color.name, color)}>
        <Icon style={{ background: style }} />
        <Cell.Title>
          {color.name}
          {desc}
        </Cell.Title>
      </Cell>
    );
  };

  handleClick = (name, color) => {
    this.setState({ activeColor: name });
    const data = { border: this.state.border, ...color };
    window.postMessage('handleColor', JSON.stringify(data));
  };

  render() {
    return [
      <Title key="title">色板</Title>,
      <View key="panel" width={this.props.width} inner>
        <Panel key="color">{_.sortBy(Data, 'key').map(this.mapGroup)}</Panel>
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
}

export default Color;
