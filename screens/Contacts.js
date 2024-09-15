import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { fetchContacts } from "../utils/api";
import ContactListItem from "../components/ContactListItem";
import {
  fetchContactsLoading,
  fetchContactsSuccess,
  fetchContactsError,
} from "../components/store"; // Redux action creators
import { useDispatch, useSelector } from "react-redux";
import Call from "./Call";

const keyExtractor = ({ phone }) => phone;

const Contacts = ({ navigation }) => {
  const dispatch = useDispatch();
  const { contacts, loading, error } = useSelector((state) => state.contacts);

  useEffect(() => {
    const loadContacts = async () => {
      if (contacts.length === 0) {
        dispatch(fetchContactsLoading());
        try {
          const fetchedContacts = await fetchContacts();
          dispatch(fetchContactsSuccess(fetchedContacts));
        } catch (e) {
          console.error("Error fetching contacts: ", e);
          dispatch(fetchContactsError());
        }
      }
    };
  
    loadContacts();
  }, [dispatch, contacts.length]);

  const renderContact = ({ item }) => {
    const { name, avatar, phone } = item;
    return (
      <ContactListItem
        name={name}
        avatar={avatar}
        phone={phone}
        onPress={() => navigation.navigate("Profile", { contact: item })}
        onLongPress={() => Call(phone)}
      />
    );
  };

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator color="blue" size="large" />}
      {error && <Text>Error loading contacts...</Text>}
      {!loading && !error && (
        <FlatList
          data={contacts}
          keyExtractor={keyExtractor}
          renderItem={renderContact}
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
});

export default Contacts;