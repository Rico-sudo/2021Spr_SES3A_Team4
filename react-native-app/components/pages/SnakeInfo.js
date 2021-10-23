import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, Linking, useColorScheme, TouchableOpacity, Dimensions, ScrollView, Image} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from "@expo/vector-icons";
import TopBar from '../menu/TopBar';
import {Picker} from '@react-native-picker/picker';


class SnakeInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  displayDetails(sectionName, sectionText) {
    return (
      <View style={{ flexDirection: "column", marginVertical: 5 }}>
        <Text style={{ fontWeight: "bold" }}>{sectionName}</Text>
        <Text style={{ color: "grey" }}>{sectionText}</Text>
      </View>
    );
  }

  displayDangerRating(sectionName, sectionText) {
    return (
      <View style={{ flexDirection: "column", marginVertical: 5 }}>
        <Text style={{ fontWeight: "bold" }}>{sectionName}</Text>
        <Text style={{
                  color:
                    sectionText < 4
                      ? "green"
                      : sectionText < 8
                      ? "orange"
                      : "red",
                  marginTop: 10,
                  fontWeight: 'bold',
                  marginBottom: 10,
                }}>{sectionText}/10</Text>
      </View>
    );
  }

  displaySection(sectionName, sectionText) {
    return (
      <View style={{ flexDirection: "column", marginVertical: 5 }}>
        <Text style={{ fontSize: 15, textDecorationLine: 'underline'}}>{sectionName}</Text>
        <Text style={{ color: "black", marginVertical: 8, }}>{sectionText}</Text>
      </View>
    );
  }

  renderSteps = (dangerRating) => {
      let steps = "1. Get the person away from the snake.\n2. Ensure they rest and help them to stay calm.\n3. Call triple zero (000) and ask for an ambulance." +
      "\n4. Apply a pressure immobilisation bandage - put a pressure bandage over the bite itself. It should be tight and you should not be able to easily slide a finger between the bandage and the skin." +
      "\n5. Use a heavy crepe or elasticised roller bandage to immobilise the whole limb. Start just above the fingers or toes of the bitten limb and move upwards on the limb as far as the body. Splint the limb including joints on either side of the bite." +
      "\n6. Keep the person and the limb completely at rest. If possible, mark the site of the bite on the bandage with a pen.";
      
      if (dangerRating > 7) {
        return "This snake is very dangerous - seek immediate medical attention if bitten.\n" + steps;
      }
      if (dangerRating == 6) {
        return "This snake is moderately dangerous - seek medical attention as soon as possible.\n" + steps;
      }
      else {
        return "This snake isn't particularly dangerous, however, you should follow the following steps:\n" +
        "1. Wash the wound site with warm water and soap.\n"+
        "2. Bandage the wound to prevent bleeding.\n" + 
        "3. Take care of the wound to ensure it does not become infected - book an appointment with your GP if you have not had a tetanus shot in the last 5 years."
      }
  }

  render() {
    const { commonName, scientificName, family, genus, moreInfo, venomousInfo, id, dangerRating } = this.props.route.params;
    console.log(commonName);
    return (
    <View>
        <LinearGradient
            colors={['#3BB44A', '#016937']}
            start={{ x: -0.65, y: 0.65 }}
            end={{ x: 1, y: 1 }}
            locations={[0,1]}>
         <StatusBar barStyle="light-content" />
         <TopBar/>
         <View style={styles.header}>
            <Text style={styles.text}>Species Information</Text>
            <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.goBack()}>
                <MaterialIcons name="arrow-back" size={28} color="white" />
            </TouchableOpacity>
         </View>
         </LinearGradient>
         <ScrollView style={styles.scrollView}>
            <View style={{flexDirection: 'row'}}>
            <View>
                <Text style={styles.commonName}>{commonName}</Text>
                {this.displayDetails("Scientific Name", scientificName)}
                {this.displayDetails("Familys", family)}
                {this.displayDetails("Genus", genus)}
                {this.displayDangerRating("Danger Level", dangerRating)}
            </View>
            <View>
            <View style={{paddingTop: 40, position: 'absolute'}}>
                <Image style={styles.images}
                    source={{
                        uri: 'https://ss3a-snakescanner-snake-images.s3.ap-southeast-2.amazonaws.com/' + id +'.png',
                    }}
                /> 
            </View>
            </View>
           </View>
            {this.displaySection("Context", moreInfo)}
            {this.displaySection("Venom", venomousInfo)}
            {this.displaySection("What to do if you get bitten by this snake", this.renderSteps(dangerRating))}
            <Text style={{ fontSize: 15, textDecorationLine: 'underline'}}>Contact Details</Text>
            <Text style={{ color: "black", marginVertical: 8, }}>WIRES (Snake Removalist): 1300 094 737</Text>
            <Text style={{ color: "black", marginVertical: 8, marginBottom: 200 }}>Ambulance: 000 or 112</Text>

         </ScrollView>
     </View>
    );
  }
}


const styles = StyleSheet.create({
  header: {
      backgroundColor: 'transparent',
      height: 55,
      alignContent: 'center',
      justifyContent: 'center',
  },
  back: {
    alignSelf: 'flex-start',
    position: 'absolute',
    left: Dimensions.get('window').width*0.05,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: 'Avenir-Medium',
    alignSelf: 'center',
  },
  images: {
      height: 180,
      width: 180,
      borderRadius: 10,
  },
  commonName: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: 'Avenir-Medium',
    alignSelf: 'flex-start',
  },
  scrollView: {
    padding: 15,
  },
  moreInfo: {
    marginTop: 20,
  },
});

export default SnakeInfo;