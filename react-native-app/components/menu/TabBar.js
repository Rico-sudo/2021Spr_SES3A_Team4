import React, { Component } from 'react';
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
                <Text style={styles.search}>Search</Text>
                <Text style={styles.camera}> Camera </Text>
                <Text style={styles.history}> History </Text>
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
        fontWeight: 'bold',
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
