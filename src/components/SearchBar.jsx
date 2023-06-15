import React, {useState} from 'react';
import { Searchbar } from 'react-native-paper';
import { Dimensions, StyleSheet, View } from 'react-native';
import { useNavigation } from "@react-navigation/native";

const SearchBar = () => {

  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const onChangeSearch = (query) => setSearchQuery(query);
  
  const handleSearch = () => {
    console.log(searchQuery)
    if (searchQuery !== undefined) {
      navigation.navigate('Search', { searchQuery: searchQuery });
    } else {
      navigation.navigate('Search', "");
    }
    
  };
  

  return (
    <View style={styles.searchContainer}>
      <Searchbar
        style={styles.search}
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        inputStyle={styles.inputStyle}
        onSubmitEditing={handleSearch}
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
    top: 10,
    width: '90%',
    backgroundColor: "#fff",
  },
 
});

export default SearchBar;
