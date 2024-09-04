import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { icons } from "../constants";
import React, { useState } from "react";
import { router, usePathname } from "expo-router";

interface SearchInputProps {
  initialQuery?: string;
  title: string;
  value: string;
  placeholder: string;
  handleChangeText: (text: string) => void;
  otherStyles: string;
}

const SearchInput: React.FC<SearchInputProps> = ({
  initialQuery,
  title,
  value,
  placeholder,
  handleChangeText,
  otherStyles,
  ...props
}) => {
  const pathname = usePathname();

  const [query, setQuery] = useState(initialQuery || "");
  return (
    <View className="w-full h-16 px-4 bg-black-100 border-2 border-black-200 rounded-2xl focus:border-secondary items-center flex-row space-x-4">
      <TextInput
        className="w-full h-full flex-1 text-white text-base mt-0.5 font-pregular"
        value={query}
        onChangeText={(e) => setQuery(e)}
        placeholder={placeholder}
        placeholderTextColor="#CDCDE0"
        onTextChange={handleChangeText}
        {...props}
      />

      <TouchableOpacity
        onPress={() => {
          if (!query)
            return Alert.alert("Missing query", "Please enter a search query");

          if (pathname.startsWith("/search")) router.setParams({ query });
          else router.push(`/search/${query}`);
        }}
      >
        <Image source={icons.search} className="w-5 h-5" resizeMode="contain" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchInput;
