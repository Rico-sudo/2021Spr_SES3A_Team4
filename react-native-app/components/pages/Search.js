import React, { useState, useEffect, Component } from 'react';
import { SafeAreaView, StyleSheet,
View, Text, ScrollView, Image,
StatusBar, FlatList, TouchableOpacity, 
TextInput } from 'react-native';

import InfoCard from '../elements/InfoCard';
import SearchBar from '../elements/SearchBar';
import { MaterialIcons} from '@expo/vector-icons';

export default function Search(){
  const [value, setValue] = useState()
  function updateSearch(value) {
      //do your search logic or anything
      console.log(value)
  }
  return(
  <View style={styles.container}>
          <View style={{height: '20%',backgroundColor: "#F2D88F", borderRadius: 10, }}>
        
        <Image
          style={{ marginTop: '15%', marginLeft: '5%' }}
          source={require('')} />
            <SearchBar
                value={value}
                updateSearch={updateSearch}
                    style={{ marginTop: '8%' }}
                />
            </View>

        </View>
    )
}
 

//class Search extends Component {
  //constructor(props) {
   // super(props);
    //this.state = {
   // };
 // }

  

  render();
  {
   // return (
      
     // <view>  
       // <InfoCard /><InfoCard /><InfoCard /><InfoCard />
      

      //</view>
    //)  
  };

//

const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
}); 

//export default Search;