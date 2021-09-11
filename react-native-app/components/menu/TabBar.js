import React, { Component, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

class TabBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  onClickTab = (tab) => {
      this.props.passToParent(tab); 
  }

  render() {
    return (
        <View style={styles.tabBar}>
            <View style={styles.textHolder}>
                <TouchableOpacity onPress={() => this.onClickTab(0)}>
                    <Text style={[styles.search, {fontWeight: this.props.selectedPage === 0 && "bold" || "normal"}]}>Search</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.onClickTab(1)}>
                    <Text style={[styles.camera, {fontWeight:  this.props.selectedPage === 1 && "bold" || "normal"}]}>Camera</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.onClickTab(2)}>
                    <Text style={[styles.history, {fontWeight:  this.props.selectedPage === 2 && "bold" || "normal"}]}>History</Text>
                </TouchableOpacity>
            </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    tabBar: {
        height: 49,
        backgroundColor: 'white',
    },
    textHolder: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingTop: 11,
    },
    camera: {
        fontSize: 20,
        flex: 2,
    },
    search: {
        fontSize: 20,
        flex: 2,
        paddingLeft: 53,
    },
    history: {
        fontSize: 20,
        flex: 2,
        paddingRight: 53,
    }
});

export default TabBar;
