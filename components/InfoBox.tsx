import { View, Text } from "react-native";

const InfoBox = ({
  title,
  subtitle,
  containerStyles,
  titleStyles,
}: {
  title: string;
  subtitle: string;
  containerStyles: string;
  titleStyles: string;
}) => {
  return (
    <View className={containerStyles}>
      <Text className={` text-white font-psemibold text-center ${titleStyles}`}>
        {title}
      </Text>
      <Text className="text-sm text-gray-100 text-center font-pregular">
        {subtitle}
      </Text>
    </View>
  );
};

export default InfoBox;
