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
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <TopBar />
        <MenuBar />
        <PagerView style={styles.viewPager, {flex: 3,}} initialPage={1}>
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
        <TabBar />
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
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    overflow: 'hidden',
  },
});

export default Main;
