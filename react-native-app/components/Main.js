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
      pageName: "SnakeScanner",
    };
  }
  pagerRef = React.createRef();
  setPageName = (i) => {
    if (i == 0) {
      this.setState({
        pageName: "Search",
      })
    }
    if (i == 1) {
      this.setState({
        pageName: "SnakeScanner",
      })
    } 
    if (i == 2) {
      this.setState({
        pageName: "History",
      })
    }
  }

  views = [
  <View style={styles.page} key="0"><Search navigation={this.props.navigation}/></View>,
  <View style={styles.page} key="1"><Cam navigation={this.props.navigation}/></View>,
  <View style={styles.page} key="2"><History navigation={this.props.navigation}/></View>
  ];

  handlePageNumber = (position) => {
    this.setState({
      selected: position,
    })
    this.setPageName(position);
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
          locations={[0,1]}>
            <StatusBar barStyle="light-content" />
            <TopBar />
            <MenuBar pageName={this.state.pageName} navigation={this.props.navigation}/>
            </LinearGradient>
            <PagerView style={styles.viewPager, {flex: 3,}} initialPage={1} 
              onPageSelected={e => this.handlePageNumber(e.nativeEvent.position)}
              ref={(viewPager) => {this.viewPager = viewPager}}>
              {this.views}
            </PagerView>
          <View style={styles.TabBar}>
            <TabBar selectedPage={this.state.selected} passToParent={this.childCallBack}/>
            <BottomBar />
          </View>
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
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#cccccc',
  },
  TabBar: {
    backgroundColor: '#216E21',
    borderTopWidth: 1,
    borderTopColor: '#bbbbbb',
  }
});

export default Main;
