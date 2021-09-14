import React, { Component } from 'react';
import { View, Text } from 'react-native';
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
      <View>
        <Text>SEARCH PAGE</Text>
        <SearchBar />
        <InfoCard /><InfoCard /><InfoCard /><InfoCard />
      </View>
    );
  }
}

export default Search;