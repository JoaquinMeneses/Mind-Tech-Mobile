import React from "react";
import Header from "./../components/Header";
import { View, StyleSheet, Dimensions } from "react-native";
import FiltersStore from "../components/FiltersStore";


function Store() {
  return (

    <View style={styles.containerHome}>
      <Header />
      <FiltersStore />
    </View>
  );
}

const styles = StyleSheet.create({
  
  containerHome: {
    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
    alignItems: "center",
  },
  
});

export default Store;
