import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class MenuBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.menuBar}>
        <Text style={ styles.logo}>{this.props.page}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    menuBar: {
        height: 47,
        backgroundColor: 'white',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
    paddingTop: 7,
  }
});

export default MenuBar;
