import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Cam from './Camera';
import TopBar from './menu/TopBar';
import MenuBar from './menu/MenuBar';
import PagerView from 'react-native-pager-view';
import BottomBar from './menu/BottomBar';
import TabBar from './menu/TabBar';
import Search from './pages/Search';
import History from './pages/History';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: 1,
      pageName: "SnakeScanner",
    };
  }
  pagerRef = React.createRef();
  setPageName(i) {
    if (i == 0) this.state.pageName = "Search";
    if (i == 1) this.state.pageName = "SnakeScanner";
    if (i == 2) this.state.pageName = "History";
    this.state.page = i;
  }

  onPageSelected = (e) => {
    this.setState({
        page: e.nativeEvent.position,
    });
    this.setPageName(e.nativeEvent.position);
  };

  

  render() {
    return (
      
      <View style={styles.container}>
        <TopBar />
        <MenuBar page={this.state.pageName}/>
        <PagerView style={styles.viewPager, {flex: 3,}} initialPage={1} onPageSelected={this.onPageSelected} ref={this.pagerRef}>
          <View style={styles.page } key="1">
            <Search />
          </View>
          <View style={styles.page} key="2">
            <Cam />
          </View>
          <View style={styles.page} key="3">
            <History />
          </View>
        </PagerView>
        <TabBar page={this.state.page}/>
        <BottomBar />

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  viewPager: {
    width: '100%',
    height: '100%',
  },
  page: {
    borderRadius: 20,
    overflow: 'hidden',
  },
});

export default Main;
