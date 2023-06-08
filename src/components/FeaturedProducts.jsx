import React from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
} from "react-native";
import { FontSize } from "../../GlobalStyles";
import ListScrollView from "./CardProduct";

function FeaturedProducts() {
  return (
    <View style={styles.title}>
        <Text style={styles.featuredProducts}>Featured Products</Text>
        <ListScrollView />
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    top: 50,
    left: 20,
    width: Dimensions.get("window").width,
  },
  featuredProducts: {
    fontSize: FontSize.size_sm,
    letterSpacing: 6,
    color: "#1b1a1a",
    width: 300,
    height: 48,
    fontWeight: 600,
  },
  container: {
    width: Dimensions.get("window").width,
    height: 'auto',
    
  }
});

export default FeaturedProducts;
