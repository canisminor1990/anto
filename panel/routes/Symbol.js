import { Component } from 'react';
import styled from 'styled-components';
import Data from '../data/symbol.json';
import Toc from '../data/toc.json';
import _ from 'lodash';
import { Button, Icon } from 'antd';
import { Title, Close, View, ListView, Cell } from '../components';
import { PostMessage } from '../utils/PostMessage';
import { resolve } from 'path';
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

const ButtonView = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const RefreshBtn = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  background: #2b79ff;
  padding: 0.2rem;
  margin-bottom: 0.8rem;
  border-radius: 0.2rem;
  color: #fff;
  cursor: pointer;
  &:hover {
    opacity: 0.9;
  }
`;

/// /////////////////////////////////////////////
// component
/// /////////////////////////////////////////////

class Symbol extends Component {
  state = {
    local: false,
    tab: '交互',
    activeRoot: '导航类',
    activeGroup: '状态栏',
    activeLocal: false,
    header: {},
    refresh: 0,
  };

  localStorageName = 'dropdown-symbol';

  componentDidMount() {
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

  Cell = ({ toc, name, data }) => {
    const List = [];
    _.forEach(toc, value =>
      List.push(
        <Cell key={value} onClick={() => this.handleGroup(name, value)}>
          <Cover>
            <img src={data[value][0].png} />
          </Cover>
          <Cell.Title active={this.state.activeGroup === value}>{value}</Cell.Title>
        </Cell>
      )
    );
    return List;
  };

  Cells = ({ toc, data }) => {
    const List = [];
    _.forEach(toc, (value, key) => {
      const active = !this.state.header[key];
      List.push(
        <div key={key}>
          <Cell.Header dropdown active={active} onClick={() => this.handleHeader(key)}>
            {key}
          </Cell.Header>
          <Cell.Group dropdown active={active}>
            <this.Cell toc={value} data={data[key]} name={key} />
          </Cell.Group>
        </div>
      );
    });
    return <ListView width="9rem">{List}</ListView>;
  };

  Library = ({ data }) => {
    const List = [];
    const SymbolData = data[this.state.activeRoot][this.state.activeGroup];
    const sortSymbol = (a, b) => parseInt(a.name.split('-')[0]) - parseInt(b.name.split('-')[0]);
    _.forEach(SymbolData.sort(sortSymbol), (value, key) =>
      List.push(
        <Img key={key} onDragEnd={() => PostMessage('handleSymbol', JSON.stringify(value))}>
          <img src={value.png} />
          <ImgTitle>{value.name.split('-')[1]}</ImgTitle>
        </Img>
      )
    );
    return <LibraryView>{List}</LibraryView>;
  };

  InteractiveView = () => (
    <View width={this.props.width} inner>
      <this.Cells key="cells" toc={Toc} data={Data} />
      <this.Library key="library" data={Data} />
    </View>
  );

  LocalView = () => {
    let LocalData = localStorage.getItem('local-symbols-data');
    if (LocalData && !this.state.local) this.setState({ local: true });
    if (this.state.local) {
      LocalData = _.sortBy(JSON.parse(LocalData), 'name');
    }
    return (
      <View width={this.props.width} inner>
        {this.state.local ? (
          [
            <this.LocalList key="list" data={LocalData} />,
            <this.LocalLibrary key="library" data={LocalData} />,
          ]
        ) : (
          <ButtonView>
            <h3>读取本文档Symbols</h3>
            <Button type="primary" onClick={this.handleRefresh}>
              生成预览
            </Button>
          </ButtonView>
        )}
      </View>
    );
  };

  _cacheName = null;

  LocalList = ({ data }) => {
    const mapData = (s, key) => {
      const name = s.name.replace(/ /g, '').split('/')[0];
      if (!this.state.activeLocal && key === 0) this.setState({ activeLocal: name });
      if (this._cacheName === name) return null;
      this._cacheName = name;
      return (
        <Cell key={key} onClick={() => this.setState({ activeLocal: name })}>
          <Cover>
            <img src={s.path} />
          </Cover>
          <Cell.Title active={this.state.activeLocal === name}>{name}</Cell.Title>
        </Cell>
      );
    };
    return (
      <ListView width="9rem" key={this.state.refresh}>
        <RefreshBtn onClick={this.handleRefresh}>
          <Icon style={{ marginRight: '.5rem' }} type="reload" />
          刷新
        </RefreshBtn>
        {data.map(mapData)}
      </ListView>
    );
  };

  LocalLibrary = ({ data }) => {
    const mapData = (s, key) => {
      let name = s.name.replace(/ /g, '').split('/');
      if (name[0] !== this.state.activeLocal) return null;
      if (name.length > 1) name.shift();
      name = name.join(' / ');
      return (
        <Img key={key}>
          <img src={s.path} onDragEnd={() => PostMessage('handleLocalSymbol', s.id)} />
          <ImgTitle>{name}</ImgTitle>
        </Img>
      );
    };
    return (
      <LibraryView key={this.state.refresh}>{_.sortBy(data, 'name').map(mapData)}</LibraryView>
    );
  };

  render() {
    return (
      <>
        <Title>
          <this.SwitchTitle name="交互" />
          <this.SwitchTitle name="本地" />
        </Title>
        {this.state.tab === '交互' ? <this.InteractiveView key="interactive" /> : null}
        {this.state.tab === '本地' ? <this.LocalView key={this.state.refresh} /> : null}
        <Close key="close" name="symbol" />
      </>
    );
  }

  handleRefresh = () => {
    let getNewData = false;
    let time = '';
    if (this.state.local) {
      time = JSON.parse(localStorage.getItem('local-symbols-time'));
    }
    PostMessage('handleBuildLocalSymbol', null);
    while (getNewData) {
      let newTime = time;
      setTimeout(() => {
        newTime = JSON.parse(localStorage.getItem('local-symbols-time'));
      }, 100);
      getNewData = newTime !== time;
    }
    this.setState({ refresh: this.state.refresh + 1 });
  };

  handleHeader = name => {
    const newState = this.state.header;
    newState[name] = !this.state.header[name];
    this.setState({ header: newState });
    localStorage.setItem(this.localStorageName, JSON.stringify(newState));
  };

  handleGroup = (activeRoot, activeGroup) => {
    this.setState({ activeRoot, activeGroup });
  };
}

export default Symbol;
