import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, useColorScheme} from 'react-native';
import Cam from './Camera';
import TopBar from './menu/TopBar';
import MenuBar from './menu/MenuBar';
import PagerView from 'react-native-pager-view';
import BottomBar from './menu/BottomBar';
import TabBar from './menu/TabBar';
import Search from './pages/Search';
import History from './pages/History';
import { LinearGradient } from 'expo-linear-gradient';


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

  childCallBack = (clickedTab) => {
    this.viewPager.setPage(clickedTab);
  }

  render() {
    return (
      <View style={styles.container}>
         <LinearGradient
        colors={['#3BB44A', '#016937']}
        start={{ x: -0.65, y: 0.65 }}
        end={{ x: 1, y: 1 }}
        locations={[0,1]}
        style={styles.container}>
          <StatusBar barStyle="dark-content" />
          <TopBar />
          <MenuBar />
          <PagerView style={styles.viewPager, {flex: 3,}} initialPage={1} 
            onPageSelected={e => this.handlePageNumber(e.nativeEvent.position)}
            ref={(viewPager) => {this.viewPager = viewPager}}>
            {this.views}
          </PagerView>
          <TabBar selectedPage={this.state.selected} passToParent={this.childCallBack}/>
          <BottomBar />
        </LinearGradient>
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
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
});

export default Main;
