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
  Text,
} from 'react-native-elements';
import groceryApi from '../api/grocery';

const AddUsersScreen = ({ route, navigation }) => {
  const { list } = route.params;
  const { state, modifyList, cleanError } = useContext(ListContext);
  const [selectedUsers, setSelectedUsers] = useState(list.users);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    (async () => {
      const response = (await groceryApi.get('/api/followers')).data;
      setFriends(response);
    })();
  }, []);

  useEffect(() => {
    if (state.error) {
      setTimeout(() => {
        cleanError();
      }, 2000);

      setSelectedUsers(list.users);
    }
  }, [state.error]);

  const selectUser = (user) => {
    const userSelected = selectedUsers.find(
      (userSelected) => userSelected.id === user.id
    );
    if (userSelected) {
      setSelectedUsers(
        selectedUsers.filter((user) => user.id !== userSelected.id)
      );
      return;
    }

    setSelectedUsers([...selectedUsers, user]);
  };

  const isChecked = (user) => {
    return selectedUsers.find((userSelected) => userSelected.id === user.id)
      ? true
      : false;
  };

  const modifyUsers = async () => {
    try {
      const updatedList = Object.assign({}, list, { users: selectedUsers });
      await modifyList(updatedList);
      navigation.goBack();
    } catch (error) {}
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        {state.error ? (
          <Text h4 style={styles.errormsg}>
            Ha ocurrido un error modificando los usuarios, prueba otra vez
          </Text>
        ) : (
          friends.map((friend) => (
            <TouchableOpacity
              key={friend.id}
              onPress={() => selectUser(friend)}
            >
              <ListItem>
                <Avatar
                  rounded
                  size="medium"
                  source={{
                    uri:
                      'https://images.unsplash.com/photo-1568711146297-b8674c3c11b6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
                  }}
                />
                <ListItem.Content>
                  <ListItem.Title>{friend.username}</ListItem.Title>
                </ListItem.Content>
                <CheckBox
                  checkedIcon="dot-circle-o"
                  uncheckedIcon="circle-o"
                  checked={isChecked(friend)}
                />
              </ListItem>
            </TouchableOpacity>
          ))
        )}
        {(selectedUsers.length > list.users.length ||
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
        )}
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
  errormsg: {
    padding: 20,
    color: 'red',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AddUsersScreen;
