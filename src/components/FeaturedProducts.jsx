import React from "react";
import { View, StyleSheet, Dimensions, Text } from "react-native";
import { FontSize } from "../../GlobalStyles";

function FeaturedProducts() {
  return (
    <View style={styles.title}>
      <Text style={styles.textFeaturedProducts}>Featured Products</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    top: 30,
    left: 20,
    width: Dimensions.get("window").width,
    height: 60,
  },
  textFeaturedProducts: {
    fontSize: FontSize.size_sm,
    letterSpacing: 6,
    color: "#1b1a1a",
    width: 300,
    height: 30,
    fontWeight: 600,
  },
  container: {
    width: Dimensions.get("window").width,
    height: "auto",
  },
});

export default FeaturedProducts;
