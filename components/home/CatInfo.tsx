import { View, Text, StyleSheet } from 'react-native';

type CatInfoProps = {
  name: string;
  origin: string;
  affectionLevel: number;
};

export const CatInfo = ({ name, origin, affectionLevel }: CatInfoProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.affectionLevel}>{affectionLevel}</Text>
      </View>
      <Text style={styles.origin}>{origin}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 24,
    right: 24,
    gap: 2,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: {
    fontFamily: 'NunitoSans-Bold',
    fontSize: 16,
    lineHeight: 20,
    color: '#434141',
  },
  affectionLevel: {
    fontFamily: 'NunitoSans-Bold',
    fontSize: 16,
    lineHeight: 20,
    color: '#434141',
    textAlign: 'right',
  },
  origin: {
    fontFamily: 'NunitoSans-Bold',
    fontSize: 8,
    lineHeight: 10,
    color: '#BFBFC0',
  },
});
