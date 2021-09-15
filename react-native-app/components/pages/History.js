
import React, { Component } from 'react';
import {  StyleSheet,
  View,
  Text,
  ScrollView, } from 'react-native';
import InfoCard from '../elements/InfoCard';
import { AntDesign } from '@expo/vector-icons';
 
class History extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
 
  render() {
    return(
    
      <ScrollView>
    <View style={styles.container}>
    <View><Text>------------------------------------</Text></View>
    <View>
 
        <Text style={styles.heading} ><AntDesign name="questioncircleo" size={24} color="black" />  Help</Text>
    </View>
    <View><Text>------------------------------------</Text></View>
    
    
    <View style={styles.info}>
      <Text style={styles.infoText}>    App instructions.....</Text>
    </View>
    <View style={styles.infoCard}>
       <InfoCard/>
    </View>
    </View>
    </ScrollView>
    )
  }
}
 
const styles = StyleSheet.create({
  container: {
      flex: 1,
      marginVertical: 20,
      alignItems : "center",
      alignContent: "center"
  },
  
  heading:{
      fontSize: 25,
      
  },
  info: {
 
      width: 320,
      height: 250,
      backgroundColor: 'grey',
      borderRadius: 20,
      alignContent: 'center',
      justifyContent: 'center',
      shadowColor: '#37373737',
      shadowOffset: { width: 0, height: 3, },
      shadowOpacity: 1,
      shadowRadius: 5,
      margin: 15,
    
  },
  infoText:{
    alignItems : "center",
    alignContent: "center",
    fontSize: 20,
  },
  infoCard:{
    marginVertical: 20,
    borderColor:"skyblue",
    alignItems : "center",
    alignContent: "center"
  }
})
 
export default History;
