import React, { Component, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from "@expo/vector-icons";

class TabBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: this.props.page,
    };
    }

  onClickTab = (tab) => {
      this.props.passToParent(tab); 
  }

  render() {
    return (
        <View style={styles.tabBar}>
            <View style={styles.textHolder}>
                <TouchableOpacity onPress={() => this.onClickTab(0)}>
                    {/* <Text style={[styles.search, {fontWeight: this.props.selectedPage === 0 && "bold" || "normal"}]}>Search</Text> */}
                    <MaterialIcons style={styles.search} name="search" size={35} color="white" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.onClickTab(1)}>
                    <Image style={styles.camera} source={require('../../assets/snakescannerTabIcon.png')}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.onClickTab(2)}>
                    <MaterialIcons style={styles.history} name="history" size={35} color="white" />
                </TouchableOpacity>
            </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    tabBar: {
        height: 49,
        backgroundColor: 'transparent',
    },
    textHolder: {
        flex: 1,
        flexDirection: 'row',
        paddingTop: 11,
        alignItems: 'center',
        justifyContent: "space-between",
    },
    camera: {
        flex: 2,
        height: 38,
        width: 38,
    },
    search: {
        flex: 2,
        paddingLeft: 53,
        marginTop: 2,
    },
    history: {
        flex: 2,
        paddingRight: 53,
        marginTop: 2,
    }
});

export default TabBar;
