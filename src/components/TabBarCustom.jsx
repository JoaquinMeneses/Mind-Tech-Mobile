import * as React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';



function MyTabBar({ state, descriptors, navigation }) {
    return (
      <View style={{ flexDirection: 'row', height: 60, alignItems: 'center', borderTopEndRadius: 30, borderTopStartRadius: 30, backgroundColor: "#d9d9d9"}}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

              const iconName = getIconName(route.name);
  
          const isFocused = state.index === index;
  
          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });
  
            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };
  
          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1}}
            >
                <Icon
              name={iconName}
              size={28}
              color={isFocused ? '#00a524da' : '#222'}
              style={{textAlign: 'center'}}
            />
            
            </TouchableOpacity>
          );
        })}
      </View>)}

function getIconName(routeName) {
    // Define los nombres de los iconos según el nombre de la ruta
    switch (routeName) {
      case 'Home':
        return 'home-outline';
      case 'Search':
        return 'magnify';
      case 'Store':
        return 'store-outline';
      case 'Favorites':
        return 'heart-outline';
      case 'User':
        return 'account-outline';
      default:
        return '';
    }
  }

export default MyTabBar

