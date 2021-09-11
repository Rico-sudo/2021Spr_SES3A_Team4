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
      selected: 1,
    };
  }

  views = [
  <View style={styles.page} key="0"><Search/></View>,
  <View style={styles.page} key="1"><Cam/></View>,
  <View style={styles.page} key="2"><History/></View>
  ];

  handlePageNumber = (position) => {
    this.setState({
      selected: position,
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <TopBar />
        <MenuBar />
        <PagerView style={styles.viewPager, {flex: 3,}} initialPage={1} 
          onPageSelected={e => this.handlePageNumber(e.nativeEvent.position)}>
          {this.views}
        </PagerView>
        <TabBar selectedPage={this.state.selected}/>
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
