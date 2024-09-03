import { View, Text, SafeAreaView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { images } from "../../constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { signIn } from "@/lib/appwrite";
import { Link, router } from "expo-router";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setisSubmitting] = useState(false);

  const submit = async () => {
    if (!form.email || !form.password) {
      Alert.alert("Error", "Please fill all fields");
    }
    setisSubmitting(true);
    try {
      await signIn(form.email, form.password);
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
        <View className=" justify-center w-full wh-full my-6 px-4">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl text-white text-semibold mt-10 font-psemibold">
            Sign in to app
          </Text>
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
              Don't have an account? {}
            </Text>
            <Link href="/sign-up">
              <Text className="text-secondary text-base font-psemibold ml-1">
                Sign up
              </Text>
            </Link>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignIn;
