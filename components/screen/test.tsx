import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  Button,
} from "react-native";

interface ItemProps {
  name?: string;
  image_url?: string;
  id?: string;
}
import { HomeStackNavigatorParamList } from "../../src/navigation/types";
import { StackNavigationProp } from "@react-navigation/stack";

type Props = StackNavigationProp<
  HomeStackNavigatorParamList,
  "Random",
  "MyStack"
>;
function RandomScreennnn({ navigation }: { navigation: Props }) {
  const [item, setItem] = useState<ItemProps[]>();
  useEffect(() => {
    fetch("https://api.punkapi.com/v2/beers/random")
      .then((res) => res.json())
      .then((json) => {
        setItem(json);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <View
    // style={{
    //   marginHorizontal: 8,
    //   marginTop: 30,
    //   display: "flex",
    //   justifyContent: "center",
    //   alignItems: "center",
    // }}
    >
      {" "}
      <Image
        source={{ uri: item ? item[0]?.image_url : "/" }}
        style={{ width: 120, height: 500, marginBottom: 40 }}
      />
      {/* <View>
        <Text>
          Name:
          {item && item[0]?.name}
        </Text>

        <Button
          onPress={() => {
            navigation.navigate("Details", {
              itemId: item ? item[0].id : "0",
            });
          }}
          accessibilityLabel="Go to page Details to see more informations about this article"
        >
          See Details
        </Button>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 8,
    backgroundColor: "aliceblue",
  },
  box: {
    width: 50,
    height: 50,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  button: {
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    backgroundColor: "oldlace",
    alignSelf: "flex-start",
    marginHorizontal: "1%",
    marginBottom: 6,
    minWidth: "48%",
    textAlign: "center",
  },
  selected: {
    backgroundColor: "coral",
    borderWidth: 0,
  },
  buttonLabel: {
    fontSize: 12,
    fontWeight: "500",
    color: "coral",
  },
  selectedLabel: {
    color: "white",
  },
  label: {
    textAlign: "center",
    marginBottom: 10,
    fontSize: 24,
  },
});

export default RandomScreennnn;
