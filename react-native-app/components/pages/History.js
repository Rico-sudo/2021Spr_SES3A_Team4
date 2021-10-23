import React, { Component } from "react";
import { StyleSheet, ScrollView } from "react-native";
import HistoryContainer from "../elements/HistoryContainer";

class History extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <HistoryContainer />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
});

export default History;
