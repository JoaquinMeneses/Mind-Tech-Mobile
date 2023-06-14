import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Alert,
} from "react-native";
import { Color, Border, FontSize, FontFamily } from "../../GlobalStyles";
import { TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import useStore from "../store/store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../components/Header";
import { Menu } from "react-native-paper";

function SignIn() {
  const navigation = useNavigation();
  const [textEmail, setTextEmail] = useState("");
  const [textPassword, setTextPassword] = useState("");
  const { login, user, logout, getUser } = useStore();
  const apiUrl = "https://mind-tech-back.onrender.com/";
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [userId, setUserId] = useState("");
  

  let data = {
    email: textEmail,
    password: textPassword,
  };

  async function handleSubmit() {
    axios
      .post(apiUrl + "users/login", data)
      .then((res) => {
        login(res.data.token);
        AsyncStorage.setItem("token", res.data.token);
        getUser(res.data.user.email)
        Alert.alert("User logged in!");
        setIsLoggedIn(true);
        navigation.navigate("Store");
      })
      .catch((err) => {
          console.log(err.response.data.message);
          Alert.alert("Wrong Credentials");
      });
  }

  const handleLinkToRegister = () => {
    navigation.navigate("Register", { screen: "Register" });
  };

  const handleLinkToHome = () => {
    navigation.navigate("Home");
  };

  function sendLogout() {
    axios
      .post(apiUrl + "users/logout", { email: user?.email })
      .then((res) => {
        console.log(res.data.message);
        logout()
        AsyncStorage.removeItem("token");
        setIsLoggedIn(false);
        Alert.alert("User Logout!");
        navigation.navigate("Home");
      })
      .catch((err) => {
          console.log(err.response.data.message);
          Alert.alert("Wrong Credentials");
      });
  }

  useEffect(() => {
    axios
      .get(apiUrl + "users/one?one=" + textEmail)
      .then((response) => {
        setName(response.data.user.name);
        setUserId(response.data.user._id)
      })
      .catch((error) => {
        console.log("Este error es user", error);
      });
  }, [isLoggedIn]);


  useEffect(() => {
    axios.post(apiUrl + "/carts/createCartOnLogin?userID=" + userId)
      .then((res) => {
        console.log(res);
        AsyncStorage.getItem(res);
      })
      .catch((error) => {
        console.log("Este error es Cart", error);
      });
  }, [isLoggedIn]);


  return isLoggedIn ? (
    <>
      <View style={styles.containerUserAccount}>
        <Header />
        <View style={styles.containerProfile}>
          <View style={styles.imageProfile}>
            <Text style={styles.initialName}>{name.charAt(0).toUpperCase()}</Text>
          </View>
          <View>
            <Text style={styles.textUserName}>{name}</Text>
          </View>
          <View style={{}}>
            <Menu.Item
              leadingIcon="heart"
              style={{ color: "#fff" }}
              onPress={() => {}}
              title="My Favourites"
            />
            <Menu.Item
              leadingIcon="cart"
              onPress={() => {}}
              title="My shopping"
            />
          </View>
          <View>
            <TouchableOpacity onPress={sendLogout} style={styles.buttonLogout}>
              <Text style={styles.textLogout}>Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  ) : (
    <>
      <View style={styles.containerSignIn}>
        <Image
          style={{ width: 200, height: 50, top: 50, left: 80 }}
          source={require("../../assets/images/logo-white.png")}
        />
        <View style={styles.containerForm}>
          <Text style={styles.titleSignIn}>SIGN IN</Text>
          <View>
            <TextInput
              style={styles.input}
              underlineColor="transparent"
              activeUnderlineColor="transparent"
              label="Email"
              value={textEmail}
              onChangeText={(text) => setTextEmail(text)}
              theme={{
                colors: {
                  primary: "#00a524da",
                },
              }}
            />
            <TextInput
              style={styles.input}
              underlineColor="transparent"
              activeUnderlineColor="transparent"
              secureTextEntry={true}
              label="Password"
              value={textPassword}
              onChangeText={(text) => setTextPassword(text)}
              theme={{
                colors: {
                  primary: "#00a524da",
                },
              }}
            />
            <TouchableOpacity
              style={styles.buttonSignInGoogle}
              onPress={handleSubmit}
            >
              <Image
                source={require("../../assets/images/image-8.png")}
                style={styles.googleImg}
              />
              <Text style={styles.buttonTextSignInGoogle}>
                SIGN IN WITH GOOGLE
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonSignIn}
              onPress={handleSubmit}
            >
              <Text style={styles.buttonTextSignIn}>SIGN IN</Text>
            </TouchableOpacity>
            <View style={styles.containerLinks}>
              <TouchableOpacity
                style={styles.linkToRegister}
                onPress={handleLinkToRegister}
              >
                <Text style={{ textDecorationLine: "underline" }}>
                  You don't have an account yet?
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.linkToHome}
                onPress={handleLinkToHome}
              >
                <Text style={styles.textLinkToHome}>Go back to home page</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  containerSignIn: {
    backgroundColor: "#000",
    width: Dimensions.get("window").width,
    overflow: "hidden",
    height: Dimensions.get("window").height,
  },
  logo: {
    justifyContent: "center",
    alignItems: "center",
  },
  containerForm: {
    width: Dimensions.get("window").width,
    height: "80%",
    backgroundColor: Color.gainsboro,
    top: 85,
    borderTopLeftRadius: Border.br_56xl,
  },
  titleSignIn: {
    letterSpacing: 8,
    width: Dimensions.get("window").width,
    height: 79,
    fontSize: FontSize.size_base,
    color: Color.black,
    fontWeight: 700,
    top: 30,
    textAlign: "center",
    marginBottom: 10,
  },
  input: {
    width: "90%",
    justifyContent: "center",
    left: 20,
    marginBottom: 20,
    borderRadius: 20,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    height: 60,
    backgroundColor: "#fff",
    borderColor: "#fff",
  },
  buttonSignIn: {
    backgroundColor: Color.black,
    width: "90%",
    height: 60,
    left: 20,
    borderRadius: Border.br_xl,
    justifyContent: "center",
  },
  buttonTextSignIn: {
    textAlign: "center",
    color: Color.white,
    alignItems: "center",
    letterSpacing: 4,
    fontWeight: 700,
  },
  buttonSignInGoogle: {
    backgroundColor: Color.white,
    width: "90%",
    height: 60,
    left: 20,
    borderRadius: Border.br_xl,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 20,
    marginBottom: 15,
  },
  buttonTextSignInGoogle: {
    letterSpacing: 4,
    textAlign: "center",
    color: Color.black,
    alignItems: "center",
    fontSize: FontSize.size_xs,
    color: Color.black,
    fontWeight: 700,
  },
  googleImg: {
    width: 30,
    height: 30,
  },
  containerLinks: {
    textAlign: "center",
    top: 10,
    width: Dimensions.get("window").width,
    alignItems: "center",
    gap: 10,
  },
  textLinkToHome: {
    fontWeight: 600,
  },
  errorText: {
    color: "red",
  },
  containerUserAccount: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
    alignItems: "center",
  },
  buttonLogout: {
    backgroundColor: "#00a524da",
    borderRadius: Border.br_4xl_1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  containerProfile: {
    height: "65%",
    backgroundColor: Color.silver,
    borderRadius: 10,
    width: "85%",
    alignItems: "center",
    marginTop: 30,
  },
  textUserName: {
    color: Color.black,
    fontSize: FontSize.size_mid,
    letterSpacing: 4,
    paddingBottom: 10,
    fontWeight: "bold",
    width: "80%",
    marginTop: 10,
  },
  imageProfile: {
    justifyContent: "center",
    backgroundColor: "black",
    width: 90,
    height: 90,
    borderRadius: 50,
    borderColor: Color.white,
    borderWidth: 3,
    marginTop: 50,
  },
  initialName: {
    fontSize: 50,
    fontWeight: "semibold",
    color: Color.white,
    textAlign: "center",
  },
  textLogout: {
    width: 200,
    padding: 15,
    color: Color.white,
    fontSize: FontSize.size_mid,
    letterSpacing: 4,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default SignIn;
