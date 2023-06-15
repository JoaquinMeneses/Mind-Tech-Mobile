import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import useStore from "../store/store";
import { FontFamily, Color } from "../../GlobalStyles";
import { Card, IconButton, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { Divider } from "@rneui/themed";

function FilterPrice() {
  const navigation = useNavigation();
  const allProducts = useStore((state) => state.allProducts);
  const getAllProducts = useStore((state) => state.getAllProducts);
  const [products, setProducts] = useState([]);
  const [orderPrice, setOrderPrice] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [loading, setLoading] = useState(true);
  const numColumns = 2;
  const [favoriteItems, setFavoriteItems] = useState([]);
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

    const productsOrdered = [...allProducts];

    productsOrdered.sort((a, b) => {
      if (orderPrice === "descendent") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });

    setProducts(productsOrdered);
  }, [orderPrice]);

  useEffect(() => {
    if (products?.length > 0) {
      setLoading(false);
    }
  }, [products]);

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
    <View style={styles.containerFilter}>
      <IconButton
        icon="filter-variant"
        iconColor={"#000"}
        size={25}
        onPress={() => {
          setShowOptions(!showOptions);
          console.log("pressed filter");
        }}
      />
      {showOptions ? (
        <View style={styles.containerOrderPrice}>
          <TouchableOpacity
            style={styles.buttonPrice}
            onPress={() => setOrderPrice("descendent")}
          >
            <Text style={styles.buttonTitle}>lowest to highest price</Text>
          </TouchableOpacity>
          <Divider />
          <TouchableOpacity
            style={styles.buttonPrice}
            onPress={() => setOrderPrice("ascendent")}
          >
            <Text style={styles.buttonTitle}>highest to lowest price</Text>
          </TouchableOpacity>
        </View>
      ) : null}
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={products}
            horizontal={false}
            renderItem={renderItem}
            keyExtractor={(item) => item._id}
            contentContainerStyle={styles.gridContainer}
            key={`flatlist-${numColumns}`}
            numColumns={numColumns}
          />
        )}
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  
  containerFilter: {
    alignItems: "flex-end",
  },
  
  card: {
    height: 210,
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
  containerOrderPrice: {
    position: "absolute",
    zIndex: 999,
    backgroundColor: Color.gainsboro,
    top: 50,
    padding: 10,
    borderRadius: 10,
  },
  buttonTitle: {
    fontSize: 16,
    padding: 10,
  },
});

export default FilterPrice;
