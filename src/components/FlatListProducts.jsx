import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, FlatList, TouchableOpacity } from "react-native";
import { FontSize, FontFamily } from "../../GlobalStyles";
import { Card, IconButton  } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import useStore from '../store/store';

const ListScrollProducts = () => {

  const allProducts = useStore((state) => state.allProducts);
  const getAllProducts = useStore((state) => state.getAllProducts);
  const numColumns= 2;
  const [favoriteItems, setFavoriteItems] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    getAllProducts();
    console.log(allProducts)
  }, [getAllProducts]);

  const toggleFavorite = (itemId) => {
    if (favoriteItems.includes(itemId)) {
      setFavoriteItems(favoriteItems.filter((item) => item !== itemId));
    } else {
      setFavoriteItems([...favoriteItems, itemId]);
    }
  };

  const handleCoverPress = (item) => {
      console.log(item);
      navigation.navigate("Details", { item: item });
  };
  

  const renderItem = ({ item }) => {
    const isFavorite = favoriteItems.includes(item._id);
    console.log(item._id)
    return (
      <View style={styles.item}>
        <Card style={styles.card}>
        <TouchableOpacity style={styles.coverTouchable} onPress={() => handleCoverPress(item)}>
          <Card.Cover
            style={styles.cover}
            source={{ uri: item.images[0] }}
          />
          </TouchableOpacity>

          <Card.Title
            style={styles.title}
            title={item.name}
            subtitle={item.price}
          />

          <IconButton
            style={styles.heartIcon}
            icon={isFavorite ? "heart" : "heart-outline"}
            color={isFavorite ? "#FF0000" : "#000000"}
            size={20}
            onPress={() => toggleFavorite(item._id)}
          />
        </Card>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={allProducts}
        horizontal={false}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
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
    marginBottom: 60,
    paddingTop: 10,
    left: 8,
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

  heartIcon: {
    top: -54,
    left: 107,
  },
  cartIcon: {
    top: -102,
    left: 80,
  },
  title: {
    fontSize: FontSize.size_mini,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "800",
    textAlign: "left",
    paddingBottom: 15,
    alignItems: 'flex-start',
    position: 'absolute',
    top: 144,
  },
  coverTouchable: {
   height: 200,
  },
});

export default ListScrollProducts;
