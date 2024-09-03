import { useEffect, useState } from "react";
import { Alert } from "react-native";

const useAppwrite = (fn: () => any) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const fetchData = async () => {
    setIsLoading(true);
    try {
      const response = await fn();
      setData(response);
    } catch (error) {
      Alert.alert("Error", "Failed to fetch data");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  });

  const refetch = () => fetchData();

  return { data, isLoading, refetch };
};

export default useAppwrite;