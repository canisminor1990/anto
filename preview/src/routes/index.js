import { Component } from 'react';
import { connect } from 'dva';
import styled from 'styled-components';
import { Icon } from 'antd';

/// /////////////////////////////////////////////
// styled
/// /////////////////////////////////////////////

const View = styled.div`
  width: 100%;
  height: 100%;
`;

const Privew = styled.div`
  display: flex;
`;

const Showcase = styled.div`
  width: 100%;
  height: 100vh;
`;

const Case = styled.div`
  overflow: auto;
  width: 100%;
  height: calc(100% - 4rem);
`;

const ImgCase = styled.div`
  > img {
    position: absolute;
    top: 0;
    left: 0;
  }
`;

const Header = styled.div`
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  height: 4rem;
  padding: 0 0.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 99;
`;

const List = styled.div`
  border-right: 1px solid rgba(255, 255, 255, 0.03);
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
`;

const Cell = styled.div`
  width: 20rem;
  padding: 1rem;
  display: flex;
  align-items: center;
  border-bottom: 1px solid rgba(255, 255, 255, 0.03);
  cursor: pointer;
  background: ${props => (props.active ? 'rgba(255,255,255,.02)' : '#222')};
  &:hover {
    background: #1f1f1f;
  }
`;

const Cover = styled.div`
width: 3rem;
height: 3rem;
min-width: 3rem;
background: url("${props => props.path}");
background-size: cover;
background-repeat: no-repeat;
border-radius: .2rem;
box-shadow: 0 4px 8px rgba(0,0,0,.2);
`;

const Content = styled.div`
  margin-left: 1rem;
`;
const Title = styled.div`
  display: flex;
  font-size: 0.9rem;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  -webkit-line-clamp: 1;
  width: 14rem;
  font-weight: 500;
`;

const Tag = styled.div`
  font-size: 0.7rem;
  padding: 0.1rem 0.3rem;
  border-radius: 0.2rem;
  background: ${props => (props.mode === '交互' ? '#2A72FF' : '#333')};
  margin-right: 0.5rem;
  color: #fff;
`;

const Date = styled.div`
  color: #555;
  font-size: 0.8rem;
  margin-top: 0.2rem;
`;

const Group = styled.div`
  display: flex;
  align-items: center;
`;

const Zoom = styled.div`
  display: flex;
  align-items: center;
  margin: 0 3rem 0 1rem;
`;

const ZoomNum = styled.div`
  background: #181818;
  height: 2rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  border-radius: 1rem;
  margin: 0 0.5rem;
  cursor: pointer;
  &:active {
    background: #111;
  }
`;

const ZoomIcon = styled.div`
  background: #2a72ff;
  height: 1.5rem;
  width: 1.5rem;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  &:active {
    background: #155cd5;
  }
`;

const PageTitle = styled.div`
  font-size: 1.2rem;
  color: #fff;
  font-weight: 600;
`;

const Author = styled.div`
  background: #333;
  padding: 0.5rem 0.8rem;
  border: 2px solid #222;
  outline: 1px solid #333;
`;

const Name = styled.span`
  color: #fff;
  font-weight: 600;
  margin-right: 0.5rem;
`;

const Time = styled.span`
  font-size: 0.8rem;
`;

/// /////////////////////////////////////////////
// connect
/// /////////////////////////////////////////////

const State = state => {
  return {
    loading: state.loading.models.preview || !state.preview.date,
    preview: state.preview,
  };
};

const Dispatch = dispatch => ({
  getPreview() {
    dispatch({ type: 'preview/get' });
  },
});

/// /////////////////////////////////////////////
// component
/// /////////////////////////////////////////////

class App extends Component {
  state = {
    zoom: 1,
  };

  componentDidMount() {
    this.props.getPreview();
  }

  List = page => {
    return (
      <Cell
        key={page.name}
        active={this.state.name === page.name}
        onClick={() => this.handleClick(page)}
      >
        <Cover path={page.cover} />
        <Content>
          <Title>{page.name}</Title>
          <Date>
            <Icon type="clock-circle" /> {page.date[0]}
            {page.date[1]}-{page.date[2]}
            {page.date[3]} | {page.mode}
          </Date>
        </Content>
      </Cell>
    );
  };

  Page = ({ data }) => {
    if (!this.state.name) this.setState({ ...data.pages[0] });
    return (
      <Privew>
        <List>
          <Header>
            <a
              className="logo"
              rel="noopener noreferrer"
              href="https://www.yuque.com/canisminor/anto/readme"
              target="_blank"
            />
          </Header>
          {data.pages.map(this.List)}
        </List>
        <Showcase>
          <Header>
            <Group>
              <Zoom>
                <ZoomIcon onClick={this.handleMinus}>
                  <Icon type="minus" />
                </ZoomIcon>
                <ZoomNum onClick={this.handleReset}>{Math.floor(this.state.zoom * 100)}%</ZoomNum>
                <ZoomIcon onClick={this.handlePlus}>
                  <Icon type="plus" />
                </ZoomIcon>
              </Zoom>
              <PageTitle>
                {this.state.name} ({this.state.mode})
              </PageTitle>
            </Group>
            <Author>
              <Name>{data.author}</Name>
              <Time>{data.date}</Time>
            </Author>
          </Header>
          <Case style={{ background: this.state.mode === '交互' ? '#f8f8f8' : '#212121' }}>
            <ImgCase>
              <img
                style={{
                  zoom: this.state.zoom,
                  width: this.state.width / 2 + 'px',
                  height: this.state.height / 2 + 'px',
                }}
                src={this.state.path}
              />
            </ImgCase>
          </Case>
        </Showcase>
      </Privew>
    );
  };

  render() {
    return (
      <View>{this.props.loading ? 'Loading...' : <this.Page data={this.props.preview} />}</View>
    );
  }

  handleReset = () => {
    this.setState({ zoom: 1 });
  };

  handleMinus = () => {
    const zoom = this.state.zoom * 0.8;
    this.setState({ zoom });
  };

  handlePlus = () => {
    const zoom = this.state.zoom * 1.2;
    this.setState({ zoom });
  };

  handleClick = page => {
    this.setState({ ...page, zoom: 1 });
  };
}

export default connect(
  State,
  Dispatch
)(App);
