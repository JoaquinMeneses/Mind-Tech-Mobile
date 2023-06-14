import React, {useEffect} from "react";
import { View, Text, FlatList } from "react-native";
import useStore from '../store/store';
import { Card } from "react-native-paper";

const MyCart = ({ item }) => {
    const cartItems = useStore((state) => state.cartItems);
    const setCartItems = useStore((state) => state.setCartItems);
    const numColumns = 1;
    const maxLength = 40;
    
    const shortenText = (text) => {
        if (text.length <= maxLength) {
        return text; 
        } else {
        return text.substring(0, maxLength) + "..."; 
        }
    };

  const formatPrice = (price) => {
    return price.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    });
  };

  useEffect(() => {
    setCartItems();
    console.log(cartItems)
  }, [setCartItems]);

  const renderItem = ({ item }) => {
 
    return (
      <View >
        <Card>
            <Card.Cover source={{ uri: item.images[0] }} />
          <Card.Content >
            <Text>{shortenText(item.name)}</Text>
          </Card.Content>
          <View>
            <Text >{formatPrice(item.price)}</Text>
          </View>
        </Card>
      </View>
    );
  };

  return (
    <View >
        <Text style={{fontSize: 30, textAlign: "center", top: 20, height: 100, paddingTop: 30,backgroundColor: "#000", color: "#fff"}}>My Cart</Text>
        <FlatList
          data={cartItems}
          horizontal={false}
          renderItem={renderItem}
          keyExtractor={(item) => item._id}
        //   contentContainerStyle={styles.gridContainer}
          key={`flatlist-${numColumns}`}
          numColumns={numColumns}
        />
      
    </View>
  );
};

export default MyCart