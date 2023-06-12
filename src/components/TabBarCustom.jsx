import * as React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function MyTabBar({ state, descriptors, navigation }) {
    return (
      <View style={styles.containerTab}>
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
          const isStoreRoute = route.name === 'Store';
  
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

        const buttonStyles = [
          // Estilos comunes a todos los botones
          {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 10,
          },
          // Estilos adicionales para el botón "Store"
          isStoreRoute && {
            height: 75,
            width: 55, 
            marginTop: -25, 
            borderRadius: "50%",
            
            backgroundColor: isFocused ? "#000" : "#000",
            borderColor: "#fff",
            borderWidth: 2,
          },
        ];
        
          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={buttonStyles}
            >
                <Icon
              name={iconName}
              size={28}
              color={isFocused ? '#00a524da' : (isStoreRoute ? '#fff' : '#222')}
              style={{textAlign: 'center'}}
            />
            
            </TouchableOpacity>
          );
        })}
      </View>)}

  function getIconName(routeName) {
    // Iconos del TabBar
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

  const styles = StyleSheet.create({
    containerTab:{
      flexDirection: "row",
      height: 60,
      alignItems: "center",
      borderTopEndRadius: 30,
      borderTopStartRadius: 30,
      backgroundColor: "#d9d9d9",
      position: "absolute",
      bottom: 0,
      width: "100%",
      elevation: 5, 
      shadowColor: "#000", 
      shadowOpacity: 0.5, 
      shadowRadius: 5, 
      shadowOffset: {
        width: 0,
        height: -2,
      },
    },
  })

export default MyTabBar

