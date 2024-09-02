import { Image, Platform, View } from "react-native";
import { HelloWave } from "@/components/HelloWave";
import { ThemedText } from "@/components/ThemedText";


export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <ThemedText type="title">Welcome!</ThemedText>
      <HelloWave />
    </View>
  );
}
