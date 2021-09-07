import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";

class InfoCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  displaySection(sectionName, sectionText) {
    return (
      <View style={{ flexDirection: "column", marginVertical: 5 }}>
        <Text style={{ fontWeight: "bold" }}>{sectionName}</Text>
        <Text style={{ color: "grey" }}>{sectionText}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.infoCard}>
        {this.displaySection("Scientific Name", this.props.scientificName)}
        {this.displaySection("Family", this.props.family)}
        {this.displaySection("Genus", this.props.genus)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  infoCard: {
    width: 320,
    height: 140,
    backgroundColor: "#FEFEFE",
    borderRadius: 20,
    alignContent: "center",
    justifyContent: "center",
    shadowColor: "#37373737",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 1,
    shadowRadius: 5,
    margin: 15,
    padding: 20,
  },
});

export default InfoCard;
