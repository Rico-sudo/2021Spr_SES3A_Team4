import React, { Component } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";

class InfoCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  displaySection(sectionText) {
    return (
      <View style={{ flexDirection: "column",}}>
        <Text style={{ color: "grey" }}>{sectionText}</Text>
      </View>
    );
  }

  render() {
    return (
      <View style={styles.infoCard}>
        <Image style={styles.images}
          source={{
            uri: 'https://ss3a-snakescanner-snake-images.s3.ap-southeast-2.amazonaws.com/' + this.props._id +'.png',
          }}
        />
        <View style={styles.info}>
          {this.props.commonName && (
            <View style={styles.nameContainer}>
              <Text style={styles.resultSubText}>{this.props.commonName}</Text>
            </View>
          )}
          <View>
            <View>
              {this.displaySection(this.props.scientificName)}
              <Text
                style={{
                  color:
                    this.props.dangerRating < 4
                      ? "green"
                      : this.props.dangerRating < 8
                      ? "orange"
                      : "red",
                  marginTop: 10,
                }}
              >{`Danger Level: ${this.props.dangerRating}/10`}</Text>
            </View>
          </View>
        </View>
        <TouchableOpacity style={styles.learnMoreButton} onPress={() => this.props.navigation.navigate('SnakeInfo', {commonName: this.props.commonName, scientificName: this.props.scientificName, family: this.props.family, genus: this.props.genus, moreInfo: this.props.moreInfo, venomousInfo: this.props.venomousInfo, id: this.props._id})}><Text style={styles.learnMoreText}>Learn More</Text></TouchableOpacity>
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
    flexDirection: 'row',
  },
  resultSubText: {
    fontSize: 16,
    fontFamily: "Avenir-Medium",
    fontWeight: "bold",
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  images: {
    height: 100,
    width: 100,
    resizeMode: 'stretch',
    flex: 1,
    borderRadius: 15,
  },
  info: {
    flex: 2,
    paddingLeft: 20,
  },
  learnMoreButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    padding: 18,
  },
  learnMoreText: {
    fontSize: 14,
    fontFamily: "Avenir-Medium",
    fontWeight: "bold",
  },
});

export default InfoCard;
