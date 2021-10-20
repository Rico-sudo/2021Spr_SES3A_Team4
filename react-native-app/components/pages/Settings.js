import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, useColorScheme, TouchableOpacity, Dimensions, ScrollView} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialIcons } from "@expo/vector-icons";
import TopBar from '../menu/TopBar';
import {Picker} from '@react-native-picker/picker';


class Settings extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
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
         <ScrollView>
             <Text>(Placeholder picker - changing this later)</Text>
            <Picker>
                <Picker.Item label="Australia" value="aus" />
                <Picker.Item label="New Zealand" value="nz" />
                <Picker.Item label="Brazil" value="br" />
                <Picker.Item label="India" value="in" />
                <Picker.Item label="Italy" value="it" />
            </Picker>
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
});

export default Settings;