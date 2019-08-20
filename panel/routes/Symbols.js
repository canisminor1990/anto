import { Component } from 'react';
import { connect } from 'dva';
import styled from 'styled-components';
import _ from 'lodash';
import { Button, Icon } from 'antd';
import { Title, Close, View, ListView, Cell, Loading, Check } from '../components';
import { PostMessage } from '../utils/PostMessage';
import { join } from 'path';
/// /////////////////////////////////////////////
// styled
/// /////////////////////////////////////////////

const Cover = styled.div`
  width: 2rem;
  min-width: 2rem;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 0.5rem;
  background: rgba(100, 100, 100, 0.2);
  border-radius: 0.1rem;
  > img {
    max-width: 100%;
    max-height: 100%;
    zoom: 0.5;
  }
`;

const ImgTitle = styled.div`
  transition: all 0.2s ease-out;
  margin-top: 1rem;
  width: 100%;
  font-size: 0.7rem;
  text-align: center;
  color: #666;
`;

const Img = styled.div`
  display: block;
  margin-bottom: 3rem;
  cursor: pointer;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    transition: all 0.2s ease-out;
    zoom: 0.5;
    max-width: 100%;
    max-height: 6rem;
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

const LibraryView = styled.div`
  height: 100%;
  flex: 1;
  padding: 1rem;
  background: #eee;
  overflow-y: auto;
`;

const ListBtn = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  background: rgba(100, 100, 100, 0.3);
  padding: 0.2rem;
  margin-bottom: 0.8rem;
  border-radius: 0.2rem;

  cursor: pointer;
  &:hover {
    background: rgba(100, 100, 100, 0.5);
  }
`;

/// /////////////////////////////////////////////
// connect
/// /////////////////////////////////////////////
const State = state => {
  return {
    check: state.check,
    loading: state.loading.global || Object.keys(state.symbols).length === 0,
    symbols: state.symbols,
    ...state.store,
  };
};

const Dispatch = dispatch => ({
  getSymbols() {
    dispatch({ type: `symbols/get` });
  },
});

/// /////////////////////////////////////////////
// component
/// /////////////////////////////////////////////

class Symbols extends Component {
  state = {
    local: false,
    tab: '场景',
    activeLocal: false,
    activeHeader: {},
  };

  localStorageName = 'dropdown-symbols';

  componentDidMount() {
    this.props.getSymbols();
    if (this.props.mode === '交互') this.setState({ tab: '交互' });
  }

  SwitchTitle = ({ name }) => (
    <Title.Switch active={this.state.tab === name} onClick={() => this.setState({ tab: name })}>
      {name}
    </Title.Switch>
  );

  Cell = ({ name, data, type }) => {
    const List = [];
    _.forEach(data, (value, title) =>
      List.push(
        <Cell key={title} onClick={() => this.handleGroup(type, name, title)}>
          <Cover>
            <img src={this.getImg(type, value[0].id)} />
          </Cover>
          <Cell.Title active={this.state.activeGroup === value}>{title}</Cell.Title>
        </Cell>
      )
    );
    return List;
  };

  Cells = ({ data, type }) => {
    const List = [];
    if (!this.state.activeHeader[type]) {
      const header = this.state.activeHeader;
      header[type] = {};
      this.setState({ activeHeader: header });
    }
    _.forEach(data, (value, key) => {
      const active = !this.state.activeHeader[type][key];
      List.push(
        <div key={key}>
          <Cell.Header dropdown active={active} onClick={() => this.handleHeader(type, key)}>
            {key}
          </Cell.Header>
          <Cell.Group dropdown active={active}>
            <this.Cell data={data[key]} name={key} type={type} />
          </Cell.Group>
        </div>
      );
    });
    return (
      <ListView width="9rem">
        {this.props.check ? (
          <ListBtn onClick={() => this.handleRule(this.state.tab)}>
            <Icon style={{ marginRight: '.5rem' }} type="read" />
            查看规范
          </ListBtn>
        ) : null}
        {List}
      </ListView>
    );
  };

  Library = ({ data, type }) => {
    const List = [];
    let activeRoot;
    let activeGroup;
    if (!this.state[type]) {
      activeRoot = _.keys(data)[0];
      activeGroup = _.keys(data[activeRoot])[0];
      this.setState({ [type]: { activeRoot, activeGroup } });
    } else {
      activeRoot = this.state[type].activeRoot;
      activeGroup = this.state[type].activeGroup;
    }
    const SymbolData = data[activeRoot][activeGroup];
    _.forEach(SymbolData, (value, key) => {
      const postData = {
        id: value.id,
        libname: this.props.symbols[type].libname,
        type,
      };
      List.push(
        <Img key={key} onDragEnd={() => PostMessage('handleSymbol', JSON.stringify(postData))}>
          <img src={this.getImg(type, value.id)} />
          <ImgTitle>{this.getName(value.name[2])}</ImgTitle>
        </Img>
      );
    });
    return <LibraryView data-app-region="no-drag">{List}</LibraryView>;
  };

  View = ({ data, type }) => (
    <View width={this.props.width} inner>
      <this.Cells key="cells" data={data} type={type} />
      <this.Library key="library" data={data} type={type} />
    </View>
  );

  MainView = () => {
    const List = [];
    _.forEach(this.props.symbols, t => {
      List.push(<this.ChildView name={t.name} type={t.dirname} />);
    });
    return List;
  };

  ChildView = ({ name, type }) => {
    return this.state.tab === name ? (
      <this.View data={this.props.symbols[type].data} type={type} />
    ) : null;
  };

  CheckView = () => (this.props.loading ? <Loading /> : <this.MainView />);

  Tabs = () => {
    let Tab = [];
    _.forEach(this.props.symbols, t => {
      Tab.push(<this.SwitchTitle name={t.name} />);
    });
    return Tab;
  };

  render() {
    return (
      <>
        <Title>{this.props.loading ? null : <this.Tabs />}</Title>
        {this.props.check ? <this.CheckView /> : <Check />}
        <Close key="close" name="symbol" />
      </>
    );
  }

  getImg = (type, id) => {
    return 'http://' + join('anto.inc.alipay.net/static', type, 'img', id + '.png');
  };

  getName = name => {
    let newName = name.split('-');
    return newName.length === 2 ? newName[1] : name;
  };

  handleRule = tab => {
    PostMessage('handleRule', tab);
  };

  handleHeader = (type, name) => {
    const newState = this.state.activeHeader;
    newState[type][name] = !this.state.activeHeader[type][name];
    this.setState({ activeHeader: newState });
    localStorage.setItem(this.localStorageName, JSON.stringify(newState));
  };

  handleGroup = (type, activeRoot, activeGroup) => {
    this.setState({ [type]: { activeRoot, activeGroup } });
  };
}

export default connect(
  State,
  Dispatch
)(Symbols);
