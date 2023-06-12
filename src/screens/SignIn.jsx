import React, {useState} from "react";
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { Color, Border, FontSize } from "../../GlobalStyles";
import { TextInput } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";


function SignIn() {
  const navigation = useNavigation();
  const [textEmail, setTextEmail] = useState("");
  const [textPassword, setTextPassword] = useState("");
  // const [error, setError] = useState([]);

  async function handleSubmit() {
    let data = {
      email: textEmail,
      password: textPassword,
    };
    console.log(data);
  }
  const handleLinkToRegister = () => {
    navigation.navigate('Register', { screen: 'Register' }) 
  };

  const handleLinkToHome = () => {
    navigation.navigate("Home");
  };

//   useEffect(() => {
//     const obligatoryField = '*Campo obligatorio';
//     const emailFormatValidation = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

//     setError({ ...error, email: textEmail !== '' ? '' : obligatoryField })

//     if (!emailFormatValidation.test(textEmail) && textEmail !== '') {
//         setError({ ...error, email: 'Formato requerido: email@email.com' })
//     }
// }, [textEmail])

  return (
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
          {/* <Text style={styles.errorText}>{error?.email}</Text> */}
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
          <TouchableOpacity style={styles.buttonSignIn} onPress={handleSubmit}>
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
  }
});

export default SignIn;


