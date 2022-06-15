import { Platform, StatusBar } from 'react-native';

export const Colors = {
  primary: '#1A5276',
  primaryLight: '#2980B9',
  secondary: '#16A085',
  accent: '#F39C12',
  background: '#F0F4F8',
  card: '#FFFFFF',
  text: '#1C2B39',
  textLight: '#5D7186',
  border: '#E1E9F0',
  danger: '#E74C3C',
  white: '#FFFFFF',
};

export const Typography = {
  title: { fontSize: 28, fontWeight: '800' },
  heading: { fontSize: 20, fontWeight: '700' },
  subtitle: { fontSize: 16, fontWeight: '600' },
  body: { fontSize: 14, lineHeight: 20 },
  caption: { fontSize: 12 },
};

export const Radius = { sm: 8, md: 12, lg: 20, pill: 50 };

export const Shadow = {
  card: Platform.select({
    ios: { shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 12 },
    android: { elevation: 4 },
    default: {},
  }),
};

export const SafeAreaStyle = Platform.OS === 'android' ? StatusBar.currentHeight : 0;
