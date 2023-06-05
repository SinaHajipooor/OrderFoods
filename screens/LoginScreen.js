import { useContext, useState } from "react";
import {
  Image,
  Pressable,
  Text,
  StyleSheet,
  TextInput,
  View,
  Alert,
} from "react-native";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { login } from "../util/auth";
import { GlobalStyles } from "../constants/colors";
//---------------------------------------------------------------------------------------------------
const LoginScreen = ({ navigation }) => {
  //------------------------------------------
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  //------------------------------------------
  const [phoneNumber, setPhoneNumber] = useState("");
  const phoneNumberChangeHandler = (enteredPhoneNumber) => {
    setPhoneNumber(enteredPhoneNumber);
  };
  //------------------------------------------
  const loginHandler = async () => {
    if (phoneNumber.length == 11) {
      setIsAuthenticating(true);
      const data = await login(phoneNumber);
      setIsAuthenticating(false);
      navigation.navigate("Authenticate", { data: data });
    } else {
      Alert.alert("خطایی رخ داده است", "شماره همراه نامعتبر است");
    }
  };
  //------------------------------------------
  if (isAuthenticating) {
    return <LoadingOverlay message="منتظر بمانید" />;
  }

  //------------------------------------------
  return (
    <View style={styles.root}>
      <View style={styles.formConatiner}>
        <TextInput
          style={styles.input}
          placeholder="شماره همراه"
          keyboardType="phone-pad"
          value={phoneNumber}
          onChangeText={phoneNumberChangeHandler}
        />
        <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.pressed]}
          onPress={loginHandler}
        >
          <Text style={{ color: "black" }}>دریافت کد تایید</Text>
        </Pressable>
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={require("../assets/hamber.png")}
          style={{ width: 350, marginTop: 50, height: 250 }}
        />
      </View>
    </View>
  );
};
//---------------------------------------------------------------------------------------------------

export default LoginScreen;
const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  imageContainer: {
    marginTop: 20,
    marginBottom: 50,
  },
  formConatiner: {
    alignItems: "center",
    justifyContent: "flex-start",
    width: "90%",
    height: "30%",
    marginTop: 60,
  },
  input: {
    width: "95%",
    height: 50,
    marginTop: 40,
    padding: 10,
    marginHorizontal: 5,
    elevation: 3,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    backgroundColor: GlobalStyles.colors.gray,
  },
  button: {
    width: "95%",
    marginTop: 25,
    padding: 10,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    // elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.5,
    backgroundColor: GlobalStyles.colors.yellow,
    borderWidth: 0.5,
    borderColor: GlobalStyles.colors.orange,
    borderStyle: "dashed",
  },
  pressed: {
    opacity: 0.5,
  },
});
