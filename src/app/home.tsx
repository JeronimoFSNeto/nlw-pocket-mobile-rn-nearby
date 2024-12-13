import { useEffect, useState } from "react";
import { View, Alert, Text } from "react-native";
import MapView, { Callout, Marker } from "react-native-maps";
import { router } from "expo-router";

import { api } from "@/services/api";
import { s } from "@/components/home/styles";

import { Places } from "@/components/places";
import { PlaceProps } from "@/components/place";
import { Categories, CategoriesProps } from "@/components/categories";

type MakertsProps = PlaceProps & {
  latitude: number;
  longitude: number;
};

const currentLocation = {
  latitude: -23.561187293883442,
  longitude: -46.656451388116494,
};

export default function Home() {
  const [categories, setCategories] = useState<CategoriesProps>([]);
  const [category, setCategory] = useState("");
  const [markets, setMarkets] = useState<MakertsProps[]>([]);

  async function fetchCategories() {
    try {
      const { data } = await api.get("/categories");
      setCategories(data);
      if (data.length > 0) {
        setCategory(data[0].id);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Categorias", "Não foi possível carregar as categorias");
    }
  }

  async function fetchMarkets() {
    try {
      if (!category) {
        return;
      }

      const { data } = await api.get(`/markets/category/${category}`);
      setMarkets(data);
    } catch (error) {
      console.log(error);
      Alert.alert("Locais", "Não foi possível carregar os locais");
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchMarkets();
  }, [category]);

  return (
    <View style={s.container}>
      <Categories
        data={categories}
        onSelect={setCategory}
        selected={category}
      />

      <MapView
        style={s.map}
        initialRegion={{
          latitude: currentLocation.latitude,
          longitude: currentLocation.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker
          identifier="current"
          coordinate={{
            latitude: currentLocation.latitude,
            longitude: currentLocation.longitude,
          }}
          image={require("@/assets/location.png")}
        />

        {markets.map((item) => (
          <Marker
            key={item.id}
            identifier={item.id}
            coordinate={{
              latitude: item.latitude,
              longitude: item.longitude,
            }}
            image={require("@/assets/pin.png")}
          >
            <Callout onPress={() => router.navigate(`/market/${item.id}`)}>
              <View>
                <Text style={s.name}>{item.name}</Text>
                <Text style={s.address}>{item.address}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <Places data={markets} />
    </View>
  );
}
