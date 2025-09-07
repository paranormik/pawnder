import { NunitoSans_400Regular, NunitoSans_600SemiBold, NunitoSans_700Bold } from '@expo-google-fonts/nunito-sans';

declare module 'expo-font' {
  export function useFonts(
    options: {
      [key: string]: typeof NunitoSans_400Regular | typeof NunitoSans_600SemiBold | typeof NunitoSans_700Bold;
    }
  ): [boolean, Error | null];
}
