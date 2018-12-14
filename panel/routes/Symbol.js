import { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'dva';
import QueueAnim from 'rc-queue-anim';
import Data from '../data.json';
import _ from 'lodash';

/// /////////////////////////////////////////////
// styled
/// /////////////////////////////////////////////

export const Title = styled.div`
  width: 640px;
  height: 48px;
  display: flex;
  font-size: 1.2rem;
  align-items: center;
  padding: 0 1rem;
  font-weight: bolder;
  color: rgba(100, 100, 100, 0.4);
  box-shadow: ${props =>
    props.theme === 'black' ? '0 4px 12px rgba(0, 0, 0, 0.2)' : '0 4px 8px rgba(0, 0, 0, 0.05)'};
  margin-bottom: 0.5rem;
`;

export const View = styled.div`
  width: 640px;
  height: calc(100vh - 50px);
  overflow: hidden;
`;

export const Close = styled.div`
  position: fixed;
  bottom: 0;
  left: 48px;
  width: 120px;
  height: 32px;
  background-image: url('icon-close.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: 32px;
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

const CellsGroup = styled(QueueAnim)`
  display: flex;
  overflow: hidden;
  height: 100%;
`;

const Cells = styled.div`
  width: 120px;
  height: 100%;
  border-right: ${props =>
    props.theme === 'black' ? '1px solid rgba(0, 0, 0, 0.1)' : '1px solid #f5f5f5'};
`;

const Cell = styled.div`
  padding: 0.2rem 0.8rem;
  margin: 0.5rem;
  border-radius: 2rem;
  opacity: ${props => (props.active ? '1' : '.6')};
  background: ${props => (props.active ? '#2B79FF' : 'transparent')};
  ${props => (props.active ? 'color:#fff;' : null)};
  cursor: pointer;
  transition: all 0.2s ease-out;
  &:active {
    transform: scale(0.9);
  }
`;

const Library = styled.div`
  flex: 1;
  overflow: hidden;
  overflow-y: auto;
  padding: 1rem;
`;

const ImgTitle = styled.div`
  transition: all 0.2s ease-out;
  margin-bottom: 0.5rem;
  width: 100%;
`;

const Img = styled.div`
  display: block;
  margin-bottom: 1.5rem;
  cursor: pointer;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    transition: all 0.2s ease-out;
    box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.05);
    zoom: 0.5;
  }

  &:hover {
    ${ImgTitle} {
      color: #2b79ff;
    }
    img {
      transform: scale(1.02);
      box-shadow: 0 6px 24px rgba(0, 0, 0, 0.1);
    }
  }

  &:active {
    img {
      transform: scale(0.95);
    }
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
});

/// /////////////////////////////////////////////
// component
/// /////////////////////////////////////////////

class Symbol extends Component {
  state = {
    activeRoot: '导航类',
    activeGroup: '状态栏',
  };

  handleRoot = e => {
    this.setState({ activeRoot: e });
  };

  handleGroup = e => {
    this.setState({ activeGroup: e });
  };

  render() {
    console.log(this.state);
    const List = [];
    const ListGroup = [];
    const ListSymbol = [];

    _.forEach(Data, (value, key) =>
      List.push(
        <Cell key={key} onClick={() => this.handleRoot(key)} active={this.state.activeRoot === key}>
          {key}
        </Cell>
      )
    );

    _.forEach(Data[this.state.activeRoot], (value, key) =>
      ListGroup.push(
        <Cell
          key={key}
          onClick={() => this.handleGroup(key)}
          active={this.state.activeGroup === key}
        >
          {key}
        </Cell>
      )
    );

    let SymbolData = Data[this.state.activeRoot][this.state.activeGroup];

    try {
      SymbolData = SymbolData.sort(
        (a, b) => parseInt(a.name.split('-')[0]) - parseInt(b.name.split('-')[0])
      );
    } catch (e) {}

    _.forEach(SymbolData, (value, key) =>
      ListSymbol.push(
        <Img key={key} onClick={() => window.postMessage('handleSymbol', JSON.stringify(value))}>
          <ImgTitle>{value.name.split('-')[1]}</ImgTitle>
          <img src={value.png} />
        </Img>
      )
    );

    return [
      <Title key="title" theme={this.props.theme}>
        组件库
      </Title>,
      <View key="panel">
        <CellsGroup type="bottom">
          <Cells key="a" theme={this.props.theme}>
            {List}
          </Cells>
          <Cells key="b" theme={this.props.theme}>
            {ListGroup}
          </Cells>
          <Library key="c">{ListSymbol}</Library>
        </CellsGroup>
        <Close onClick={this.handleClose} />
      </View>,
    ];
  }

  handleClose = () => {
    this.props.setConfig({ symbol: false });
    window.postMessage('closePanel', null);
  };
}

export default connect(
  State,
  Dispatch
)(Symbol);
