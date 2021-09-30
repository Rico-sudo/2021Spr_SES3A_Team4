import React, { Component } from 'react';
import { container, Header, View, Text, Icon, Input, Item, TextInput, Image } from 'react-native';
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
        <View>
          <View>
          <Image/>
        </View>
        <TextInput />

        <Text>SEARCH PAGE</Text>
        <SearchBar />
        <InfoCard /><InfoCard /><InfoCard /><InfoCard />

      </View> 
      </View>
    );
  }
}

export default Search;
