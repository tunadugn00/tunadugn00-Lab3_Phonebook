import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import ContactThumbnail from "../components/ContactThumbnail";
import colors from "../utils/colors";
import { fetchUserContact } from "../utils/api";

const User = ({ navigation }) => {
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchUserContact()
      .then((user) => {
        setUser(user);
        setLoading(false);
        setError(false);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }, []);

  const { avatar, name, phone, email, location, dob, gender } = user;

  const handleOptionsPress = () => {
    if (navigation) {
      navigation.navigate('Options');
    }
  };

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" />}
      {error && <Text>Error loading user data...</Text>}
      {!loading && !error && (
        <View style={styles.infoContainer}>
          <ContactThumbnail avatar={avatar} name={name} phone={phone} textColor="black" />
          <Text style={styles.text}>Email: {email}</Text>
          <Text style={styles.text}>Address: {location}</Text>
          <Text style={styles.text}>Date of Birth: {dob}</Text>
          <Text style={styles.text}>Gender: {gender}</Text>

          <TouchableOpacity style={styles.optionsButton} onPress={handleOptionsPress}>
            <Icon name="settings" size={30} color="black" />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
  },
  infoContainer: {
    alignItems: "center",
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 60,
    position: 'relative',
  },
  text: {
    color: "black",
    fontSize: 18,
    marginVertical: 5,
  },
  optionsButton: {
    position: 'absolute',
    top: -155,
    right: 10, 
    zIndex: 1, 
  },
});

export default User;
