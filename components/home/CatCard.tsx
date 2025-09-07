import { Image, StyleSheet, View } from "react-native";
import { CatInfo } from "./CatInfo";

const CAT_PLACEHOLDER = require("../../assets/images/cat_placeholder.png");

export type CatCardProps = {
  image: string;
  id: string;
  name: string;
  origin: string;
  affectionLevel: number;
};

export const CatCard = ({
  image,
  name,
  origin,
  affectionLevel,
}: CatCardProps) => {
  return (
    <View style={styles.container}>
      <Image
        source={image ? { uri: image } : CAT_PLACEHOLDER}
        style={styles.image}
        resizeMode="cover"
      />
      <CatInfo name={name} origin={origin} affectionLevel={affectionLevel} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    width: "100%",
    height: "100%",
  },
  image: {
    height: "100%",
    width: "100%",
    borderRadius: 15,
  },
});
