import React, { useState, useContext } from 'react';
import { Context as ListContext } from '../context/ListContext';
import {
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  FlatList,
  View,
  ActivityIndicator,
} from 'react-native';
import {
  ListItem,
  Avatar,
  SearchBar,
} from 'react-native-elements';
import groceryApi from '../api/grocery';

const AddProductScreen = ({ navigation, route }) => {
  const { list } = route.params;
  const { addProduct } = useContext(ListContext);
  const [searchTerm, setSearchTerm] = useState('');
  const [scroll, setScroll] = useState({
    loading: false,
    data: [],
    page: 0,
    limit: 10,
  });

  const selectProduct = (product) => {
    addProduct({ ...product, status: 'not bought', quantity: '1', user: list.users[0].id });
    navigation.goBack();
  };

  const loadMoreProducts = async () => {
    setScroll((prevState) => {
      const newState = {
        loading: true,
        data: [...prevState.data],
        page: prevState.page,
        limit: 10,
      };

      return { ...prevState, ...newState };
    });

    const response = (
      await groceryApi.get(
        `/api/products?limit=10&page=${scroll.page}&search=${searchTerm}`
      )
    ).data;

    if (response.length === 0) {
      setScroll((prevState) => {
        const newState = {
          loading: false,
          data: [...prevState.data],
          page: prevState.page,
          limit: 10,
        };

        return { ...prevState, ...newState };
      });
      return;
    }

    setScroll((prevState) => {
      const newState = {
        loading: false,
        data: [...prevState.data, ...response],
        page: prevState.page + 1,
        limit: 10,
      };

      return { ...prevState, ...newState };
    });
  };

  const searchProduct = async () => {
    const response = (
      await groceryApi.get(
        `/api/products?limit=10&page=${scroll.page}&search=${searchTerm}`
      )
    ).data;

    setScroll((prevState) => {
      const newState = {
        loading: false,
        data: [...response],
        page: prevState.page + 1,
        limit: 10,
      };

      return { ...prevState, ...newState };
    });
  };

  const clear = () => {
    setSearchTerm('');
    setScroll({
      loading: false,
      data: [],
      page: 0,
      limit: 10,
    });
  };

  const footer = () => {
    return (
      scroll.loading && (
        <View style={styles.loader}>
          <ActivityIndicator size={'large'} color="#999999" />
        </View>
      )
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        cancelIcon={null}
        placeholder="Type Here..."
        onChangeText={(value) => setSearchTerm(value)}
        value={searchTerm}
        inputContainerStyle={{ backgroundColor: '#F0EEEE' }}
        containerStyle={{
          backgroundColor: 'white',
          borderTopColor: 'white',
          borderBottomColor: 'white',
        }}
        onEndEditing={searchProduct}
        onClear={clear}
      />
      <FlatList
        data={scroll.data}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => selectProduct(item)}>
            <ListItem>
              <Avatar
                rounded
                size="medium"
                source={{
                  uri: item.img,
                }}
              />
              <ListItem.Content>
                <ListItem.Title>{item.name}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          </TouchableOpacity>
        )}
        onEndReached={() => loadMoreProducts()}
        onEndReachedThreshold={0.5}
        ListFooterComponent={footer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
  },
  loader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
  },
});

export default AddProductScreen;
