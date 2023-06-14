import React, { useState, useEffect } from "react";
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
import { Color, Border, FontSize, FontFamily } from "../../GlobalStyles";
import { IconButton } from "react-native-paper";
import CartHeader from "../components/CartHeader";
import axios from  "axios"; 
import useStore from "../store/store";

const Details = () => {
  const route = useRoute();
  const { item } = route.params;
  const [favoriteItems, setFavoriteItems] = useState([]);
  const navigation = useNavigation();
  const isFavorite = favoriteItems.includes(item.id);
  const apiUrl = "https://mind-tech-back.onrender.com/"
  const [categories, setCategories] = useState()
  const [brands, setBrands] = useState();
  const { cartItems, setCartItems } = useStore();

  const toggleFavorite = (itemId) => {
    if (favoriteItems.includes(itemId)) {
      setFavoriteItems(favoriteItems.filter((item) => item !== itemId));
    } else {
      setFavoriteItems([...favoriteItems, itemId]);
    }
  };

  const addToCart = (product) => {
    const newCartItems = [...cartItems, product];
    setCartItems(newCartItems);
  };

  const obtainProductCategory = (item) => {
      let productCategory = categories?.filter(category => category._id == item.category); 
      if (productCategory?.length > 0) {
        return productCategory?.[0]?.name;
      }
  }

  const obtainProductBrand = (item) => {
    let productBrand = brands?.filter(brand => brand._id == item.brand); 
    if (productBrand?.length > 0) {
      return productBrand?.[0]?.name;
    }
  }

  //axios para traer las categorias:
    useEffect(()=>{
      axios.get(apiUrl + 'categories')
      .then(response =>{
        setCategories(response.data.categories)
        console.log(response)
    })
    .catch(error=>{
        console.log(error)
    })
    }, [])

  //axios para traer las marcas(brand):
  useEffect(()=>{
    axios.get(apiUrl + 'brands')
    .then(response =>{
      setBrands(response.data.brands)
    })
    .catch(error =>{
      console.log(error)
    })
  }, [])

  const formatPrice = (price) => {
    return price.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });
  };

  //CART FUNCTIONS
 
  

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
        <Text style={styles.categoryName}>{obtainProductCategory(item)}</Text>
        <CartHeader />
      </View>
      <ScrollView>
        <Image style={styles.image} source={{ uri: item.images[0] }} />
        <View style={styles.productDetail}>
          <Text style={styles.productName}>{item.name}</Text>
          <Text style={styles.productBrand}>{obtainProductBrand(item)}</Text>
          <Text style={styles.productPrice}>{formatPrice(item.price)}</Text>
          <IconButton
            style={styles.heartIcon}
            icon={isFavorite ? "heart" : "heart-outline"}
            color={isFavorite ? "#FF0000" : "#fff"}
            size={35}
            onPress={() => toggleFavorite(item.id)}
          />
          <TouchableOpacity style={styles.buttonAddToBag} onPress={() => addToCart(item)}>
            <Text style={styles.textButtonAddToBag}>ADD TO BAG</Text>
          </TouchableOpacity>
          <Text style={styles.productDescription}>{item.description}</Text>
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
    height: 340,
  },
  productDetail: {
    backgroundColor: Color.black,
    height: "100%",
    padding: 20,
    borderTopEndRadius: 60,
  },
  productName: {
    color: Color.white,
    fontSize: FontSize.size_mid,
    letterSpacing: 4,
    paddingBottom: 10,
    fontWeight: "bold",
    width: "80%",
    fontFamily: FontFamily.montserratSemibold
  },
  productPrice: {
    color: Color.white,
    fontSize: 30,
    letterSpacing: 4,
    paddingBottom: 20,
    fontFamily: FontFamily.montserratSemibold
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
  productBrand: {
    color: "#fff",
    marginBottom: 10,
    fontFamily: FontFamily.montserratLight,
  },
  productDescription: {
    marginHorizontal: 5,
    color: "#fff",
    marginVertical: 40,
    fontFamily: FontFamily.montserratLight,
    lineHeight: 23,
  }
});

export default Details;
