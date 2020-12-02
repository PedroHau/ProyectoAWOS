import React, { useState } from "react";
import {
  Button,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
} from "react-native";

import firebase from "../database/firebase";

const AddUserScreen = (props) => {
  const initalState = {
    name: "",
    lastname:"",
    secondlastname:"",
    age:"",
    email: "",
    phone: "",
  };

  const [state, setState] = useState(initalState);

  const handleChangeTextON = (value, name) => {
    let newText = '';
    let numbers = '0123456789';

    if(value.length==0)
    {
      setState({ ...state, [name]: "" });
    }
    for (var i=0; i < value.length; i++) {
        if(numbers.indexOf(value[i]) > -1 ) {
            newText = newText + value[i];
        
        }
        else {
            // your call back function
            
            alert("please enter numbers only");
        }
        setState({ ...state, [name]: newText });
        
    }
  
  };

  const handleChangeText = (value, name) => {

        setState({ ...state, [name]: value });
      
  
  };


  

  const saveNewUser = async () => {
    if (state.name === "") {
      alert("please provide a name");
    } else {

      try {
        await firebase.db.collection("users").add({
          name: state.name,
          lastname: state.lastname,
          secondlastname: state.secondlastname,
          age: state.age,
          email: state.email,
          phone: state.phone,
        });

        props.navigation.navigate("UsersList");
      } catch (error) {
        console.log(error)
      }
    }
  };

  return (
    <ScrollView style={styles.container}>
      {/* Name Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Name"
          onChangeText={(value) => handleChangeText(value, "name")}
          value={state.name}
        />
      </View>

      {/* Name Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Lastname"
          onChangeText={(value) => handleChangeText(value, "lastname")}
          value={state.lastname}
        />
      </View>

      {/* Name Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Second lastname"
          onChangeText={(value) => handleChangeText(value, "secondlastname")}
          value={state.secondlastname}
        />
      </View>

      {/* Name Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Age"
          maxLength={3}
          onChangeText={(value) => handleChangeTextON(value, "age")}
          value={state.age}

        />
      </View>

      {/* Email Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="Email"
          multiline={true}
          numberOfLines={4}
          onChangeText={(value) => handleChangeText(value, "email")}
          value={state.email}
        />
      </View>

      {/* Input */}
      <View style={styles.inputGroup}>
        <TextInput
          placeholder="phone"
          onChangeText={(value) => handleChangeTextON(value, "phone")}
          value={state.phone}
          maxLength={10}
        />
      </View>

      <View style={styles.button}>
        <Button title="Save User" onPress={() => saveNewUser()} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
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
});

export default AddUserScreen;
