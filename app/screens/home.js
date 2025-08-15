import {
  Button,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import MyMaps from "../components/MyMaps";
import React from "react";

function Home({ navigation }) {
  const handleClick = () => {
    navigation.navigate("QR");
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={{
          uri: "https://cdn.mos.cms.futurecdn.net/SGHTwDLfSRtxSUBy3kibD.jpg",
        }}
        resizeMode="cover"
        style={styles.backgroundImage}
      >
        <View style={styles.mapWrapper}>
          <MyMaps />
        </View>

        <View style={styles.headlineWrapper}>
          <View style={styles.headlineBackground}>
            <Text style={styles.headlineText}>Charge Your EV Effortlessly</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.ctaButton}
          onPress={handleClick}
          activeOpacity={0.8}
        >
          <Text style={styles.ctaButtonText}>Get Started</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mapWrapper: {
    width: "80%",
    maxWidth: 400,
    borderWidth: 2,
    borderColor: "#1e40af",
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 8,
  },
  headlineWrapper: {
    marginBottom: 12,
    zIndex: 10,
  },
  headlineBackground: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 1 },
    elevation: 6,
  },
  headlineText: {
    fontSize: 30,
    fontWeight: "800",
    color: "#fff",
    textAlign: "center",
    textShadowColor: "rgba(0,0,0,0.35)",
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 6,
  },
  ctaButton: {
    backgroundColor: "#1C398E",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 50,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 10,
    zIndex: 10,
    marginTop: 10,
  },
  ctaButtonText: {
    color: "white",
    fontWeight: "600",
    fontSize: 18,
    textAlign: "center",
  },
});
