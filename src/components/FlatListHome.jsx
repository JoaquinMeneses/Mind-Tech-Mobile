import React, { useState, useEffect } from "react";
import { View, StyleSheet, Dimensions, FlatList, TouchableOpacity } from "react-native";
import { FontSize, FontFamily } from "../../GlobalStyles";
import { Card, IconButton } from "react-native-paper";
import SearchBar from "./SearchBar";
import CarouselHeader from "./CarouselHome";
import FeaturedProducts from "./FeaturedProducts";
import { useNavigation } from "@react-navigation/native";
import useStore from '../store/store';

const ListScrollView = () => {

  const allProducts = useStore((state) => state.allProducts);
  const getAllProducts = useStore((state) => state.getAllProducts);
  const numColumns = 2;
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
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
        contentContainerStyle={styles.gridContainer}
        key={`flatlist-${numColumns}`}
        numColumns={numColumns}
        ListHeaderComponent={
          <>
            <SearchBar />
            <CarouselHeader />
            <FeaturedProducts />
          </>
        }
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
    marginBottom: 140,
    paddingTop: 10,
    alignItems: "center",
    width: Dimensions.get("window").width,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  gridContainer: {
    padding: 1,
    alignItems: "center",
  },
  item: {
    width: Dimensions.get("window").width / 2 - 30,
    height: 210,
    margin: 10,
  },
  cover: {
    height: "70%",
  },
  heartIcon: {
    top: -40,
    left: 107,

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

export default ListScrollView;
