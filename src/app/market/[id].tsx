import { useEffect, useState } from "react";
import { View, Alert } from "react-native";
import { router, useLocalSearchParams, Redirect } from "expo-router";

import { Loading } from "@/components/loading";
import { Cover } from "@/components/market/cover";
import { Details, PropsDetails } from "@/components/market/details";

import { api } from "@/services/api";
import { s } from "@/components/market/styles";

type DataProps = PropsDetails & {
  cover: string;
};

export default function Marker() {
  const [data, setData] = useState<DataProps>();
  const [isLoading, setIsLoading] = useState(true);

  const params = useLocalSearchParams<{ id: string }>();
  console.log(params.id);

  async function fetchMarket() {
    try {
      const { data } = await api.get(`/markets/${params.id}`);
      setData(data);
      console.log(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      Alert.alert(
        "Erro ao carregar os locais ",
        "Por favor, tente novamente mais tarde.",
        [
          {
            text: "Voltar",
            //onPress: () => (router.canGoBack() ? router.back() : null),
            onPress: () => router.back(),
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

  if (!data) {
    return <Redirect href="/home" />;
  }

  return (
    <View style={s.container}>
      <Cover uri={data.cover} />
      <Details data={data} />
    </View>
  );
}
