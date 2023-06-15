import React from "react";
import Header from "./../components/Header";
import { View, StyleSheet, Dimensions} from "react-native";
import ListScrollView from "../components/FlatListHome";

function Home() {
  return (
    <View style={styles.containerHome}>
      <Header />
      <ListScrollView/>
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

export default Home;
