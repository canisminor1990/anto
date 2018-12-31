import { Component } from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'dva';
import QueueAnim from 'rc-queue-anim';
import Data from '../data.json';
import Toc from '../toc.json';
import _ from 'lodash';

/// /////////////////////////////////////////////
// styled
/// /////////////////////////////////////////////

export const Title = styled.div`
  width: 368px;
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
  width: 368px;
  height: calc(100vh - 50px);
  overflow: hidden;
`;

export const Close = styled.div`
  position: fixed;
  bottom: 0;
  right: 0;
  width: 2rem;
  height: 2rem;
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
  padding: 0.5rem;
  width: 9rem;
  overflow: hidden;
  overflow-y: auto;
  border-right: ${props =>
    props.theme === 'black' ? '1px solid rgba(0, 0, 0, 0.1)' : '1px solid #eee'};
`;

const CellHeader = styled.div`
  width: 100%;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: rgba(100, 100, 100, 0.4);
`;

const CellGroup = styled.div`
  margin-bottom: 1rem;
`;

const CellIcon = styled.img`
  width: 2rem;
  height: 2rem;
  margin-right: 0.25rem;
`;

const CellTitle = styled.div`
  padding: 0.2rem 0.75rem;
  border-radius: 1rem;
  flex: 1;
  ${props =>
    props.active
      ? css`
          color: #fff;
          background: #2a72ff;
          font-weight: 600;
        `
      : null};
`;

const Cell = styled.div`
  margin-bottom: 0.25rem;
  display: flex;
  align-items: center;
  font-size: 0.75rem;
  border-radius: 0.2rem;
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
  padding: 0.5rem 1rem;
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

  Cell = ({ toc, name }) => {
    const List = [];
    _.forEach(toc, value =>
      List.push(
        <Cell key={value} onClick={() => this.handleGroup(name, value)}>
          <CellIcon src={`symbol/icon-${value}.png`} />
          <CellTitle active={this.state.activeGroup === value}>{value}</CellTitle>
        </Cell>
      )
    );
    return <CellGroup>{List}</CellGroup>;
  };

  Cells = ({ toc }) => {
    const List = [];
    _.forEach(toc, (value, key) =>
      List.push(
        <div key={key}>
          <CellHeader>{key}</CellHeader>
          <this.Cell toc={value} name={key} />
        </div>
      )
    );
    return <Cells theme={this.props.theme}>{List}</Cells>;
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
    return <Library>{List}</Library>;
  };

  render() {
    return [
      <Title key="title" theme={this.props.theme}>
        组件库
      </Title>,
      <View key="panel">
        <CellsGroup type="bottom">
          <this.Cells key="cells" toc={Toc} />
          <this.Library key="library" data={Data} />
        </CellsGroup>
        <Close onClick={this.handleClose} />
      </View>,
    ];
  }

  handleGroup = (activeRoot, activeGroup) => {
    this.setState({ activeRoot, activeGroup });
  };

  handleClose = () => {
    this.props.setConfig({ symbol: false });
    window.postMessage('closePanel', null);
  };
}

export default connect(
  State,
  Dispatch
)(Symbol);
