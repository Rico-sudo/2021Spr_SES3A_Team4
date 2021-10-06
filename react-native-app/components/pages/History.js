
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
    <View><Text>................................................................</Text></View>
    <View>
 
        <Text style={styles.heading} ><AntDesign name="customerservice" size={24} color="grey" />  Help</Text>
    </View>
    <View><Text>................................................................</Text></View>
    
    
    <View style={styles.info}>
      <Text style={styles.infoText}>    App instructions.....</Text>
    </View>
    <View style={styles.infoCard}>
       <InfoCard/>
    </View>
    <View style={styles.infoCard}>
       <InfoCard/>
    </View>
    <View style={styles.infoCard}>
       <InfoCard/>
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
      color: 'dimgrey'
      
  },
  info: {
 
      width: 325,
      height: 120,
      backgroundColor: 'white',
      borderRadius: 20,
      alignContent: 'center',
      justifyContent: 'center',
      shadowColor: '#37373737',
      shadowOffset: { width: 0, height: 3, },
      shadowOpacity: 5,
      shadowRadius: 5,
      margin: 30,
    
  },
  infoText:{
    alignItems : "center",
    alignContent: "center",
    fontSize: 20,
  },
  infoCard:{
    marginVertical: 30,
    borderColor:"skyblue",
    alignItems : "center",
    alignContent: "center"

  }
})
 
export default History;
