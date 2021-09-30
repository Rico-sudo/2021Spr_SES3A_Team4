import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import InfoCard from '../elements/InfoCard';
import SearchBar from '../elements/SearchBar';

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text>SEARCH PAGE</Text>
        <SearchBar />
        <InfoCard /><InfoCard /><InfoCard /><InfoCard /><InfoCard /><InfoCard />
      </ScrollView>
    );
  }
}

//STYLESHEET
const styles = StyleSheet.create({
  container: {

  }
});

export default Search;
