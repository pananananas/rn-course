import { View, Text, SafeAreaView, Image } from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import { images } from "../../constants";
import FormField from "@/components/FormField";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";

const SignIn = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [isSubmitting, setisSubmitting] = useState(false);

  const submit = () => {};

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className=" justify-center w-full min-h-[85vh] my-6 px-4">
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
          />
          <View className="flex-row items-center justify-center mt-6">
            <Text className="text-gray-100 text-base">
              Don't have an account? {   }
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
