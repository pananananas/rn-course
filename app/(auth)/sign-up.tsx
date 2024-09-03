import { View, Text, SafeAreaView, Image, Alert } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import CustomButton from "@/components/CustomButton";
import FormField from "@/components/FormField";
import { createUser } from "@/lib/appwrite";
import React, { useState } from "react";
import { images } from "@/constants";
import { Link, router } from "expo-router";
import { useGlobalContext } from "@/context/GlobalProvider";

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [isSubmitting, setisSubmitting] = useState(false);
  const { setUser, setIsLogged } = useGlobalContext();

  const submit = async () => {
    if (!form.email || !form.password || !form.username) {
      Alert.alert("Error", "Please fill all fields");
    }
    setisSubmitting(true);
    try {
      const result = await createUser(form.email, form.password, form.username);
      setUser(result);
      setIsLogged(true);

      router.replace("/home");
    } catch (error: any) {
      Alert.alert("Error", String(error.message));
    } finally {
      setisSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className=" justify-center w-full h-full my-6 px-4">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Sign up to app
          </Text>
          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e: string) =>
              setForm({
                ...form,
                username: e,
              })
            }
            otherStyles="mt-6"
            placeholder="Enter your username"
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e: string) =>
              setForm({
                ...form,
                email: e,
              })
            }
            otherStyles="mt-6"
            placeholder="Enter your email"
            keyboardType="email-address"
          />
          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e: string) =>
              setForm({
                ...form,
                password: e,
              })
            }
            otherStyles="mt-6"
            placeholder="Enter your password"
          />
          <CustomButton
            title="Sign in"
            handlePress={submit}
            containerStyles="mt-7 px-6"
            isLoading={isSubmitting}
            textStyles={""}
          />
          <View className="flex-row items-center justify-center mt-6">
            <Text className="text-gray-100 text-base">
              Have an account already? {}
            </Text>
            <Link href="/sign-in">
              <Text className="text-secondary text-base font-psemibold ml-1">
                Sign in
              </Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
