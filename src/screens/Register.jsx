import React from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Color, Border, FontSize } from "../../GlobalStyles";
import { TextInput, IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";

function Register() {
  const navigation = useNavigation();
  const [textName, setTextName] = React.useState("");
  const [textEmail, setTextEmail] = React.useState("");
  const [textPassword, setTextPassword] = React.useState("");

  async function handleSubmit() {
    let data = {
      name: textName,
      email: textEmail,
      password: textPassword,
    };
    console.log(data);
  }
  const handleLinkToSignIn = () => {
    navigation.navigate("TabNavigator", { screen: "User" });
  };

  const handleLinkToHome = () => {
    navigation.navigate("TabNavigator", { screen: "Home" });
  };

  return (
    <View style={styles.containerRegister}>
      <IconButton
        style={styles.backIcon}
        icon="arrow-left"
        iconColor={"#fff"}
        size={20}
        onPress={() => navigation.goBack()}
      />
      <Text style={styles.titleRegister}>REGISTER</Text>
      <View style={styles.containerForm}>
        <View>
          <TextInput
            style={styles.input}
            underlineColor="transparent"
            activeUnderlineColor="transparent"
            label="Name"
            value={textName}
            onChangeText={(text) => setTextName(text)}
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
            label="Password"
            value={textPassword}
            onChangeText={(text) => setTextPassword(text)}
            theme={{
              colors: {
                primary: "#00a524da",
              },
            }}
          />
          <View style={styles.containerButtons}>
            <TouchableOpacity
              style={styles.buttonSignUpGoogle}
              onPress={handleSubmit}
            >
              <Image
                source={require("../../assets/images/image-8.png")}
                style={styles.googleImg}
              />
              <Text style={styles.buttonTextSignUpGoogle}>
                SIGN UP WITH GOOGLE
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.buttonSignUp}
              onPress={handleSubmit}
            >
              <Text style={styles.buttonTextSignUp}>SIGN UP</Text>
            </TouchableOpacity>
            <View style={styles.containerLinks}>
              <TouchableOpacity
                style={styles.linkToSignIn}
                onPress={handleLinkToSignIn}
              >
                <Text style={{ textDecorationLine: "underline" }}>
                  Already have an account?
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
    </View>
  );
}

const styles = StyleSheet.create({
  containerRegister: {
    backgroundColor: "#000",
    width: Dimensions.get("window").width,
    overflow: "hidden",
    height: Dimensions.get("window").height,
  },
  containerForm: {
    width: Dimensions.get("window").width,
    height: "90%",
    backgroundColor: Color.gainsboro,
    top: -30,
    borderTopLeftRadius: Border.br_56xl,
  },
  titleRegister: {
    letterSpacing: 8,
    width: Dimensions.get("window").width,
    height: 79,
    fontSize: FontSize.size_base,
    color: Color.white,
    fontWeight: 700,
    top: 10,
    textAlign: "center",
    marginBottom: 20,
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
    top: 60,
  },
  buttonSignUp: {
    backgroundColor: Color.black,
    width: "90%",
    height: 60,
    left: 20,
    borderRadius: Border.br_xl,
    justifyContent: "center",
  },
  buttonTextSignUp: {
    textAlign: "center",
    color: Color.white,
    alignItems: "center",
    letterSpacing: 4,
    fontWeight: 700,
  },
  buttonSignUpGoogle: {
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
  buttonTextSignUpGoogle: {
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
  containerButtons: {
    top: 80,
  },
  backIcon: {
    top: 45,
    left: 10,
  },
});

export default Register;
