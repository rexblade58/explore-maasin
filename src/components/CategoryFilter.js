import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Colors, Radius } from '../theme';

export default function CategoryFilter({ categories, selected, onSelect }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.container}>
      <TouchableOpacity style={[styles.chip, selected === null && styles.chipActive]} onPress={() => onSelect(null)}>
        <Text style={[styles.chipText, selected === null && styles.chipTextActive]}>All</Text>
      </TouchableOpacity>
      {categories.map(cat => (
        <TouchableOpacity key={cat} style={[styles.chip, selected === cat && styles.chipActive]} onPress={() => onSelect(selected === cat ? null : cat)}>
          <Text style={[styles.chipText, selected === cat && styles.chipTextActive]}>{cat}</Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { paddingHorizontal: 16, paddingVertical: 10, gap: 8 },
  chip: { paddingHorizontal: 14, paddingVertical: 9, borderRadius: Radius.pill, backgroundColor: Colors.card, borderWidth: 1, borderColor: Colors.border },
  chipActive: { backgroundColor: Colors.primary, borderColor: Colors.primary },
  chipText: { fontSize: 13, color: Colors.text, fontWeight: '600' },
  chipTextActive: { color: Colors.white },
});
