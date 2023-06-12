import React from "react";
import Header from "./../components/Header";
import { View, StyleSheet, Dimensions } from "react-native";
import TabListStore from "../components/TabListStore";


function Store() {
  return (

    <View style={styles.containerHome}>
      <Header />
      <TabListStore />
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
