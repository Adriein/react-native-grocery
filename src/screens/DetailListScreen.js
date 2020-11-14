import React, { useContext } from 'react';
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
import { LIST_AVATARS, ACTIVE, READY } from '../constants';
import FacePile from '../components/FacePile';

const DetailListScreen = ({ navigation }) => {
  const { state, modifyList } = useContext(ListContext);

  const randomImage = () => {
    const number = Math.floor(Math.random() * LIST_AVATARS.length);
    return LIST_AVATARS.find((_, index) => index === number);
  };

  const changeListState = async (list) => {
    const updatedList = Object.assign({}, list, { status: READY });
    await modifyList(updatedList);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image source={{ uri: randomImage() }} style={styles.headerImg} />
        <Icon
          raised
          name="user-plus"
          type="feather"
          color="black"
          size={20}
          containerStyle={{ position: 'absolute', top: 5, right: 5 }}
          onPress={() =>
            navigation.navigate('Añadir Usuarios', { list: state.selectedList })
          }
        />
        <View style={{ position: 'absolute', top: 10, left: 10 }}>
          <FacePile
            numFaces={3}
            circleSize={25}
            faces={state.selectedList.users.map(() => {
              return { url: randomImage() };
            })}
          />
        </View>
      </View>
      <View style={styles.listTitle}>
        <Text h2>{state.selectedList.title}</Text>
      </View>
      <View style={styles.buttons}>
        <Icon
          raised
          reverse
          name="shop"
          type="entypo"
          color={state.selectedList.status === READY ? '#F77F00' : '#009900'}
          containerStyle={{ marginRight: 40 }}
          size={25}
          onPress={() => changeListState(state.selectedList)}
        />
        <Icon
          raised
          reverse
          disabled={state.selectedList.status === READY ? true : false}
          name="add-shopping-cart"
          type="materialicons"
          color="#517fa4"
          size={25}
          onPress={() => navigation.navigate('Añadir Productos')}
        />
      </View>

      <Divider />
      <ScrollView>
        {state.selectedList.products.map((product) => (
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
    padding: 10,
  },
  usersList: {
    flexDirection: 'row',
  },
  buttons: {
    flexDirection: 'row',
    padding: 10,
  },
});

export default DetailListScreen;
