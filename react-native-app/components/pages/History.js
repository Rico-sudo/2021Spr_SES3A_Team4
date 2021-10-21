import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';
import InfoCard from '../elements/InfoCard';

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.results}>No history found.</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {

  },
  results: {
    marginTop: Dimensions.get('window').height*0.4,
  },
});

export default History;
