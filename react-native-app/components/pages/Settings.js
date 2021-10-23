import React, { Component } from 'react';
import { View, Button, Text, StyleSheet, StatusBar, useColorScheme, TouchableOpacity, Dimensions, ScrollView, Keyboard, TouchableWithoutFeedback} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from "@expo/vector-icons";
import TopBar from '../menu/TopBar';

import DropDownPicker from 'react-native-dropdown-picker';
import { CreditCardInput, LiteCreditCardInput } from "react-native-credit-card-input";


class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
    };
  }

  updateActivityStatus = () => {
    this.setState({
      active: !this.state.active,
    })
  }

  renderActivityStatus = () => {
    if (this.state.active) {
      return <Text style={styles.statusActive}>Active</Text>
    } else {
      return <Text style={styles.statusInactive}>Inactive</Text>
    }
  }

  render() {
    const { open, value, items } = this.state;

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
            <Text style={styles.text}>Settings</Text>
            <TouchableOpacity style={styles.back} onPress={() => this.props.navigation.goBack()}>
                <MaterialIcons name="arrow-back" size={28} color="white" />
            </TouchableOpacity>
         </View>
         </LinearGradient>
         <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
         <View style={styles.container}>
             <Text style={styles.settingsText}>Select your country:</Text>
             <Text style={styles.settingsSubText}>Ensures the relevant snake identification model is used for your country throughout the application.</Text>
              <DropDownPicker
                open={open}
                value={'au'}
                items={[{label: 'Australia', value: 'au',}]}
                setOpen={this.setOpen}
                setValue={this.setValue}
                setItems={this.setItems}
                disabled={true}
                style={styles.picker}
              />

            <Text style={styles.settingsText2}>Premium account:</Text>
            <Text style={styles.settingsSubText}>SnakeScanner offers a premium subscription service that unlocks a map of recent snake sightings as well as giving you access to a much larger database of snakes.</Text>
            <View style={{flexDirection: 'row', marginBottom: 20,}}>
              <Text style={styles.current}>Current status:</Text>
                {this.renderActivityStatus()}
            </View>
            <LiteCreditCardInput onChange={this._onChange} style={styles.ccInput}/>
            <TouchableOpacity style={styles.buttonView}
            onPress={() => this.updateActivityStatus()}>
              <LinearGradient
              colors={['#3BB44A', '#016937']}
              start={{ x: -0.65, y: 0.65 }}
              end={{ x: 1, y: 1 }}
              locations={[0,1]}
              style={styles.button}>
                <Text style={styles.paynow}>Pay Now</Text>
              </LinearGradient>
            </TouchableOpacity>
         </View>
         </TouchableWithoutFeedback>
     </View>
    );
  }
}


const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  buttonView: {
    marginTop: 30,
  },
  current: {
    marginTop: 20,
    fontSize: 16,
    fontFamily: "Avenir-Medium",
  },
  button: {
    borderRadius: 10,
    width: 100,
    height: 43,
  },
  paynow: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    color: "white",
    fontFamily: "Avenir-Medium",
    bottom: 8,
  },
  statusInactive: {
    color: 'red',
    marginTop: 20,
    fontSize: 16,
    fontFamily: "Avenir-Medium",
    marginLeft: 20,
  },
  statusActive: {
    color: 'green',
    marginTop: 20,
    fontSize: 16,
    fontFamily: "Avenir-Medium",
    marginLeft: 20,
  },
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
  picker: {
    marginTop: 20,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
    fontFamily: 'Avenir-Medium',
    alignSelf: 'center',
  },
  settingsText: {
    fontSize: 18,
    fontFamily: "Avenir-Medium",
  },
  settingsText2: {
    fontSize: 18,
    fontFamily: "Avenir-Medium",
    marginTop: 50,
  },
  settingsSubText: {
    fontSize: 14,
    color: 'grey',
    fontFamily: "Avenir-Medium",
    marginTop: 10,
  },
});

export default Settings;