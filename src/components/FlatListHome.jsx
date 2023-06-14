import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { FontSize, FontFamily } from "../../GlobalStyles";
import { Card, IconButton, Text } from "react-native-paper";
import SearchBar from "./SearchBar";
import CarouselHeader from "./CarouselHome";
import FeaturedProducts from "./FeaturedProducts";
import { useNavigation } from "@react-navigation/native";
import useStore from "../store/store";

const ListScrollView = () => {
  const allProducts = useStore((state) => state.allProducts);
  const getAllProducts = useStore((state) => state.getAllProducts);
  const numColumns = 2;
  const [favoriteItems, setFavoriteItems] = useState([]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const maxLength = 40;

  const shortenText = (text) => {
    if (text.length <= maxLength) {
      return text; 
    } else {
      return text.substring(0, maxLength) + "..."; 
    }
  };


  useEffect(() => {
    getAllProducts();
    console.log(allProducts);
  }, [getAllProducts]);

  useEffect(() => {
    if (allProducts?.length > 0) {
      setLoading(false);
    }
  }, [allProducts]);

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

  const productsOrdered = allProducts.sort(
    (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  );

  // Renderiza últimos 6 productos
  const featuredProducts = productsOrdered.slice(0, 6);

  const formatPrice = (price) => {
    return price.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });
  };

  const renderItem = ({ item }) => {
    const isFavorite = favoriteItems.includes(item._id);

    return (
      <View style={styles.item}>
        <Card style={styles.card}>
          <TouchableOpacity
            style={styles.coverTouchable}
            onPress={() => handleCoverPress(item)}
          >
            <Card.Cover style={styles.cover} source={{ uri: item.images[0] }} />
          </TouchableOpacity>
          <Card.Content style={styles.title}>
            <Text style={styles.name}>{shortenText(item.name)}</Text>
          </Card.Content>
          <View>
            <Text style={styles.price}>{formatPrice(item.price)}</Text>
            <IconButton
              style={styles.heartIcon}
              icon={isFavorite ? "heart" : "heart-outline"}
              color={isFavorite ? "#FF0000" : "#000000"}
              size={20}
              onPress={() => toggleFavorite(item._id)}
            />
          </View>
        </Card>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={featuredProducts}
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
      )}
      
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    height: 210,
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
    height: "60%",
  },
  heartIcon: {
    top: -52,
    left: 107,
  },
  title: {
    textAlign: "left",
    paddingBottom: 1,
    alignItems: "flex-start",
    position: "absolute",
    top: 124,
  },
  coverTouchable: {
    height: 200,
  },
  name: {
    fontSize: 11,
    fontWeight: "500",
    fontFamily: FontFamily.poppinsRegular,
    marginTop: 5,
  },
  price: {
    fontSize: 15,
    top: -18,
    left: 15,
    fontFamily: FontFamily.poppinsMedium,
    fontWeight: "bold",
  },
});

export default ListScrollView;
