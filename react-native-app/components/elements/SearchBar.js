import React, { Component } from "react";
import { View, TextInput, StyleSheet } from "react-native";

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View style={styles.searchBar}>
        <TextInput {...this.props} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  searchBar: {
    width: 363,
    height: 41,
    backgroundColor: "#FEFEFE",
    borderRadius: 20,
    alignContent: "center",
    justifyContent: "center",
    shadowColor: "#37373737",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 5,
    paddingHorizontal: 20,
  },
});

export default SearchBar;
