import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Colors, Radius, Shadow, Typography } from '../theme';

const EmojiMap = {
  church: '⛪', mountain: '⛰️', building: '🏢', bridge: '🌉',
  water: '💧', market: '🛒', port: '⛴️', school: '🎓',
  beach: '🏖️', reef: '🪸', river: '🌊', museum: '🏛️',
  hospital: '🏥', cave: '🕳️', park: '🌳', festival: '🎉',
};

export default function PlaceCard({ place, onPress }) {
  return (
    <TouchableOpacity style={[styles.card, Shadow.card]} onPress={onPress} activeOpacity={0.85}>
      <View style={styles.iconWrap}>
        <Text style={styles.icon}>{EmojiMap[place.icon] || '📍'}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={1}>{place.name}</Text>
        <View style={styles.badgeRow}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{place.category}</Text>
          </View>
          {place.rating ? (
            <View style={styles.ratingBadge}>
              <Text style={styles.ratingText}>★ {place.rating.toFixed(1)}</Text>
            </View>
          ) : null}
        </View>
        <Text style={styles.desc} numberOfLines={2}>{place.desc}</Text>
        <View style={styles.tagRow}>
          {place.tags.slice(0, 3).map(t => (
            <View key={t} style={styles.tag}><Text style={styles.tagText}>#{t}</Text></View>
          ))}
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { flexDirection: 'row', backgroundColor: Colors.card, borderRadius: Radius.lg, padding: 16, marginHorizontal: 16, marginVertical: 6 },
  iconWrap: { width: 56, height: 56, borderRadius: Radius.md, backgroundColor: Colors.background, justifyContent: 'center', alignItems: 'center', marginRight: 14 },
  icon: { fontSize: 28 },
  content: { flex: 1 },
  title: { fontSize: 16, fontWeight: '700', color: Colors.text, marginBottom: 4 },
  badgeRow: { flexDirection: 'row', gap: 6 },
  categoryBadge: { backgroundColor: '#E8F4FD', paddingHorizontal: 10, paddingVertical: 3, borderRadius: Radius.pill },
  categoryText: { fontSize: 11, color: Colors.primaryLight, fontWeight: '600', textTransform: 'uppercase' },
  ratingBadge: { backgroundColor: '#FFF8E1', paddingHorizontal: 10, paddingVertical: 3, borderRadius: Radius.pill },
  ratingText: { fontSize: 11, color: '#F39C12', fontWeight: '700' },
  desc: { fontSize: 13, color: Colors.textLight, marginTop: 8 },
  tagRow: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 8, gap: 6 },
  tag: { backgroundColor: Colors.background, paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6 },
  tagText: { fontSize: 11, color: Colors.primaryLight },
});
