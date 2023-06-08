import React from "react";
import SearchBar from "./../components/SearchBar";
import Header from "./../components/Header";
import { View, ScrollView } from "react-native";
import CarouselHome from "../components/CarouselHome";
import FeaturedProducts from "../components/FeaturedProducts";
import TabNavigator from "../navigations/TabNavigator";

function Home() {
  return (
    <View>
      <Header />
      <ScrollView>
        <SearchBar />
        <CarouselHome />
        <FeaturedProducts />
      </ScrollView>
    </View>
  );
}

export default Home;
