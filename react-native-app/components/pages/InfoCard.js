import React, { Component } from 'react';
import { View, Text } from 'react-native';
import InfoCard from '../elements/InfoCard';
import SearchBar from '../elements/SearchBar';

class InfoCard  extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text>InformationCard</Text>
        <SearchBar />
        <Description/> 
        <Image source={require('.Python.png')} />
      </View> 
      
    );
  }
}

export default InfoCard;