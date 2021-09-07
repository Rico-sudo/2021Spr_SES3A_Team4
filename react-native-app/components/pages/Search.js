import React, { Component } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import InfoCard from "../elements/InfoCard";
import SearchBar from "../elements/SearchBar";
import { autocompleteSearch } from "./../../services/autocompleteSearchAustralianSnakes";

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = { searchResults: null, loading: false };
  }

  updateSearchQuery = (searchQuery) => {
    if (searchQuery !== null && searchQuery !== "") {
      this.setState({ loading: true });
      autocompleteSearch(searchQuery)
        .then((res) => {
          if (res.status === 200 && res.data) {
            this.setState({ searchResults: res.data });
          }
        })
        .catch((err) => console.log("Error", err.message))
        .finally(() => this.setState({ loading: false }));
    }
  };

  renderSearchResults(results) {
    if (this.state.loading) return <Text>Loading...</Text>;
    if (results.length === 0) return <Text>No results found.</Text>;
    return results.map((snake) => <InfoCard key={snake._id} {...snake} />);
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>SEARCH PAGE</Text>
        <SearchBar onChangeText={this.updateSearchQuery} placeholder="Search" />
        <ScrollView>
          {this.state.searchResults &&
            this.renderSearchResults(this.state.searchResults)}
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    alignItems: "center",
  },
});

export default Search;
