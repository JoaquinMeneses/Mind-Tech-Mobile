import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/Home";
import SignIn from "../screens/SignIn";
import Search from "../screens/Search";
import MyTabBar from "../components/TabBarCustom";

const Tab = createBottomTabNavigator();

export default function TabNavigator2() {
  return (
    <Tab.Navigator
      tabBar={(props) => <MyTabBar {...props} />} 
    >
      <Tab.Screen name="Home" component={Home} options={{headerShown: false}}/>
      <Tab.Screen name="Search" component={Search} options={{headerShown: false}}/>
      <Tab.Screen name="Store" component={Home} options={{headerShown: false}}/>
      <Tab.Screen name="Favorites" component={Home} options={{headerShown: false}}/>
      <Tab.Screen name="User" component={SignIn} options={{headerShown: false}}/>
    </Tab.Navigator>
  );
}