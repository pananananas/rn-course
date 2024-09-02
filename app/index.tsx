import { Link } from "expo-router";
import { Image, Platform, View, Text } from "react-native";

export default function HomeScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-blue text-4xl font-bold font-pblack">Welcome!</Text>
      <Link href="/home"> Home</Link>
    </View>
  );
}
