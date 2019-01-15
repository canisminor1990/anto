import { Component } from 'react';
import styled from 'styled-components';
import Data from '../symbol.json';
import Toc from '../toc.json';
import _ from 'lodash';
import { Title, Close, View, ListView, Cell } from '../components';

/// /////////////////////////////////////////////
// styled
/// /////////////////////////////////////////////

const CellIcon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
  margin-right: 0.25rem;
`;

const ImgTitle = styled.div`
  transition: all 0.2s ease-out;
  margin-bottom: 0.5rem;
  width: 100%;
  font-size: 0.75rem;
  font-weight: 600;
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
    zoom: 0.25;
  }

  &:hover {
    ${ImgTitle} {
      color: #2b79ff;
    }
    img {
      transform: scale(1.05);
    }
  }

  &:active {
    img {
      transform: scale(0.95);
    }
  }
`;

/// /////////////////////////////////////////////
// component
/// /////////////////////////////////////////////

class Symbol extends Component {
  state = {
    activeRoot: '导航类',
    activeGroup: '状态栏',
  };

  Cell = ({ toc, name }) => {
    const List = [];
    _.forEach(toc, value =>
      List.push(
        <Cell key={value} onClick={() => this.handleGroup(name, value)}>
          <CellIcon src={`symbol/icon-${value}.png`} />
          <Cell.Title active={this.state.activeGroup === value}>{value}</Cell.Title>
        </Cell>
      )
    );
    return <Cell.Group>{List}</Cell.Group>;
  };

  Cells = ({ toc }) => {
    const List = [];
    _.forEach(toc, (value, key) =>
      List.push(
        <div key={key}>
          <Cell.Header>{key}</Cell.Header>
          <this.Cell toc={value} name={key} />
        </div>
      )
    );
    return (
      <ListView width="9rem" border>
        {List}
      </ListView>
    );
  };

  Library = ({ data }) => {
    const List = [];
    const SymbolData = data[this.state.activeRoot][this.state.activeGroup];
    const sortSymbol = (a, b) => parseInt(a.name.split('-')[0]) - parseInt(b.name.split('-')[0]);
    _.forEach(SymbolData.sort(sortSymbol), (value, key) =>
      List.push(
        <Img key={key} onDragEnd={() => window.postMessage('handleSymbol', JSON.stringify(value))}>
          <ImgTitle>{value.name.split('-')[1]}</ImgTitle>
          <img src={value.png} />
        </Img>
      )
    );
    return <ListView>{List}</ListView>;
  };

  render() {
    return [
      <Title key="title">组件库</Title>,
      <View key="panel" width={this.props.width} inner>
        <this.Cells key="cells" toc={Toc} />
        <this.Library key="library" data={Data} />
        <Close name="symbol" />
      </View>,
    ];
  }

  handleGroup = (activeRoot, activeGroup) => {
    this.setState({ activeRoot, activeGroup });
  };
}

export default Symbol;
