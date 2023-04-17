import { View, Text, TextStyle, Image } from "react-native";
import React, { useEffect, useState } from "react";
import Comment from "../comment";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { HomeStackNavigatorParamList } from "../../src/navigation/types";
import Ionicons from "react-native-vector-icons/Ionicons";

type Props = NativeStackScreenProps<
  HomeStackNavigatorParamList,
  "Details",
  "MyStack"
>;
interface ItemProps {
  name?: string;
  description?: string;
  tagline?: string;
  abv?: string;
  first_brewed?: string;
  image_url?: string;
}
function DetailsScreen({ route }: Props) {
  const [item, setItem] = useState<ItemProps[]>();
  const [isCut, setIsCut] = useState<Boolean>(true);
  const { itemId } = route.params;
  useEffect(() => {
    fetch(`https://api.punkapi.com/v2/beers?ids=${itemId}`)
      .then((res) => res.json())
      .then((json) => {
        setItem(json);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <View
      style={{
        marginHorizontal: 20,
      }}
    >
      <View
        style={{
          marginTop: 15,
          display: "flex",
          flexDirection: "row",
        }}
      >
        <View style={{ flex: 7, marginTop: 10 }}>
          <Text style={{ fontWeight: "600" }}>{item && item[0]?.name}</Text>
          <Text
            style={{ marginTop: 20, flexDirection: "row", flexWrap: "wrap" }}
          >
            Description:{" "}
            {item
              ? item[0]?.description?.length &&
                item[0]?.description?.length > 200
                ? isCut
                  ? item[0]?.description?.slice(0, 200) + "..."
                  : item[0]?.description
                : item[0]?.description
              : ""}
            {item &&
            item[0]?.description?.length &&
            item[0]?.description?.length > 200 ? (
              isCut ? (
                <Ionicons
                  name="caret-down-outline"
                  color="#25938C"
                  size={15}
                  onPress={() => setIsCut(false)}
                />
              ) : (
                <Ionicons
                  name="caret-up-outline"
                  color="#25938C"
                  size={15}
                  onPress={() => setIsCut(true)}
                />
              )
            ) : (
              ""
            )}
          </Text>

          <Text style={{ marginTop: 10 }}>
            Tagline:
            {item && item[0]?.tagline}
          </Text>
          <Text style={{ marginTop: 10 }}>
            First brewed:
            {item && item[0]?.first_brewed}
          </Text>

          <Text style={{ marginTop: 10 }}>
            ABV rate: {item && item[0]?.abv}
          </Text>
        </View>

        <View
          style={{
            marginTop: 10,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flex: 3,
          }}
        >
          <Image
            source={{ uri: item ? item[0]?.image_url : "/" }}
            style={{
              width: 50,
              height: 200,
              marginBottom: 40,
            }}
          />
        </View>
      </View>
      {isCut && <Comment />}
    </View>
  );
}
export default DetailsScreen;
