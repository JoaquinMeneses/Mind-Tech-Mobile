import React from "react";
import SearchBar from "./../components/SearchBar";
import Header from "./../components/Header";
import { View, Text, StyleSheet } from "react-native";

function Search() {
  return (
    <View>
        <Header />
        <SearchBar />
        <Text style={styles.textResults}>Results</Text>
    </View>
  );
}

const styles = StyleSheet.create({
    textResults: {
        top: 80,
        textAlign: 'center',
    }
})

export default Search;