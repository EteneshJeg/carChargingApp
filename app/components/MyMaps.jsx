import MapView, { Callout, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { StyleSheet, Text, View } from "react-native";

import { MapPin } from "lucide-react-native";
import React from "react";

export default function MyMaps() {
  const locations = [
    {
      lat: 9.597564734508111,
      lng: 41.854183924775484,
      label: "Biftu Mall Charging Station",
    },
  ];

  const initialRegion = {
    latitude: locations[0].lat,
    longitude: locations[0].lng,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={initialRegion}
        showsUserLocation={false}
        showsMyLocationButton={false}
      >
        {locations.map(({ lat, lng, label }, idx) => (
          <Marker key={idx} coordinate={{ latitude: lat, longitude: lng }}>
            <View>
              <MapPin size={32} color="#2563eb" />
            </View>
            <Callout>
              <Text>{label}</Text>
            </Callout>
          </Marker>
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
    overflow: "hidden", // for rounded corners on map
  },
  map: {
    flex: 1,
  },
});
