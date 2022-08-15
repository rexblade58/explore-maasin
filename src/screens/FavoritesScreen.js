import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, StatusBar, Platform, TouchableOpacity } from 'react-native';
import { places } from '../data/places';
import { Colors, Typography, Radius, Shadow, SafeAreaStyle } from '../theme';

export default function FavoritesScreen() {
  const [favorites, setFavorites] = useState([1, 2, 5, 9, 10]);
  const saved = places.filter(p => favorites.includes(p.id));
  const toggle = id => setFavorites(prev => prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      <View style={[styles.header, { paddingTop: Platform.OS === 'android' ? SafeAreaStyle + 8 : 8 }]}>
        <Text style={styles.headerTitle}>Saved Places</Text>
        <Text style={styles.headerSub}>{saved.length} places in your collection</Text>
      </View>
      <FlatList
        data={saved}
        keyExtractor={i => String(i.id)}
        renderItem={({ item }) => (
          <View style={[styles.row, Shadow.card]}>
            <View style={styles.rowIcon}><Text style={styles.rowEmoji}>{item.icon}</Text></View>
            <View style={styles.rowContent}>
              <Text style={styles.rowName}>{item.name}</Text>
              <Text style={styles.rowCat}>{item.category} · {item.tags[0]}</Text>
            </View>
            <TouchableOpacity onPress={() => toggle(item.id)} style={styles.heartBtn}><Text style={styles.heart}>♥</Text></TouchableOpacity>
          </View>
        )}
        contentContainerStyle={styles.list}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: { backgroundColor: Colors.primary, paddingHorizontal: 20, paddingBottom: 18 },
  headerTitle: { ...Typography.title, color: Colors.white },
  headerSub: { fontSize: 14, color: 'rgba(255,255,255,0.85)', marginTop: 4 },
  list: { padding: 16 },
  row: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.card, borderRadius: Radius.md, padding: 14, marginBottom: 10 },
  rowIcon: { width: 46, height: 46, borderRadius: Radius.sm, backgroundColor: Colors.background, justifyContent: 'center', alignItems: 'center', marginRight: 12 },
  rowEmoji: { fontSize: 22 },
  rowContent: { flex: 1 },
  rowName: { ...Typography.subtitle, color: Colors.text, fontSize: 15 },
  rowCat: { fontSize: 12, color: Colors.textLight, marginTop: 2 },
  heartBtn: { width: 40, height: 40, borderRadius: 20, backgroundColor: '#FDEDEC', justifyContent: 'center', alignItems: 'center' },
  heart: { fontSize: 20, color: Colors.danger },
});
