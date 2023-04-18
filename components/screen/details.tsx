import {
  View,
  Text,
  Image,
  FlatList,
  InputAccessoryView,
  TextInput,
  TouchableOpacity,
  Keyboard,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import React, { useEffect, useState } from "react";
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

  const [comment, setComment] = useState<string>("");
  const [comments, setComments] = useState<{ id: number; content: string }[]>(
    []
  );

  const { itemId } = route.params;

  useEffect(() => {
    fetch(`https://api.punkapi.com/v2/beers?ids=${itemId}`)
      .then((res) => res.json())
      .then((json) => {
        setItem(json);
      })
      .catch((error) => console.error(error));
  }, []);

  const onSubmit = () => {
    Keyboard.dismiss();

    const newComment = {
      id: comments.length + 1,
      content: comment,
    };

    setComments([...comments, newComment]);
  };
  const inputRender = () => {
    return (
      <View
        style={{
          paddingHorizontal: 8,
          paddingVertical: 8,
          display: "flex",
          flexDirection: "row",
          gap: 8,
          backgroundColor: "white",
        }}
      >
        <View
          style={{
            flex: 1,
            paddingHorizontal: 8,
            borderWidth: 1,
            borderRadius: 5,
            borderColor: "gray",
            backgroundColor: "white",
          }}
        >
          <TextInput
            style={{ height: 40, flex: 1 }}
            placeholder="Leave your comment here.."
            value={comment}
            onChangeText={(text) => setComment(text)}
          />
        </View>
        {comment.trim().length > 0 && (
          <TouchableOpacity
            style={{
              backgroundColor: "#007765",
              paddingHorizontal: 8,
              paddingVertical: 2,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 8,
            }}
            onPress={onSubmit}
          >
            <Text style={{ color: "white" }}>Send</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ height: "95%" }}>
        <FlatList
          automaticallyAdjustKeyboardInsets={true}
          data={comments}
          ListHeaderComponent={
            <View
              style={{
                paddingHorizontal: 20,
                paddingVertical: 20,
                display: "flex",
                flexDirection: "column",
                gap: 20,
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 32,
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={{ fontWeight: "600" }}>
                    {item && item[0]?.name}
                  </Text>
                  <Text
                    style={{
                      marginTop: 20,
                      flexDirection: "row",
                      flexWrap: "wrap",
                    }}
                  >
                    Description: {item && item[0]?.description}
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
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
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
              <View>
                <Text style={{ fontWeight: "600" }}>
                  Comments ({comments.length})
                </Text>
              </View>
            </View>
          }
          keyExtractor={(item) => `${item.id}`}
          ItemSeparatorComponent={() => <View style={{ height: 16 }}></View>}
          renderItem={(item) => {
            const comment = item.item;

            return (
              <View style={{ paddingHorizontal: 20 }}>
                <Text>{comment.content}</Text>
              </View>
            );
          }}
        />
        {Platform.OS === "ios" && (
          <InputAccessoryView>{inputRender()}</InputAccessoryView>
        )}
        {Platform.OS === "android" && (
          <SafeAreaView>
            <View
              style={{
                flex: 1,
                flexDirection: "row",
                paddingHorizontal: 8,
                justifyContent: "center",
                alignItems: "center",
                // borderColor: "gray",
                backgroundColor: "white",
                marginHorizontal: 8,
                marginTop: 25,
                gap: 12,
              }}
            >
              <TextInput
                style={{
                  height: 40,
                  borderWidth: 1,
                  borderRadius: 5,
                  paddingLeft: 5,
                  borderColor: "gray",
                  borderBottomColor: "gray",
                  flex: 1,
                }}
                placeholder="Leave your comment here.."
                value={comment}
                onChangeText={(text) => setComment(text)}
              />
              {comment.trim().length > 0 && (
                <TouchableOpacity
                  style={{
                    backgroundColor: "#007765",
                    paddingHorizontal: 8,
                    paddingVertical: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 8,
                    height: 35,
                    width: 70,
                  }}
                  onPress={onSubmit}
                >
                  <Text style={{ color: "white" }}>Send</Text>
                </TouchableOpacity>
              )}
            </View>
          </SafeAreaView>

          // <View>
          //   <TextInput style={{ height: 80 }} placeholder="test for input" />
          // </View>
        )}
      </View>
    </SafeAreaView>
  );
}
export default DetailsScreen;
