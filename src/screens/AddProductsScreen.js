import React, { useState, useEffect, useContext } from 'react';
import { Context as ListContext } from '../context/ListContext';
import {
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  FlatList,
} from 'react-native';
import {
  CheckBox,
  ListItem,
  Avatar,
  Button,
  Icon,
  SearchBar,
} from 'react-native-elements';
import groceryApi from '../api/grocery';

const AddProductScreen = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [scroll, setScroll] = useState({
    loading: false,
    data: [],
    page: 0,
    limit: 10,
  });
console.log(scroll.page);
  useEffect(() => {
    (async () => {
      const response = (await groceryApi.get(`/api/products?limit=10&page=0`))
        .data;
      setScroll((prevState) => {
        const newState = {
          loading: false,
          data: [...response],
          page: prevState.page + 1,
          limit: 10,
        };

        return { ...prevState, ...newState };
      });
    })();
  }, []);

  const loadMoreProducts = async () => {
    // setScroll((prevState) => {
    //   const newState = {
    //     loading: true,
    //     data: [...prevState.data],
    //     page: prevState.page,
    //     limit: 10,
    //   };

    //   return { ...prevState, ...newState };
    // });

    const response = (
      await groceryApi.get(`/api/products?limit=10&page=${scroll.page}`)
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
        onEndEditing={() => console.log('acabo de editar')}
      />
      <FlatList
        data={scroll.data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => console.log(item)}>
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
              <CheckBox
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checked={false}
              />
            </ListItem>
          </TouchableOpacity>
        )}
        onEndReached={() => loadMoreProducts()}
        onEndReachedThreshold={0.5}
      />
      {/* <ScrollView>
        {products.map((product) => (
          <TouchableOpacity key={product.id} onPress={() => console.log(product)}>
            <ListItem>
              <Avatar
                rounded
                size="medium"
                source={{
                  uri:product.img,
                }}
              />
              <ListItem.Content>
                <ListItem.Title>{product.name}</ListItem.Title>
              </ListItem.Content>
              <CheckBox
                checkedIcon="dot-circle-o"
                uncheckedIcon="circle-o"
                checked={false}
              />
            </ListItem>
          </TouchableOpacity>
        ))} */}
      {/* {(selectedUsers.length > list.users.length ||
          selectedUsers.length < list.users.length) && (
          <Button
            icon={
              <Icon
                name="check-circle"
                type="feather"
                size={25}
                color="white"
                containerStyle={{ marginRight: 10 }}
              />
            }
            title="Modificar"
            buttonStyle={{ marginTop: 50, marginRight: 50, marginLeft: 50 }}
            onPress={modifyUsers}
          />
        )} */}
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    height: '100%',
    width: '100%',
  },
});

export default AddProductScreen;
