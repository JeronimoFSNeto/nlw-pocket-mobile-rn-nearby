import { Text, View, Alert } from "react-native";
import { router, useLocalSearchParams } from "expo-router";

import { api } from "@/services/api";
import { s } from "@/components/market/styles";
import { useEffect, useState } from "react";
import { Loading } from "@/components/loading";

export default function Marker() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const params = useLocalSearchParams<{ id: string }>();
  async function fetchMarket() {
    try {
      const { data } = await api.get(`/markets/${params.id}`);
      setData(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Erro ao carregar os locais ",
        "Por favor, tente novamente mais tarde.",
        [
          {
            text: "Voltar",
            onPress: () => (router.canGoBack() ? router.back() : null),
          },
        ]
      );
    }
  }

  useEffect(() => {
    fetchMarket();
  }, [params.id]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={s.container}>
      <Text>{params.id}</Text>
    </View>
  );
}
