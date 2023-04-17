import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { HomeStackNavigatorParamList } from "../../src/navigation/types";
import { StackNavigationProp } from "@react-navigation/stack";

type Props = StackNavigationProp<
  HomeStackNavigatorParamList,
  "Home",
  "MyStack"
>;
interface ItemProps {
  name?: string;
  description?: string;
  tagline?: string;
  abv?: string;
  first_brewed?: string;
  id?: string;
  image_url?: string;
}

const HomeScreen = ({ navigation }: { navigation: Props }) => {
  const [data, setData] = useState<ItemProps[] | undefined>();
  const [page, setPage] = useState(1);
  const fetchData = (pageNum: number) => {
    fetch(`https://api.punkapi.com/v2/beers?page=${pageNum}&per_page=8`)
      .then((res) => res.json())
      .then((json) => {
        setData((data) => [...((data as ItemProps[]) || []), ...json]);
      })
      .catch((error) => console.error(error));
  };
  useEffect(() => {
    fetchData(page);
  }, [page]);

  const handleLoadMore = () => {
    setPage(page + 1);
  };
  const renderItem = ({ item }: { item: ItemProps }) => {
    const id = item?.id || "";
    const url = item ? item?.image_url : "/";
    const { name, description } = item;
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Details", {
            itemId: id,
          });
        }}
      >
        <View accessible={true} style={styles.list}>
          <View
            style={{
              marginHorizontal: 8,
              marginTop: 30,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Image
              source={{ uri: url }}
              style={{
                width: 50,
                height: 200,
                marginBottom: 40,
              }}
            />
          </View>

          <Text style={styles.heading2}>
            {id}. {name}
          </Text>
          <Text style={styles.des}>{description}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading1}>Welcome to the world of BEERS</Text>
      <FlatList
        onEndReached={handleLoadMore}
        data={data}
        keyExtractor={(item) => item.id || ""}
        renderItem={renderItem}
        // avoid message ou have a large list that is slow to update - make sure your renderItem function renders components that follow React performance best practices like PureComponent, shouldComponentUpdate, etc.
        initialNumToRender={8}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  list: {
    marginTop: 10,
    backgroundColor: "#1E716D",
    borderRadius: 10,
    padding: 8,
    marginHorizontal: 10,
    opacity: 0.9,
  },
  heading1: {
    marginTop: 20,
    marginBottom: 12,
    fontSize: 20,
  },
  heading2: {
    fontSize: 15,
    paddingBottom: 7,
    fontWeight: "500",
    color: "#D1D2D2",
  },
  des: {
    color: "#D1D1D1",
  },
});

export default HomeScreen;
