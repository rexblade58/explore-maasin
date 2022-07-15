import React, { useMemo, useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, StatusBar, Platform } from 'react-native';
import { places, categories } from '../data/places';
import { Colors, Typography, SafeAreaStyle } from '../theme';
import PlaceCard from '../components/PlaceCard';
import CategoryFilter from '../components/CategoryFilter';
import SearchBar from '../components/SearchBar';

export default function HomeScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);

  const filtered = useMemo(() => places.filter(p => {
    const matchesCategory = !selectedCategory || p.category === selectedCategory;
    const q = search.trim().toLowerCase();
    const matchesSearch = !q || p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q) || p.tags.some(t => t.toLowerCase().includes(q));
    return matchesCategory && matchesSearch;
  }), [search, selectedCategory]);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
      <View style={[styles.header, { paddingTop: Platform.OS === 'android' ? SafeAreaStyle + 8 : 8 }]}>
        <Text style={styles.title}>Explore Maasin</Text>
        <Text style={styles.sub}>Discover the beauty of Southern Leyte</Text>
      </View>
      <SearchBar value={search} onChangeText={setSearch} />
      <CategoryFilter categories={categories} selected={selectedCategory} onSelect={setSelectedCategory} />
      <FlatList
        data={filtered}
        keyExtractor={i => String(i.id)}
        renderItem={({ item }) => (
          <PlaceCard place={item} onPress={() => navigation.navigate('Map', { placeId: item.id })} />
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  header: { backgroundColor: Colors.primary, paddingHorizontal: 20, paddingBottom: 18 },
  title: { ...Typography.title, color: Colors.white },
  sub: { fontSize: 14, color: 'rgba(255,255,255,0.85)', marginTop: 4 },
  list: { paddingBottom: 30 },
});
