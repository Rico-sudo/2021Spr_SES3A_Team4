import React, { useState, useEffect, Component } from 'react';
import {  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  FlatList,
  TouchableOpacity,
  TextInput, Image } from 'react-native';
  

export default function SearchBar({value, updateSearch, style}){
  const [query, setQuery] =  useState();
  const [error, setError] = useState()
   return (
      <View style={styles.searchBar}>
        <View style={styles.searchContainer}>
         <View style={styles.vwSearch}>
           <Image
             style={styles.icSearch}
             source={require('')} />
         </View>
         <TextInput
                    value={query}
                    placeholder="Search"
                    style={styles.textInput}
                    onChangeText={(text) => {
                        var letters = /^$|^[a-zA-Z._\b ]+$/;
                        if (text.length > 12)
                            setError("Query too long.")
                        else if (text.match(letters)) {
                            setQuery(text)
                            updateSearch(text)
                            if (error)
                                setError(false)
                        }
                        else setError("Please only enter alphabets")
                    }}
                />
                {
                    query ?
                        <TouchableOpacity
                            onPress={() => setQuery('')}
                            style={styles.vwClear}>
                            <Image
                                style={styles.icClear}
                                source={require('')} />
                        </TouchableOpacity>
                        : <View style={styles.vwClear} />
                }
        </View>
        {
                error &&
                <Text style={styles.txtError}>
                    {error}
                </Text>
            }
      </View>
    )
}
class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }


  render() {
    //return (
    //  <View style={styles.searchBar}>
    //    <Text> SearchBar </Text>
    //  </View>
    //);
  }
}
export default SearchBar;

const styles = StyleSheet.create({
    searchBar: {
      height: 80,
      alignItems: 'center',
        //width: 363,
        //height: 41,
        //backgroundColor: '#FEFEFE',
        //borderRadius: 20,
        //alignContent: 'center',
        //justifyContent: 'center',
        //shadowColor: '#37373737',
        //shadowOffset: { width: 0, height: 3, },
        //shadowOpacity: 1,
        //shadowRadius: 5,
    },
    searchContainer:
    {
        backgroundColor: 'white',
        width: '90%',
        height: 40,
        flexDirection: 'row'

    },
    txtError: {
      marginTop: '2%',
      width: '89%',
      color: 'white',

    },
    vwClear: {
      flex: 0.2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    textInput: {
      // backgroundColor: 'green',
      flex: 1,
    },
    vwSearch: {
    flex: 0.2,
    justifyContent: 'center',
    alignItems: 'center',
    // width: 40,
    // backgroundColor: 'red'
    },
    icSearch: {
    height: 18, width: 18
    },
});

export default SearchBar;
