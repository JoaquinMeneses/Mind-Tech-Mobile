import React, { useState, useEffect } from "react";
import SearchBar from "./../components/SearchBar";
import Header from "./../components/Header";
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { FontFamily } from "../../GlobalStyles";
import { Card, IconButton, Text } from "react-native-paper";
import { useRoute, useNavigation } from "@react-navigation/native";
import useStore from "../store/store";

function Search() {
  const route = useRoute();
  const { allProducts, getAllProducts } = useStore();
  const numColumns = 2;
  const [favoriteItems, setFavoriteItems] = useState([]);
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const maxLength = 40;

  useEffect(() => {
    if (!allProducts?.length) {
      getAllProducts();
    }
  }, []);

  const filterProducts = (products) => {
    if(route?.params?.searchQuery == undefined){
      return [];
    } else {
    return products?.filter((product) =>
      product?.name?.toLowerCase()?.includes(route?.params?.searchQuery?.toLowerCase())
    );
  }
  };


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
    <View>
      <Header />
      <SearchBar />
      {filterProducts(allProducts)?.length == 0 || route?.params?.searchQuery == undefined ? <Text style={styles.textResults}>No results found, try another term</Text>
      :
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={filterProducts(allProducts)}
            horizontal={false}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            contentContainerStyle={styles.gridContainer}
            key={`flatlist-${numColumns}`}
            numColumns={numColumns}
          />
        )}
      </View>}
    </View>
  );
}

const styles = StyleSheet.create({
  textResults: {
    top: 80,
    textAlign: "center",
  },
  card: {
    height: 210,
    width: 154,
  },
  container: {
    marginBottom: 350,
    paddingTop: 10,
    left: 8,
  },
  gridContainer: {
    padding: 1,
    margin: 10,

  },
  item: {
    marginBottom: 20,
    width: Dimensions.get("window").width / 2 - 16,
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

export default Search;
