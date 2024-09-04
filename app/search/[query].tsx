import { View, Text, SafeAreaView, FlatList } from "react-native";
import { useLocalSearchParams } from "expo-router";
import SearchInput from "@/components/SearchInput";
import EmptyState from "@/components/EmptyState";
import VideoCard from "@/components/VideoCard";
import { searchPosts } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";

const Search = () => {
  const { query } = useLocalSearchParams();
  const { data: posts, refetch } = useAppwrite(() => searchPosts(query));

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <>
      <SafeAreaView className="bg-primary h-full">
        <FlatList
          data={posts}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => <VideoCard video={item} />}
          ListHeaderComponent={() => (
            <>
              <View className="flex my-6 px-4">
                <Text className="font-pmedium text-gray-100 text-sm">
                  Search Results
                </Text>
                <Text className="text-2xl font-psemibold text-white mt-1">
                  {query}
                </Text>

                <View className="mt-6 mb-8">
                  <SearchInput initialQuery={query} refetch={refetch} />
                </View>
              </View>
            </>
          )}
          ListEmptyComponent={() => (
            <EmptyState
              title="No Videos Found"
              subtitle="No videos found for this search query"
            />
          )}
        />
      </SafeAreaView>
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default Search;
