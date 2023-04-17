import React, { useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
  InputAccessoryView,
  Keyboard,
} from "react-native";

const Comment = () => {
  const [text, setText] = useState<string>("");
  const [cmtList, setCmtList] = useState<string[]>([
    "Such a strong beer",
    "Highly recommend",
    "Amazing beer",
    "Give it a try!",
    "Not my type",
  ]);
  const [isShowed, setIsShowed] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const keyboardVerticalOffset = 1000;

  const handleSubmit = () => {
    if (text) {
      setIsShowed(true);
      let newCmt = text;
      setCmtList((cmtList) => [newCmt, ...cmtList]);
      setText("");
      Keyboard.dismiss();
    } else return;
  };
  const renderItem = ({ item }: { item: string }) => (
    <Text
      style={{
        padding: 8,
      }}
    >
      {item}
    </Text>
  );

  return (
    <View
      style={{
        marginTop: 20,
      }}
    >
      <View>
        <Text
          style={{
            fontWeight: "bold",
          }}
        >
          Comment({cmtList.length}):
        </Text>
      </View>

      <View
        style={{
          height: 130,
          display: isFocus ? "none" : "flex",
          marginTop: 20,
        }}
      >
        <FlatList
          data={cmtList}
          keyExtractor={(index) => index + Math.random()}
          renderItem={renderItem}
        />
      </View>

      <InputAccessoryView
        style={{ paddingRight: 50, flex: 1, alignItems: "center" }}
      >
        <View
          style={{
            marginTop: 30,
            paddingLeft: 5,
            borderWidth: 0.3,
            height: 40,
            borderRadius: 5,
            paddingHorizontal: 15,
            maxWidth: 400,
          }}
        >
          <TextInput
            style={{ height: 40, flex: 1 }}
            accessibilityLabel="Input for adding comment"
            placeholder="Leave your comment here..."
            value={text}
            onChangeText={(newText) => setText(newText)}
            defaultValue={text}
            onFocus={() => {
              setIsFocus(true);
              Keyboard.isVisible();
            }}
            onEndEditing={() => {
              setIsFocus(false);
              setIsShowed(true);
              setText("");
            }}
          />
        </View>
        <View style={{ flex: 1, alignItems: "center" }}>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSubmit}
            accessibilityLabel="Submit Button"
          >
            <Text style={styles.saveButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </InputAccessoryView>
    </View>
  );
};
const styles = StyleSheet.create({
  saveButton: {
    borderWidth: 1,
    borderColor: "#1E716D",
    backgroundColor: "#1E716D",
    marginTop: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
    maxWidth: 80,
    borderRadius: 10,
    margin: 5,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    zIndex: 100,
  },
});
export default Comment;
