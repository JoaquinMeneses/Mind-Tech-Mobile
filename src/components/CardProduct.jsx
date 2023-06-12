import React, { useState } from "react";
import { View, StyleSheet, Dimensions, FlatList } from "react-native";
import { FontSize, FontFamily } from "../../GlobalStyles";
import { Card } from "react-native-paper";
import { IconButton } from "react-native-paper";

//Lista de productos de prueba
const ListScrollView = () => {
  const data = [
    { id: 1, title: "Headphones", price: "$300.00" },
    { id: 2, title: "Monitor", price: "$300.00" },
    { id: 3, title: "Notebook", price: "$300.00" },
    { id: 4, title: "Headphones", price: "$300.00" },
    { id: 5, title: "Monitor", price: "$300.00" },
    { id: 6, title: "Notebook", price: "$300.00" },
  ];
  const [numColumns, setNumColumns] = useState(2);

  const renderItem = ({ item }) => {
    return (
      <View style={styles.item}>
        <Card style={styles.card}>
          <Card.Cover
            style={styles.cover}
            source={{ uri: "https://picsum.photos/700" }}
          />
          <Card.Title
            style={styles.title}
            title={item.title}
            subtitle={item.price}
          />
          <IconButton
            style={styles.heart}
            icon="heart-outline"
            iconColor={"#000"}
            size={20}
            onPress={() => console.log("Pressed")}
          />
        </Card>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.gridContainer}
        key={`flatlist-${numColumns}`}
        numColumns={numColumns}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 200,
    width: 154,
  },
  container: {
    flex: 1,
    marginBottom: 150,
  },
  gridContainer: {
    padding: 1,
  },
  item: {
    marginBottom: 20,
    width: Dimensions.get("window").width / 2 - 16,
  },

  cover: {
    height: "70%",
  },

  heart: {
    top: -66,
    left: 104,
  },
  title: {
    fontSize: FontSize.size_mini,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "800",
    textAlign: "left",
    paddingBottom: 15,
  },
});

export default ListScrollView;
