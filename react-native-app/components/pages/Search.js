import React, { Component } from 'react';
import { container, Header, View, Text, Icon, Input, Item, TextInput } from 'react-native';
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

      <View style={StyleSheet.container}>
        <View style={StyleSheet.searchContainer}>
          <View styles={styles.vvSearch}
          <Image
            resizeMode='center'
            style={StyleSheet.icSearch}
            source={require{'../../assets/ic_search.png'}} />

        </View>
        <TextInput />

        <Text>SEARCH PAGE</Text>
        <SearchBar />
        <InfoCard /><InfoCard /><InfoCard /><InfoCard />

      </View> 
     </container > 
    );
  }
}

export default Search;
