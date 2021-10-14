import React from 'react';
import {View, StyleSheet, ColorPropType, color } from 'react-native';
import {
Avatar,
Title,
Caption,
Paragraph,
Drawer,
Text,
TouchableRipple,
Switch
} from 'react-native-paper';
import {
    DrawerContentScrollView,
    DrawerItem
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
export function DrawerContent(props){
    return(
        <View style={{flex:1}}>
          <DrawerContentScrollView {...props}>
            <View style={styles.drawerContent}>
                <view style={styles.userInfoSection}>
                  <View>
                    <Avatar.Image
                    source={{

                    }}
                    size={50}
                    />
                  </View>

                </view>
                <view style={{marginLeft: 15, flexDirection:'Column'}}>
                <Title style={styles.title}> Snake Scanner</Title>
                </view>
                <view style={styles.row}>
           <Paragraph> This app will provide you with most Dangerous Ausralian Snake species </Paragraph>
                </view>
            </View>
 
          </DrawerContentScrollView>
          <DrawerSection style= {styles.bottomDrawerSection}>
            <DrawerItem 
            icon={({color, size})} => (
            <Icon 
            name = "exist- to-app"
            color={color}
            size={size}
            />
            )}
            label="Sign Out"
            onPress={() => {}}
            />
          </DrawerSection>
        </View>
    );
}

const styles = StyleSheet.create({
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },

  });