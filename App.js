/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */

import React, {Component} from 'react';
import {NavigationContainer, DrawerActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator, DrawerItem} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

// Bottom tab Screens
import HomeScreen from './src/bottomtab-screens/home';
import SimpleCounterScreen from './src/bottomtab-screens/simpleCounter';
import RenderDataScreen from './src/bottomtab-screens/renderData';
import DetailScreen from './src/bottomtab-screens/detail';

// Drawer screens
import ProfileScreen from './src/drawer-screens/edit-profile';

import { Text, View, Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import {globalStyling as gs} from './src/styles/global-styling';

const drawer = createDrawerNavigator();
const bottomTab = createBottomTabNavigator();

// Must make the stack for each parent feature
const homeStack = createStackNavigator();
const simpleCounterStack = createStackNavigator();
const renderDataStack = createStackNavigator();
const profileStack = createStackNavigator();

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // if needed
      num: 0, 
    }
  }

  CustomDrawer = (props) => {
    return (
      <View>
        <View style={[
          gs.profileContainer, {
            backgroundColor: "#7ee0ce"
          }
        ]}>
          <Image source={require("./src/images/seele.jpg")}
          style={{
            width: 80,
            height: 80,
            borderRadius: 100,
            marginBottom: 10,
          }}
          />
          <Text style={{
            fontSize: 20
          }}>Seele Vollerei</Text>
          <TouchableOpacity
          style={{
            marginTop: 20,
            backgroundColor: "#40ad42",
            borderRadius: 1000,
            paddingVertical: 5,
            paddingHorizontal: 15,
          }}>
            <Text style={{
              color: "white",
              fontWeight: "bold"
            }}>Edit Profile</Text>
          </TouchableOpacity>
        </View>

        {/* CUSTOM DRAWER ITEM */}
        <TouchableOpacity style={gs.drawerItem}
        onPress={() => props.navigation.navigate("Home")}>
          <Text>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={gs.drawerItem}
        onPress={() => props.navigation.navigate("Simple Counter")}>
          <Text>Simple Counter</Text>
        </TouchableOpacity>
        <TouchableOpacity style={gs.drawerItem}
        onPress={() => props.navigation.navigate("Profile")}>
          <Text>View Profile</Text>
        </TouchableOpacity>

        {/* LIBRARY DRAWER ITEM */}
        {/* <DrawerItem
        label="Home"
        onPress={() => props.navigation.navigate("Home")}
        />
        <DrawerItem
        label="Simple Counter"
        onPress={() => props.navigation.navigate("Simple Counter")}
        /> */}
      </View>
    )
  }

  // DRAWER TOGGLER
  leftToggle = (props) => {
    return (
      <View style={{marginLeft: 20}}>
        <TouchableOpacity
        style={{width: 40,}}
        onPress={ () => props.navigation.openDrawer() }
        >
          <Image 
          style={{
            width: 20,
            height: 20,
          }}
          source={require("./src/images/drawer.png")} />
        </TouchableOpacity>
      </View>
    )
  }

  backButton = (props) => {
    const backString = "<="
    return (
      <View style={{marginLeft: 10}}>
        <TouchableOpacity
        style={{
          width: 40,
          height: 40,
          flex: 0,
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: 1000
        }} onPress={() => props.navigation.navigate("Home")}>
          {/* <Text style={{
            fontSize: 30,
          }}>{backString}</Text> */}
          <Image  
          style={{
            width:40,
            height:40
          }}
          source={require('./src/images/back-icon.png')}
          />
        </TouchableOpacity>
      </View>
    )
  }

  // BottomTab component
  bottomTabComponent = (props) => {
    return (
      <bottomTab.Navigator
      tabBarOptions={{
        labelStyle:{
          marginBottom: 10,
          fontSize: 15,
          fontWeight: "bold",
        },
        tabStyle: {
          backgroundColor: "white",
          borderstyle: "solid",
          borderStartColor: "black"
        },
        activeBackgroundColor: "blue",
      }}>
        <bottomTab.Screen name="Home"
        component={this.homeStackScreen}/>
        <bottomTab.Screen name="Simple Counter"
        component={this.counterStackScreen}/>
        <bottomTab.Screen name="Render Data"
        component={this.renderDataStackScreen}/>
      </bottomTab.Navigator>
    )
  }

  // ONE BY ONE
  /**
  * Each parent feature has one stack, and sub feature from the parent feature
  * needs to be in one stack with the parent, for example in this render data
  * practice.
  */
  profileStackScreen = (props) => {
    return (
      <profileStack.Navigator>
        <profileStack.Screen
        options={{
          headerLeft: () => (this.backButton(props)),
        }}
        name="Profile" component={ProfileScreen} />
      </profileStack.Navigator>
    )
  }

  homeStackScreen = (props) => {
    return (
      <homeStack.Navigator>
        <homeStack.Screen
        options={{
          headerLeft: () => (this.leftToggle(props)),
        }}
        name="Home Screen" component={HomeScreen}/>
      </homeStack.Navigator>
    )
  }

  counterStackScreen = (props) => {
    return (
      <simpleCounterStack.Navigator>
        <simpleCounterStack.Screen
        options={{
          headerLeft: () => (this.leftToggle(props)),
        }}
        name="Simple Counter Screen" component={SimpleCounterScreen} />
      </simpleCounterStack.Navigator>
    )
  }

  //Detail gets in this stack because it is part of Render Data
  renderDataStackScreen = (props) => {
    return (
      <renderDataStack.Navigator>
        <renderDataStack.Screen
        options={{
          headerLeft: () => (this.leftToggle(props)),
        }}
        name="Render Data Screen" component={RenderDataScreen} />
        <renderDataStack.Screen name="Detail Screen" component={DetailScreen} />
      </renderDataStack.Navigator>
    )
  }

  render() {
    return (
      <NavigationContainer>
        {/* <stack.Navigator screenOptions={{
          headerStyle: {
            backgroundColor:"#009387",
          },
          headerTintColor: "white",
          headerTitleStyle: "bold",
        }}>
          <stack.Screen name="Home" component={Home}/>
          <stack.Screen name="Simple Counter" component={SimpleCounter} />
          <stack.Screen name="Render Data" component={RenderData} />
          <stack.Screen name="Detail" component={Detail}/>
        </stack.Navigator> */}
        <drawer.Navigator
        drawerContent={props => <this.CustomDrawer {...props} />}>
          <drawer.Screen name="bottom-tab"
          component={this.bottomTabComponent}/>
          <drawer.Screen name="Profile"
          component={this.profileStackScreen}/>
        </drawer.Navigator>
      </NavigationContainer>
    )
  };
};