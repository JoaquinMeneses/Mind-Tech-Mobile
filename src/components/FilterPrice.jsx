import React from "react";
import { View, StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";


function FilterPrice() {

  return (
    <View style={styles.containerFilter}>
      <IconButton
        icon="filter-variant"
        iconColor={"#000"}
        size={25}
        onPress={console.log("pressed filter")}
      />
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
  containerFilter: {
    alignItems: 'flex-end',
    
  },
  badge: {
    top: -52,
    right: 17,
  },
});

export default FilterPrice;
