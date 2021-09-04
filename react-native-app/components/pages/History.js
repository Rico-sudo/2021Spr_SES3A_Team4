import React, { Component } from 'react';
import { View, Text } from 'react-native';
import InfoCard from '../elements/InfoCard';

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text> HISTORY PAGE </Text>
        <InfoCard /><InfoCard /><InfoCard /><InfoCard />
      </View>
    );
  }
}

export default History;
