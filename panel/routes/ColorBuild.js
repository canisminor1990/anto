import { Component } from 'react';
import styled from 'styled-components';
import { hsl } from 'polished';
import { Slider } from 'antd';

/// /////////////////////////////////////////////
// styled
/// /////////////////////////////////////////////

const Flex = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
`;

const SliderBox = styled.div`
  width: 100%;
  display: flex;
  height: 4rem;
  align-items: center;
  margin-bottom: 14rem;
`;

const Color = styled.div`
  width: 2rem;
  height: 2rem;
  background: ${props => hsl(props.h, props.s, props.l)};
`;

const Group = styled.div`
  width: 8rem;
  height: 8rem;
  position: fixed;
  top: 7rem;
  left: 3rem;
  transform: rotate(${props => props.deg}deg);
`;

/// /////////////////////////////////////////////
// component
/// /////////////////////////////////////////////

export default class extends Component {
  state = {
    count: 20,
  };

  render() {
    const List = [];
    const Groups = [];

    const alpha = (1 - 0.575) / 5;
    for (let i = 0; i < this.state.count; i++) {
      let angle = 220 + (360 / this.state.count) * i;
      if (angle > 360) angle = angle - 360;
      List.push(
        <Group deg={angle}>
          <Color style={{ borderRadius: '2px' }} h={angle} s={1} l={0.575} />
        </Group>
      );
      Groups.push(
        <Flex>
          <Color h={angle} s={1} l={1 - alpha * 6} />
          <Color h={angle} s={1} l={1 - alpha * 5} />
          <Color h={angle} s={1} l={1 - alpha * 4} />
          <Color h={angle} s={1} l={1 - alpha * 3} />
          <Color h={angle} s={1} l={1 - alpha * 2} />
          <Color h={angle} s={1} l={1 - alpha} />
        </Flex>
      );
    }

    return (
      <div>
        <SliderBox>
          <Slider
            style={{ flex: 1 }}
            defaultValue={20}
            min={0}
            max={30}
            onChange={e => this.setState({ count: e })}
          />
        </SliderBox>
        {List}
        {Groups}
      </div>
    );
  }
}
