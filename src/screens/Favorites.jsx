//My favourites
import React from "react";
import Header from "./../components/Header";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { Color, FontSize } from "../../GlobalStyles";
import ListScrollProducts from "../components/FlatListProducts";


function Favorites() {
  return (
    <View style={styles.containerFavorites}>
      <Header />
      <View style={styles.containerFavoritesHeader}>
        <Text style={styles.titleFavorites}>MY FAVOURITES</Text>
      </View>
        <ListScrollProducts />
      
    </View>
  );
}

const styles = StyleSheet.create({
  titleFavorites: {
    letterSpacing: 8,
    width: Dimensions.get("window").width,
    height: 79,
    fontSize: FontSize.size_base,
    color: Color.white,
    fontWeight: 700,
    top: 35,
    textAlign: "center",
  },
  containerFavoritesHeader: {
    height: 90,
    width: Dimensions.get("window").width,
    backgroundColor: "black",
    
  },
  iconHeart: {
    textAlign: "right",
    top: -100,
    left: 25,
  },
  containerFavorites: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    alignItems: "center",
  },
  
});

export default Favorites;
