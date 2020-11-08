import React, { useEffect, useContext } from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Context as ListContext } from '../context/ListContext';
import {
  ListItem,
  Avatar,
  Badge,
  Text,
  Image,
  Icon,
  Divider,
} from 'react-native-elements';
import { NOT_BOUGHT, LIST_AVATARS, ACTIVE } from '../constants';

const DetailListScreen = ({ route, navigation }) => {
  const { list, img } = route.params;
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image source={{ uri: img }} style={styles.headerImg} />
        <Icon
          raised
          name="user-plus"
          type="feather"
          color="black"
          size={20}
          containerStyle={{ position: 'absolute', top: 5, right: 5 }}
          onPress={() => navigation.navigate('Añadir Usuarios', { list })}
        />
      </View>
      <View style={styles.listTitle}>
        <Text h2>{list.title}</Text>
        <Icon raised name="edit" type="feather" color="#517fa4" size={20} />
        <Icon
          raised
          reverse
          name="add-shopping-cart"
          type="materialicons"
          color="#009900"
          size={20}
          onPress={() => navigation.navigate('Añadir Productos', { list })}
        />
      </View>

      {list.users.map((user) => (
        <ListItem key={user.id} style={styles.usersList}>
          <Text>{user.username}</Text>
        </ListItem>
      ))}
      <Divider />
      <ScrollView>
        {list.products.map((product) => (
          <ListItem key={product.id} bottomDivider>
            <View>
              <Avatar
                rounded
                size="medium"
                source={{
                  uri: product.img,
                }}
              />
              <Badge
                value={product.quantity}
                status={product.status === ACTIVE ? 'success' : 'error'}
                containerStyle={{ position: 'absolute', top: -2, right: -1 }}
              />
            </View>

            <ListItem.Content>
              <ListItem.Title>{product.name}</ListItem.Title>
              <ListItem.Subtitle>{product.supermarket}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
  },
  headerImg: {
    width: '100%',
    height: 200,
  },
  listTitle: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'stretch',
  },
  usersList: {
    flexDirection: 'row',
  },
});

export default DetailListScreen;
