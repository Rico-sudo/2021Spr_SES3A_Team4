import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
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
        <InfoCard /><InfoCard /><InfoCard /><InfoCard /><InfoCard /><InfoCard /><InfoCard /><InfoCard />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    
  },
});

export default History;
