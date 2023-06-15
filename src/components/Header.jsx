import React from 'react'
import { StyleSheet, View, Dimensions, Text } from 'react-native'
import { Color, FontSize } from "../../GlobalStyles";
import CartHeader from './CartHeader';


function Header() {
  return (
    <View style={styles.headerContainer}>
        <Text style={styles.mindtech}>MINDTECH</Text>
        <CartHeader/>
    </View>
  )
}
const styles = StyleSheet.create({
    headerContainer: {
      width: Dimensions.get('window').width,
      top: 50,
      paddingLeft: 20,
    },
    mindtech: {
        letterSpacing: 8,
        width: 278,
        height: 79,
        fontSize: FontSize.size_base,
        color: Color.black,
        fontWeight: 700,
      },
})

export default Header