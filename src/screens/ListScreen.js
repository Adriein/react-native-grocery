import React, { useEffect, useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { Context as ListContext } from '../context/ListContext';
import { ListItem, Avatar, Badge, Button, Icon } from 'react-native-elements';
import { NOT_BOUGHT, LIST_AVATARS, IN_CONSTRUCTION, READY } from '../constants';
import FacePile from '../components/FacePile';

const ListScreen = ({ navigation }) => {
  const { state, getLists, selectList } = useContext(ListContext);
  useEffect(() => {
    getLists();
  }, []);

  const randomImage = () => {
    const number = Math.floor(Math.random() * LIST_AVATARS.length);
    return LIST_AVATARS.find((_, index) => index === number);
  };

  const onSelectedList = (id) => {
    selectList(id);
    navigation.navigate('Detalle Lista');
  };

  return (
    <SafeAreaView style={styles.container}>
      {state.lists.map((list) => (
        <ListItem
          key={list.id}
          bottomDivider
          onPress={() => onSelectedList(list.id)}
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
          <View style={styles.usersContainer}>
            <FacePile
              numFaces={4}
              faces={list.users.map(() => {
                return { url: randomImage() };
              })}
            />
          </View>
        </ListItem>
      ))}
      <Icon
        raised
        reverse
        name="shopping-bag"
        type="feather"
        size={25}
        color="#f50"
        containerStyle={{
          position: 'absolute',
          marginBottom: 20,
          marginRight: 20,
          bottom: 0,
          right: 0
        }}
      />
      {/* <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Button
          icon={
            <Icon
              name="shopping-bag"
              type="feather"
              size={25}
              color="white"
              containerStyle={{ marginRight: 10 }}
            />
          }
          title="Crea una nueva lista"
          containerStyle={{ marginTop: 20, width: 300 }}
        />
      </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    height: '100%',
  },
  usersContainer: {
    paddingRight: 10,
  },
});

export default ListScreen;
