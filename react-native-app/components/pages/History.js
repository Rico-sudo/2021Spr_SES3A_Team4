import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import HistoryContainer from "../elements/HistoryContainer";

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <HistoryContainer navigation={this.props.navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
});

export default History;
