import React, { useState, useEffect, useContext } from 'react';
import { Context as ListContext } from '../context/ListContext';
import {
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
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
  const [products, setProducts] = useState([]);
//   useEffect(() => {
//     (async () => {
//       const response = (await groceryApi.get('/api/products')).data;
//       setProducts(response);
//     })();
//   }, []);
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
      <ScrollView>
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
        ))}
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
      </ScrollView>
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
