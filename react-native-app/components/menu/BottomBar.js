import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class BottomBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
        <View style={styles.bottomBar}/>
    );
  }
}

const styles = StyleSheet.create({
    bottomBar: {
        height: 27,
        backgroundColor: 'white',
    },
});

export default BottomBar;
