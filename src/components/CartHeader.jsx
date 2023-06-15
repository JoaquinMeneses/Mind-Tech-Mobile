import React from "react";
import { View, StyleSheet } from "react-native";
import { IconButton, Badge } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

function CartHeader() {
  const navigation = useNavigation()

  const handleGoToMyCart = () => {
    navigation.navigate("MyCart");
  };

  return (
    <View style={styles.cart}>
      <IconButton
        icon="cart-outline"
        iconColor={"#000"}
        size={20}
        onPress={() => handleGoToMyCart()}
      />
      <Badge style={styles.badge}>3</Badge>
    </View>
  );
}
const styles = StyleSheet.create({
  cartChild: {
    width: 61,
    height: 55,
    left: 0,
    position: "absolute",
  },
  cart: {
    top: -15,
    left: 310,
    width: 62,
    height: 65,
    position: "absolute",
  },
  badge: {
    top: -52,
    right: 17,

  },
});

export default CartHeader;
