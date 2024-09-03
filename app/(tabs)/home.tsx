import SearchInput from "@/components/SearchInput";
import EmptyState from "@/components/EmptyState";
import Trending from "@/components/Trending";
import { StatusBar } from "expo-status-bar";
import { images } from "@/constants";
import { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  RefreshControl,
} from "react-native";

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = async () => {
    setRefreshing(true);

    // TODO: Refresh

    setRefreshing(false);
  };

  return (
    <>
      <SafeAreaView className="bg-primary h-full">
        <FlatList
          data={[{ id: 1 }, { id: 2 }, { id: 3 }]}
          // data={[]}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => (
            <Text className="text-3xl text-white">{item.id}</Text>
          )}
          ListHeaderComponent={() => (
            <View className="my-6 px-4 space-y-6">
              <View className="justify-between items-start flex-row mb-6">
                <View>
                  <Text className="font-pmedium text-sm text-gray-100">
                    Welcome back
                  </Text>
                  <Text className="text-2xl font-psemibold text-white">
                    Username
                  </Text>
                </View>
                <View className="mt-1.5">
                  <Image
                    source={images.logoSmall}
                    className="w-9 h-10"
                    resizeMode="contain"
                  />
                </View>
              </View>
              <SearchInput placeholder="Search for a video" />
              <View className="w-full flex-1 pt-5 pb-8">
                <Text className="text-gray-100 text-lg fint-pregular mb-3">
                  Latest videos
                </Text>
                <Trending posts={[{ id: 1 }, { id: 2 }, { id: 3 }]} />
              </View>
            </View>
          )}
          ListEmptyComponent={() => (
            <EmptyState
              title="No videos found"
              subtitle="Be the first one to upload a video"
            />
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      </SafeAreaView>
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default Home;
