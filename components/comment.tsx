import React, { useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

const Comment = () => {
  const [text, setText] = useState<string>("");
  const [cmtList, setCmtList] = useState<string[]>([]);
  const [isShowed, setIsShowed] = useState(false);
  const handleSubmit = () => {
    setIsShowed(true);
    let newCmt = text;
    setCmtList((cmtList) => [...cmtList, newCmt]);
    setText("");
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
        marginTop: 30,
      }}
    >
      {isShowed && (
        <View
          style={{
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              fontWeight: "bold",
            }}
          >
            Comment({cmtList.length}):
          </Text>
          <FlatList
            data={cmtList}
            keyExtractor={(index) => index}
            renderItem={renderItem}
          />
        </View>
      )}
      <View
        style={{
          marginTop: 20,
          paddingLeft: 5,
          borderWidth: 0.3,
          height: 40,
          borderRadius: 5,
        }}
      >
        <TextInput
          style={{ height: 40 }}
          placeholder="Leave your comment here..."
          value={text}
          onChangeText={(newText) => setText(newText)}
          defaultValue={text}
        />
        <View style={styles.saveButtonContainer}>
          <TouchableOpacity style={styles.saveButton} onPress={handleSubmit}>
            <Text style={styles.saveButtonText}>Send </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  saveButtonContainer: {},
  saveButton: {
    borderWidth: 1,
    borderColor: "#1E716D",
    backgroundColor: "#1E716D",
    marginTop: 10,
    padding: 5,
    maxWidth: 80,
    borderRadius: 10,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
    zIndex: 100,
  },
});
export default Comment;
