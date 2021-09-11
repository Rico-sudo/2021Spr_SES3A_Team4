import React, { Component, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class TabBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  
  render() {
    return (
        <View style={styles.tabBar}>
            <View style={styles.textHolder}>
                <Text style={[styles.search, {fontWeight: this.props.selectedPage === 0 && "bold" || "normal"}]}>Search</Text>
                <Text style={[styles.camera, {fontWeight:  this.props.selectedPage === 1 && "bold" || "normal"}]}>Camera</Text>
                <Text style={[styles.history, {fontWeight:  this.props.selectedPage === 2 && "bold" || "normal"}]}>History</Text>
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
        justifyContent: 'center',
        paddingTop: 11,
    },
    camera: {
        fontSize: 20,
        textAlign: 'center',
        textAlignVertical: 'center',
        flex: 2,
    },
    search: {
        fontSize: 20,
        textAlign: 'left',
        flex: 2,
        paddingLeft: 53,
    },
    history: {
        fontSize: 20,
        textAlign: 'right',
        flex: 2,
        paddingRight: 53,
    }
});

export default TabBar;
