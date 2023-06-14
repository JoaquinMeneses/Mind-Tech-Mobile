import React, { useState, useEffect } from "react";
import axios from "axios";
import RNPickerSelect from "react-native-picker-select";
import { Searchbar } from "react-native-paper";
import { Divider } from "@rneui/themed";
import {
  View,
  StyleSheet,
  Dimensions,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import useStore from "../store/store";
import { FontFamily } from "../../GlobalStyles";
import { Card, IconButton, Text } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

function FiltersStore() {
  const apiUrl = "https://mind-tech-back.onrender.com/";
  const navigation = useNavigation();

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState([]);

  const [categoriesPicker, setCategoriesPicker] = useState([]);
  const [brandsPicker, setBrandsPicker] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const allProducts = useStore((state) => state.allProducts);
  const getAllProducts = useStore((state) => state.getAllProducts);
  const [products, setProducts] = useState([]);
  const [orderPrice, setOrderPrice] = useState("");

  const [loading, setLoading] = useState(true);
  const numColumns = 2;
  const [favoriteItems, setFavoriteItems] = useState([]);
  const maxLength = 40;

  const onChangeSearch = (query) => setSearchQuery(query);

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
  };

  const handleBrandChange = (value) => {
    setSelectedBrand(value);
  };

  //axios para traer las categorias:
  useEffect(() => {
    axios
      .get(apiUrl + "categories")
      .then((response) => {
        setCategories(response.data.categories);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(apiUrl + "brands")
      .then((response) => {
        setBrands(response.data.brands);
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    let listCategories = [];

    listCategories = categories?.map((item) => {
      return {
        value: item?._id,
        label: item?.name,
      };
    });
    console.log(listCategories);

    setCategoriesPicker(listCategories);
  }, [categories]);

  useEffect(() => {
    let listBrands = [];

    listBrands = brands?.map((item) => {
      return {
        value: item?._id,
        label: item?.name,
      };
    });
    console.log(listBrands);
    console.log(brands);

    setBrandsPicker(listBrands);
  }, [brands]);

  useEffect(() => {
     getAllProducts();

    // const productsOrdered = filterProducts(allProducts);

    filteredProducts.sort((a, b) => {
      if (orderPrice === "descendent") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });

    setProducts(filterProducts);
  }, [orderPrice]);

  useEffect(() => {
    if (products?.length > 0) {
      setLoading(false);
    }
  }, [products]);

  const filterProducts = (products) => {
    let filteredProducts = products;

    if (searchQuery.trim() !== "") {
      filteredProducts = filteredProducts.filter((product) =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // if (selectedFilter) {
    //   filteredProducts = sortProducts(filteredProducts, selectedFilter.value);
    // }

    if (selectedCategory) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedCategory.includes(product.category)
      );
    }

    if (selectedBrand) {
      filteredProducts = filteredProducts.filter((product) =>
        selectedBrand.includes(product.brand)
      );
    }

    return filteredProducts;
  };

  const filteredProducts = filterProducts(allProducts);

  useEffect(() => {
    getAllProducts();
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

  const shortenText = (text) => {
    if (text.length <= maxLength) {
      return text;
    } else {
      return text.substring(0, maxLength) + "...";
    }
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
      <View style={styles.containerFilterStore}>
        <View style={styles.containerPicker}>
          <RNPickerSelect
            onValueChange={handleCategoryChange}
            items={categoriesPicker}
            placeholder={{ label: "Select a category", value: null }}
            value={selectedCategory}
            style={pickerSelectStyles}
          />
          <RNPickerSelect
            onValueChange={handleBrandChange}
            items={brandsPicker}
            placeholder={{ label: "Select a brand", value: null }}
            value={selectedBrand}
            style={pickerSelectStyles}
          />
        </View>
        <View style={styles.searchContainer}>
          <Searchbar
            style={styles.search}
            placeholder="Search"
            onChangeText={onChangeSearch}
            value={searchQuery}
            inputStyle={styles.inputStyle}
          />
        </View>
        <View style={styles.containerFilter}>
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
        </View>
      </View>
      {filteredProducts.length !== 0 ? (
        <View style={styles.containerFlatList}>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <FlatList
              data={filteredProducts}
              horizontal={false}
              renderItem={renderItem}
              keyExtractor={(item) => item._id}
              contentContainerStyle={styles.gridContainer}
              key={`flatlist-${numColumns}`}
              numColumns={numColumns}
            />
          )}
        </View>
      ) : (
        <View style={styles.containerFlatList}>
          <Text style={{left: 100}}>No search matches</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  containerFilterStore: {
    flex: 1,
    width: Dimensions.get("window").width,
  },
  searchContainer: {
    width: Dimensions.get("window").width,
    alignItems: "center",
  },
  search: {
    position: "absolute",
    width: "90%",
    backgroundColor: "#fff",
    top: -205,
  },
  containerFilter: {
    alignItems: "flex-end",
    top: -140,
    right: 10,
    zIndex: 10,
  },

  card: {
    height: 210,
    width: 154,
  },
  containerFlatList: {
    flex: 1,
    paddingTop: 10,
    left: 20,
    top: -110,
    position: "relative",
  },
  gridContainer: {
    padding: 1,
    left: 5,
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
    flexDirection: "row",
    top: -2,
    padding: 5,
    width: "95%",
  },
  buttonTitle: {
    fontSize: 14,
    padding: 10,
    color: "#fff",
  },
  containerPicker: {
    flex: 1,
    flexDirection: "row",
  },
  buttonPrice: {
    borderWidth: 2,
    borderColor: "#fff",
    backgroundColor: "#000",
    borderRadius: 8,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    margin: 15,
    width: 152,
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 4,
    color: "black",
    paddingRight: 30,
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: "purple",
    borderRadius: 8,
    color: "black",
    paddingRight: 30,
  },
  picker: {
    backgroundColor: "#000",
    borderWidth: 2,
    borderColor: "gray",
    borderRadius: 10,
  },
});

export default FiltersStore;
