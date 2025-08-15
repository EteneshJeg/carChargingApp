import * as Location from "expo-location";

import MapView, { Marker } from "react-native-maps";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

export default function MyMaps() {
  const [region, setRegion] = useState(null);

  const locations = [
    {
      lat: 9.597564734508111,
      lng: 41.854183924775484,
      label: "Biftu Mall Charging Station",
    },
  ];

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    })();
  }, []);

  if (!region) {
    return <View style={{ height: 420, backgroundColor: "#ccc" }} />;
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={region} // ✅ Use region object here
      >
        {locations.map((loc, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: loc.lat,
              longitude: loc.lng,
            }}
            title={loc.label}
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 420,
    width: "100%",
    borderRadius: 20,
    overflow: "hidden",
  },
  map: {
    flex: 1,
  },
});
