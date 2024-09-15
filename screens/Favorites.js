import React from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import ContactThumbnail from "../components/ContactThumbnail";
import { useSelector } from 'react-redux';
import Call from "./Call";

const keyExtractor = ({ phone }) => phone;

const Favorites = ({ navigation }) => {
  const { contacts, loading, error } = useSelector((state) => state.contacts);

  const renderFavoriteThumbnail = ({ item }) => {
    const { avatar, name, phone } = item;
    return (
      <View>
        <ContactThumbnail
          avatar={avatar}
          onPress={() => navigation.navigate("Profile", { contact: item })}
          onLongPress={() => Call(phone)}
        />
        <Text style={styles.nameText}>{name}</Text>
      </View>
    );
  };

  const favorites = contacts.filter((contact) => contact.favorite);

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" />}
      {error && <Text>Error...</Text>}
      {!loading && !error && (
        <FlatList
          data={favorites}
          keyExtractor={keyExtractor}
          numColumns={3}
          contentContainerStyle={styles.list}
          renderItem={renderFavoriteThumbnail}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    justifyContent: "center",
    flex: 1,
  },
  list: {
    alignItems: "center",
  },
  nameText: {
    flex: 1,
    textAlign: 'center'
  }
});

export default Favorites;