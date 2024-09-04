import {
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";
import { useGlobalContext } from "@/context/GlobalProvider";
import EmptyState from "@/components/EmptyState";
import VideoCard from "@/components/VideoCard";
import { getUserPosts, signOut } from "@/lib/appwrite";
import useAppwrite from "@/lib/useAppwrite";
import { StatusBar } from "expo-status-bar";
import InfoBox from "@/components/InfoBox";
import { icons } from "@/constants";
import { router } from "expo-router";

const Profile = () => {
  const { user, setUser, setIsLogged } = useGlobalContext();
  const { data: posts } = useAppwrite(() => getUserPosts(user.$id));

  const logout = async () => {
    await signOut();
    setUser(null);
    setIsLogged(false);
    router.replace('/sign-in');
  };
  // console.log(user)
  return (
    <>
      <SafeAreaView className="bg-primary h-full">
        <FlatList
          data={posts}
          keyExtractor={(item) => item.$id}
          renderItem={({ item }) => <VideoCard video={item} />}
          ListHeaderComponent={() => (
            <View className="w-full justify-center items-center mt-6 mb-12 px-4">
              <TouchableOpacity
                className="w-full items-end mb-10"
                onPress={logout}
              >
                <Image
                  source={icons.logout}
                  className="w-6 h-6"
                  resizeMode="contain"
                />
              </TouchableOpacity>

              <View className="w-16 h-16 border border-secondary rounded-full justify-center items-center">
                <Image
                  source={{ uri: user?.avatar }}
                  className="w-[80%] h-[80%] rounded-full"
                  resizeMode="cover"
                />
              </View>
              <InfoBox
                title={user?.name}
                containerStyles="mt-5"
                titleStyles="text-lg"
              />
              <View className="mt-5 flex-row">
                <InfoBox
                  title={posts.length || 0}
                  subtitle="Posts"
                  containerStyles="mr-10"
                  titleStyles="text-xl"
                />
                <InfoBox title={0} subtitle="Followers" titleStyles="text-xl" />
              </View>
            </View>
          )}
          ListEmptyComponent={() => (
            <EmptyState
              title="No Videos Found"
              subtitle="It's time for your first video!"
            />
          )}
        />
      </SafeAreaView>
      <StatusBar backgroundColor="#161622" style="light" />
    </>
  );
};

export default Profile;
