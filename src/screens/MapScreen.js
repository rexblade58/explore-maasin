import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView, StatusBar, Platform, TouchableOpacity } from 'react-native';
import { places } from '../data/places';
import { Colors, Typography, Radius, Shadow, SafeAreaStyle } from '../theme';

export default function MapScreen({ route, navigation }) {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    if (route?.params?.placeId) setSelected(places.find(p => p.id === route.params.placeId));
  }, [route]);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      <View style={[styles.header, { paddingTop: Platform.OS === 'android' ? SafeAreaStyle + 8 : 8 }]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.back}>‹</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Maasin City Map</Text>
      </View>
      <View style={styles.mapArea}>
        <Text style={styles.mapEmoji}>🗺️</Text>
        <Text style={styles.mapTitle}>Maasin City, Southern Leyte</Text>
        <View style={styles.coordPill}><Text style={styles.coordText}>Google Maps API required for live map</Text></View>
      </View>
      <ScrollView style={styles.list}>
        {places.map(p => (
          <TouchableOpacity key={p.id} style={[styles.row, Shadow.card, selected?.id === p.id && styles.rowActive]} onPress={() => setSelected(p)}>
            <View style={styles.rowIcon}><Text style={styles.rowEmoji}>{p.icon}</Text></View>
            <View style={styles.rowContent}>
              <Text style={styles.rowName}>{p.name}</Text>
              <Text style={styles.rowCoords}>{p.lat.toFixed(4)}, {p.lng.toFixed(4)}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      {selected && (
        <View style={[styles.detail, Shadow.card]}>
          <Text style={styles.detailName}>{selected.icon} {selected.name}</Text>
          <Text style={styles.detailCat}>{selected.category}</Text>
          <Text style={styles.detailDesc}>{selected.desc}</Text>
          <Text style={styles.detailCoord}>📍 {selected.lat.toFixed(6)}° N, {selected.lng.toFixed(6)}° E</Text>
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: { backgroundColor: Colors.primary, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingBottom: 16 },
  back: { fontSize: 32, color: Colors.white, marginRight: 10 },
  headerTitle: { ...Typography.heading, color: Colors.white },
  mapArea: { height: 200, backgroundColor: '#E8F4FD', justifyContent: 'center', alignItems: 'center', padding: 20 },
  mapEmoji: { fontSize: 48 },
  mapTitle: { ...Typography.subtitle, color: Colors.primary, marginTop: 8 },
  coordPill: { backgroundColor: 'rgba(26,82,118,0.1)', paddingHorizontal: 14, paddingVertical: 6, borderRadius: Radius.pill, marginTop: 10 },
  coordText: { fontSize: 12, color: Colors.primaryLight },
  list: { flex: 1, padding: 16 },
  row: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.card, borderRadius: Radius.md, padding: 12, marginBottom: 8 },
  rowActive: { borderWidth: 2, borderColor: Colors.secondary },
  rowIcon: { width: 40, height: 40, borderRadius: Radius.sm, backgroundColor: Colors.background, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  rowEmoji: { fontSize: 20 },
  rowContent: { flex: 1 },
  rowName: { ...Typography.subtitle, color: Colors.text, fontSize: 15 },
  rowCoords: { fontSize: 12, color: Colors.textLight, marginTop: 2 },
  detail: { position: 'absolute', left: 12, right: 12, bottom: 12, backgroundColor: Colors.card, borderRadius: Radius.lg, padding: 20 },
  detailName: { ...Typography.subtitle, color: Colors.text },
  detailCat: { fontSize: 12, color: Colors.primaryLight, textTransform: 'uppercase', marginTop: 2 },
  detailDesc: { color: Colors.textLight, marginTop: 8 },
  detailCoord: { fontSize: 12, color: Colors.primary, marginTop: 8 },
});
