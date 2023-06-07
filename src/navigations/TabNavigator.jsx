import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomNavigation } from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Home from '../screens/Home';
import { CommonActions } from '@react-navigation/native';


const Tab = createBottomTabNavigator();

export default function TabNavigator() {

    
  return (
    <Tab.Navigator 
   
        screenOptions={{
            headerShown: false,   
        }}
        
      
      tabBar={({ navigation, state, descriptors, insets }) => (

        <BottomNavigation.Bar
            
            style={styles.tab}
            activeColor='#00a524da' 
        
            navigationState={state}
            safeAreaInsets={insets}
            onTabPress={({ route, preventDefault }) => {
                const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
                });

            if (event.defaultPrevented) {
              preventDefault();
            } else {
             navigation.dispatch({
                ...CommonActions.navigate(route.name, route.params),
                target: state.key,
              });
            }
          }}
          
          
          renderIcon={({ route, focused, color }) => {
            const { options } = descriptors[route.key];
            if (options.tabBarIcon) {
              return options.tabBarIcon({ focused, color, size: 24 });
            }

            return null;
          }}
          getLabelText={({ route }) => {
            const { options } = descriptors[route.key];
            const label =
              options.tabBarLabel !== undefined
                ? options.tabBarLabel
                : options.title !== undefined
                ? options.title
                : route.title;

            return label;
          }}
          
        />
      )}
    >
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
        
          tabBarIcon: ({ color, size }) => {
            return <Icon name="home-outline" size={size} color={color} />;
          },
        }}
      />
      
      <Tab.Screen
        name="Search"
        component={Home}
        options={{
          tabBarIcon: ({ color, size }) => {
            return <Icon name="magnify" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="Store"
        component={Home}
        style={styles.store}
        options={{
            tabBarIcon: ({ color, size, focused }) => (
              <View style={[styles.storeButton, focused && styles.storeButtonFocused]}>
                <Icon name="store-outline" size={size} color={focused ? '#00a524da' : '#ffffff'} />
              </View>
            ),
          }}
      />
      <Tab.Screen
        name="Favourites"
        component={Home}
        options={{
         
          tabBarIcon: ({ color, size }) => {
            return <Icon name="heart-outline" size={size} color={color} />;
          },
        }}
      />
      <Tab.Screen
        name="User"
        component={Home}
        options={{
          
          tabBarIcon: ({ color, size }) => {
            return <Icon name="account-outline" size={size} color={color} />;
          },
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
    tab: {
        height: 60,
        backgroundColor: "#d9d9d9",
        borderTopLeftRadius: 20, 
        borderTopRightRadius: 20,
    },
    storeButton: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: '#000000',
        justifyContent: 'center',
        alignItems: 'center',
        top: -30,
        position: 'absolute',
        zIndex: 0,
        borderWidth: 3,
        borderColor: '#fff',
        
      },
      storeButtonFocused: {
        backgroundColor: '#222222',
      },
    
})

