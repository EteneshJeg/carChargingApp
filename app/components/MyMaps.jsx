import MapView, { Callout, Marker, UrlTile } from "react-native-maps";
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
      <MapView style={styles.map} initialRegion={initialRegion}>
        {/* OpenStreetMap free tiles */}
        <UrlTile
          urlTemplate="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          maximumZ={19}
          flipY={false}
        />

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
    overflow: "hidden",
  },
  map: {
    flex: 1,
  },
});
