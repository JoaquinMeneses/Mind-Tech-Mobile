import * as React from 'react';
import { Searchbar } from 'react-native-paper';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Color } from "../../GlobalStyles";

const SearchBar = () => {
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = (query) => setSearchQuery(query);


  return (
    <View style={styles.searchContainer}>
      <Searchbar
        style={styles.search}
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        inputStyle={styles.inputStyle}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    width: Dimensions.get('window').width,
    alignItems: 'center',
  },
  search: {
    top: 25,
    width: '90%',
    backgroundColor: "#fff",
  },
  
});

export default SearchBar;
