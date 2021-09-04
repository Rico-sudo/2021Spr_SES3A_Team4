import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class TabBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: this.props.page,
    };
    }
    
    isSelected(i) {
        this.state.page = this.props.page;
        if (this.state.page == i) {
            return styles.selected;
        }
     }

  render() {
    return (
        <View style={styles.tabBar}>
            <View style={styles.textHolder}>
                <Text style={[styles.search, this.isSelected(0)]}>Search</Text>
                <Text style={[styles.camera, this.isSelected(1)]}> Camera </Text>
                <Text style={[styles.history, this.isSelected(2)]}> History </Text>
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
    },
    selected: {
        fontWeight: 'bold',
    },
});

export default TabBar;
