import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Button,
  View,
  Alert,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

import firebase from "../database/firebase";

const UserDetailScreen = (props) => {
  const initialState = {
    id: "",
    name: "",
    email: "",
    phone: "",
    age:"",
    lastname: "",
    secondlastname: "",
  };

  const [user, setUser] = useState(initialState);
  const [loading, setLoading] = useState(true);

  const handleTextChange = (value, prop) => {
    setUser({ ...user, [prop]: value });
  };

  const handleChangeTextON = (value, name) => {
    let newText = '';
    let numbers = '0123456789';

    if(value.length==0)
    {
      setUser({ ...user, [name]: "" });
    }
    for (var i=0; i < value.length; i++) {
        if(numbers.indexOf(value[i]) > -1 ) {
            newText = newText + value[i];
        
        }
        else {
            // your call back function
            
            alert("please enter numbers only");
        }
        setUser({ ...user, [name]: newText });
        
    }
  
  };



  const getUserById = async (id) => {
    const dbRef = firebase.db.collection("users").doc(id);
    const doc = await dbRef.get();
    const user = doc.data();
    setUser({ ...user, id: doc.id });
    setLoading(false);
  };

  const deleteUser = async () => {
    setLoading(true)
    const dbRef = firebase.db
      .collection("users")
      .doc(props.route.params.userId);
    await dbRef.delete();
    setLoading(false)
    props.navigation.navigate("UsersList");
  };

  const openConfirmationAlert = () => {
  
     if (window.confirm("Delete the item?")) {
      deleteUser() 
  }
  else{
    console.log("canceled")
  } 
  
  };

  const updateUser = async () => {
    const userRef = firebase.db.collection("users").doc(user.id);
    await userRef.set({
      name: user.name,
      email: user.email,
      phone: user.phone,
      age: user.age,
      lastname: user.lastname,
      secondlastname: user.secondlastname,
    });
    setUser(initialState);
    props.navigation.navigate("UsersList");
  };

  useEffect(() => {
    getUserById(props.route.params.userId);
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View>
        <TextInput
          placeholder="Name"
          autoCompleteType="username"
          style={styles.inputGroup}
          value={user.name}
          onChangeText={(value) => handleTextChange(value, "name")}
        />
      </View>

      <View>
        <TextInput
          placeholder="Lastname"
          style={styles.inputGroup}
          value={user.lastname}
          onChangeText={(value) => handleTextChange(value, "lastname")}
        />
      </View>

      <View>
        <TextInput
          placeholder="Secondlastname"
          style={styles.inputGroup}
          value={user.secondlastname}
          onChangeText={(value) => handleTextChange(value, "secondlastname")}
        />
      </View>
      <View>
        <TextInput
          placeholder="Age"
          style={styles.inputGroup}
          value={user.age}
          maxLength={3}
          onChangeText={(value) => handleChangeTextON(value, "age")}
        />
      </View>
      <View>
        <TextInput
          autoCompleteType="email"
          placeholder="Email"
          style={styles.inputGroup}
          value={user.email}
          onChangeText={(value) => handleTextChange(value, "email")}
        />
      </View>
      <View>
        <TextInput
          placeholder="Phone"
          autoCompleteType="tel"
          style={styles.inputGroup}
          value={user.phone}
          maxLength={10}
          onChangeText={(value) => handleChangeTextON(value, "phone")}
        />
      </View>
      <View style={styles.btn}>
        <Button
          title="Delete"
          onPress={() => openConfirmationAlert()}
          color="#E37399"
        />
      </View>
      <View>
        <Button title="Update" onPress={() => updateUser()} color="#19AC52" />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  loader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  btn: {
    marginBottom: 7,
  },
});

export default UserDetailScreen;
