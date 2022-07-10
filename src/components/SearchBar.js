import React from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { Colors, Radius, Shadow } from '../theme';

export default function SearchBar({ value, onChangeText }) {
  return (
    <View style={[styles.wrap, Shadow.card]}>
      <Text style={styles.icon}>🔍</Text>
      <TextInput style={styles.input} value={value} onChangeText={onChangeText} placeholder="Search places, food, culture..." placeholderTextColor={Colors.textLight} autoCorrect={false} />
      {value ? <TouchableOpacity onPress={() => onChangeText('')}><Text style={styles.clear}>✕</Text></TouchableOpacity> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.card, borderRadius: Radius.pill, paddingHorizontal: 18, marginHorizontal: 16, marginTop: 12, height: 52, gap: 10 },
  icon: { fontSize: 16 },
  input: { flex: 1, fontSize: 15, color: Colors.text, height: '100%' },
  clear: { fontSize: 14, color: Colors.textLight, padding: 4 },
});
