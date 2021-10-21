import React, { Component } from "react";
import { View, Text, StyleSheet, Image } from "react-native";

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
        {this.props.commonName && (
          <View style={styles.nameContainer}>
            <Text style={styles.resultSubText}>{this.props.commonName}</Text>
            <Text
              style={{
                color:
                  this.props.dangerRating < 4
                    ? "green"
                    : this.props.dangerRating < 8
                    ? "orange"
                    : "red",
              }}
            >{`${this.props.dangerRating}/10`}</Text>
          </View>
        )}
        <View>
          <View>
            {this.displaySection("Scientific Name", this.props.scientificName)}
            {this.displaySection("Familys", this.props.family)}
            {this.displaySection("Genus", this.props.genus)}
          </View>
        </View>
        <Image
          source={{
            uri: `https://ss3a-snakescanner-snake-images.s3.ap-southeast-2.amazonaws.com/${this.props._id}.png`,
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  infoCard: {
    width: 320,
    height: "auto",
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
  resultSubText: {
    fontSize: 20,
    fontFamily: "Avenir-Medium",
    marginBottom: 5,
    fontWeight: "bold",
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

export default InfoCard;
