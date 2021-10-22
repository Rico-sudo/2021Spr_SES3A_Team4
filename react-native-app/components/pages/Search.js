import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from "react-native";
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
    if (this.state.loading)
      return (
        <ActivityIndicator
          style={styles.topMargin}
          size="large"
          color="#3BB44A"
        />
      );
    if (results.length === 0)
      return <Text style={styles.topMargin}>No results found.</Text>;
    return results.map((snake, index) => (
      <InfoCard snake={snake._id} key={index} {...snake} />
    ));
  }

  render() {
    return (
      <View style={styles.container}>
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
    paddingTop: 10,
  },
  results: {
    marginTop: Dimensions.get('window').height*0.25,
  },
  topMargin: {
    marginTop: 10,
  },
});

export default Search;
