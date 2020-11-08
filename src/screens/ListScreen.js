import React, { useEffect, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Context as ListContext } from '../context/ListContext';
import { ListItem, Avatar, Badge } from 'react-native-elements';
import { NOT_BOUGHT, LIST_AVATARS, IN_CONSTRUCTION, READY } from '../constants';

const ListScreen = ({ navigation }) => {
  const { state, getLists } = useContext(ListContext);
  useEffect(() => {
    getLists();
  }, []);

  const randomImage = () => {
    const number = Math.floor(Math.random() * LIST_AVATARS.length);
    return LIST_AVATARS.find((_, index) => index === number);
  };

  return (
    <SafeAreaView style={styles.container}>
      {state.lists.map((list) => (
        <ListItem
          key={list.id}
          bottomDivider
          onPress={() =>
            navigation.navigate('Detalle Lista', {
              list: list,
              img: randomImage(),
            })
          }
        >
          <View>
            <Avatar
              rounded
              size="medium"
              source={{
                uri: randomImage(),
              }}
            />
            <Badge
              status={
                list.status === IN_CONSTRUCTION
                  ? 'warning'
                  : READY
                  ? 'success'
                  : 'error'
              }
              containerStyle={{ position: 'absolute', top: 1, right: 3 }}
              badgeStyle={{ height: 10, width: 10 }}
            />
          </View>

          <ListItem.Content>
            <ListItem.Title>{list.title}</ListItem.Title>
            <ListItem.Subtitle>{`${
              list.products.filter((product) => product.status === NOT_BOUGHT)
                .length
            } productos no comprados`}</ListItem.Subtitle>
          </ListItem.Content>
          {list.users.map((user) => (
            <Avatar
              key={user.id}
              rounded
              title={user.username
                .split('')
                .map((letter, index) => {
                  if (index < 2) {
                    return letter.toUpperCase();
                  }
                })
                .join('')}
              overlayContainerStyle={{ backgroundColor: '#d3d3d3' }}
            />
          ))}
        </ListItem>
      ))}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
  },
});

export default ListScreen;
