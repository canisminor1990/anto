import { Component } from 'react';
import styled from 'styled-components';
import { Input } from 'antd';
import { Title, View, Close, Cell } from '../components';
import _ from 'lodash';
import { PostMessage } from '../utils/PostMessage';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Data from '../data/word.json';

const Search = Input.Search;
/// /////////////////////////////////////////////
// styled
/// /////////////////////////////////////////////

const Panel = styled.div`
  padding: 1rem;
  width: 9rem;
  height: calc(100% - 50px);
  overflow-y: auto;
`;

const SearchBlock = styled.div`
  transform: scale(0.9);
  position: fixed;
  top: -1px;
  right: 0;
  width: 15rem;
`;

const LibraryView = styled.div`
  height: 100%;
  flex: 1;
  padding: 1rem;
  background: #eee;
  overflow-y: auto;
`;

const LibGroup = styled.div`
  margin-bottom: 2rem;
`;

const LibHeader = styled.div`
  color: #333;
  font-size: 1.1rem;
  font-weight: 600;
  padding-bottom: 0.5rem;
  border-bottom: 3px solid #ddd;
`;

const LibBlock = styled.div`
  margin-bottom: 0.5rem;

  padding: 1rem 0;
  padding-bottom: 1.5rem;
  border-bottom: 1px dashed #ddd;
`;

const LibTitle = styled.span`
  display: block;
  font-weight: 600;
  color: #2a72ff;
  margin-bottom: 0.5rem;
  height: 1.5rem;
  border-radius: 0.2rem;
  line-height: 1.5rem;
  padding: 0 0.4rem;
  margin-right: 0.3rem;
  margin-bottom: 0.3rem;
  cursor: pointer;
  background: rgba(255, 255, 255, 0.5);
  transition: all ease 0.2s;
  &:hover {
    background: #2a72ff;
    color: #fff;
  }
  &:active {
    transform: scale(0.95);
  }
`;

const LibTitleBlock = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 0.5rem;
`;

const LibContent = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-top: 0.5rem;
`;

const LibDesc = styled.div`
  font-size: 0.7rem;
  color: #666;
  text-align: justify;
  margin-bottom: 0.3rem;
`;

const LibTag = styled.span`
  display: block;
  font-size: 0.8rem;
  color: #fff;
  border-radius: 0.2rem;
  line-height: 1.2rem;
  padding: 0 0.3rem;
  margin-right: 0.2rem;
  margin-bottom: 0.2rem;
`;

const LibTrue = styled(LibTag)`
  background: #24a69b;
  cursor: pointer;
  transition: all ease 0.2s;
  &:hover {
    font-weight: 600;
  }
  &:active {
    transform: scale(0.95);
  }
`;

const LibWrong = styled(LibTag)`
  background: #f25535;
`;

/// /////////////////////////////////////////////
// component
/// /////////////////////////////////////////////

class Word extends Component {
  state = {
    activeRoot: 0,
    activeGroup: 0,
    search: false,
    keywords: null,
    header: {},
  };

  localStorageName = 'dropdown-word';

  componentDidMount() {
    let state = localStorage.getItem(this.localStorageName);
    if (state) {
      this.setState({ header: JSON.parse(state) });
    } else {
      localStorage.setItem(this.localStorageName, '{}');
    }
  }

  mapData = (data, index) => {
    const active = !this.state.header[data.title];
    return (
      <div key={index}>
        <Cell.Header dropdown active={active} onClick={() => this.handleHeader(data.title)}>
          {data.title}
        </Cell.Header>
        <Cell.Group dropdown active={active}>
          {data.group.map((data, i) => this.mapGroup(data, i, index))}
        </Cell.Group>
      </div>
    );
  };

  mapGroup = (data, indexGroup, indexRoot) => {
    const active = this.state.activeRoot === indexRoot && this.state.activeGroup === indexGroup;
    return (
      <Cell.Title
        key={indexGroup}
        active={active}
        onClick={() => this.handleGroup(indexRoot, indexGroup)}
      >
        {indexGroup + 1}.{data.title}
      </Cell.Title>
    );
  };

  mapLib = (data, index) => {
    return (
      <LibGroup key={index}>
        <LibHeader>
          {this.state.activeGroup + 1}.{index + 1} {data.title}
        </LibHeader>
        {data.group.map(this.mapLibGroup)}
      </LibGroup>
    );
  };

  mapLibGroup = (data, index) => {
    return (
      <LibBlock key={index}>
        <LibTitleBlock>
          {data.title.map((t, i) => (
            <CopyToClipboard key={i} text={t}>
              <LibTitle onClick={() => this.handleCopy(t)}>{t}</LibTitle>
            </CopyToClipboard>
          ))}
        </LibTitleBlock>
        {data.desc.split(/\n/g).map((t, i) => (
          <LibDesc key={i}>{t}</LibDesc>
        ))}
        <LibContent>
          <LibTrue>✓</LibTrue>
          {data.true && data.true.length > 0
            ? data.true.map((t, i) => (
                <CopyToClipboard key={i} text={t}>
                  <LibTrue onClick={() => this.handleCopy(t)}>{t}</LibTrue>
                </CopyToClipboard>
              ))
            : null}
        </LibContent>
        <LibContent>
          <LibWrong>✗</LibWrong>
          {data.wrong && data.wrong.length > 0
            ? data.wrong.map((t, i) => <LibWrong key={i}>{t}</LibWrong>)
            : null}
        </LibContent>
      </LibBlock>
    );
  };

  SearchResult = () => {
    let newData = [];
    _.forEach(Data, h1 => {
      _.forEach(h1.group, h2 => {
        _.forEach(h2.group, h3 => {
          newData = newData.concat(h3.group);
        });
      });
    });

    const result1 = [];
    const result2 = [];
    const result3 = [];
    const result4 = [];

    _.forEach(newData, d => {
      if (JSON.stringify(d.title).indexOf(this.state.keywords) > -1) result1.push(d);
      if (d.true && JSON.stringify(d.true).indexOf(this.state.keywords) > -1) result2.push(d);
      if (d.wrong && JSON.stringify(d.wrong).indexOf(this.state.keywords) > -1) result3.push(d);
      if (d.desc.indexOf(this.state.keywords) > -1) result4.push(d);
    });

    const result = _.uniq([].concat(result1, result2, result3, result4));

    return (
      <LibGroup>
        {result.length > 0 ? result.map(this.mapLibGroup) : '对不起，未找到匹配结果...'}
      </LibGroup>
    );
  };

  render() {
    return (
      <>
        <Title>
          话术
          <SearchBlock>
            <Search placeholder="请输入关键字" onSearch={this.handleSearch} enterButton />
          </SearchBlock>
        </Title>
        <View width={this.props.width} inner>
          <Panel key="panel">{Data.map(this.mapData)}</Panel>
          <LibraryView key="lib">
            {this.state.search ? (
              <this.SearchResult />
            ) : (
              Data[this.state.activeRoot].group[this.state.activeGroup].group.map(this.mapLib)
            )}
          </LibraryView>
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

  handleGroup = (activeRoot, activeGroup) => {
    this.setState({ search: false, activeRoot, activeGroup });
  };

  handleSearch = value => {
    this.setState({ search: true, keywords: value });
  };

  handleCopy = value => {
    PostMessage('handleWord', value);
  };
}

export default Word;
