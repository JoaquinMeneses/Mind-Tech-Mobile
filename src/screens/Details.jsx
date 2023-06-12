import React, { useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  ScrollView,
  Dimensions,
  Text,
  TouchableOpacity,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Color, Border, FontSize } from "../../GlobalStyles";
import { IconButton } from "react-native-paper";
import CartHeader from "../components/CartHeader";

const Details = () => {
  const route = useRoute();
  const { item } = route.params;
  const [favoriteItems, setFavoriteItems] = useState([]);
  const navigation = useNavigation();

  const toggleFavorite = (itemId) => {
    if (favoriteItems.includes(itemId)) {
      setFavoriteItems(favoriteItems.filter((item) => item !== itemId));
    } else {
      setFavoriteItems([...favoriteItems, itemId]);
    }
  };

  const isFavorite = favoriteItems.includes(item.id);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.headerContainer}>
        <IconButton
          style={styles.backIcon}
          icon="arrow-left"
          iconColor={"#000"}
          size={20}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.categoryName}>{item.category}</Text>
        <CartHeader />
      </View>
      <ScrollView>
        <Image style={styles.image} source={{ uri: item.images[0] }} />
        <View style={styles.productDetail}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productPrice}>{"$" + item.price + ".00"}</Text>
          <IconButton
            style={styles.heartIcon}
            icon={isFavorite ? "heart" : "heart-outline"}
            color={isFavorite ? "#FF0000" : "#fff"}
            size={35}
            onPress={() => toggleFavorite(item.id)}
          />
          <TouchableOpacity style={styles.buttonAddToBag}>
            <Text style={styles.textButtonAddToBag}>ADD TO BAG</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  containerDetails: {
    width: Dimensions.get("window").width,
  },
  image: {
    height: 380,
  },
  productDetail: {
    backgroundColor: Color.black,
    height: "100%",
    padding: 20,
    borderTopEndRadius: 60,
  },
  productName: {
    color: Color.white,
    fontSize: FontSize.size_xl,
    letterSpacing: 4,
    paddingBottom: 10,
    fontWeight: "bold",
  },
  productPrice: {
    color: Color.white,
    fontSize: 30,
    letterSpacing: 4,
    paddingBottom: 20,
  },
  buttonAddToBag: {
    backgroundColor: "#00a524da",
    height: 40,
    width: "95%",
    borderRadius: Border.br_4xl_1,
    justifyContent: "center",
    alignItems: "center",
  },
  textButtonAddToBag: {
    color: "white",
    letterSpacing: 4,
    textAlign: "center",
    fontSize: FontSize.size_xs,
    fontWeight: 700,
  },
  heartIcon: {
    top: 20,
    left: 286,
    position: "absolute",
  },
  headerContainer: {
    width: Dimensions.get("window").width,
    top: 50,
    paddingLeft: 20,
    marginBottom: 10,
    flexDirection: "row",
    alignContent: "center",
  },
  categoryName: {
    letterSpacing: 8,
    width: 238,
    height: 79,
    fontSize: FontSize.size_base,
    color: Color.black,
    fontWeight: 700,
    textAlign: "center",
  },
  backIcon: {
    top: -15,
    left: -15,
  },
});

export default Details;
