import { useRef } from "react";
import { useWindowDimensions, Text } from "react-native";
import BottomSheet, { BottomSheetFlatList } from "@gorhom/bottom-sheet";

import { s } from "./styles";
import { Place, PlaceProps } from "../place";

type Props = {
  data: PlaceProps[];
};

export function Places({ data }: Props) {
  const dimensions = useWindowDimensions();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = {
    min: 200,
    max: dimensions.height - 128,
  };
  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={[snapPoints.min, snapPoints.max]}
      handleIndicatorStyle={s.indicator}
      backgroundStyle={s.container}
      enableOverDrag={false}
    >
      <BottomSheetFlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <Place data={item} />}
        contentContainerStyle={s.content}
        ListHeaderComponent={() => <Text>Explore locais perto de você</Text>}
      />
    </BottomSheet>
  );
}
