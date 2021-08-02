import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";

const Todo = props => {
  return (
    <View style={styles.todo}>
      <Text style={styles.todoText}>{props.content}</Text>
    </View>
  );
};

const App = () => {
  const [content, setContent] = useState("");
  const [todos, setTodos] = useState([]);
  const [id, setId] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Todoリスト</Text>
      <TextInput
        style={styles.todoInput}
        onChangeText={text => setContent(text)}
        value={content}
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          //空文字はNG
          if (content == "") {
            return false;
          }
          setId(id + 1);
          setTodos(todos.concat([{ id: id, content: content }]));
          setContent("");
        }}
      >
        <Text style={styles.buttonText}>追加する</Text>
      </TouchableOpacity>
      <SwipeListView
        data={todos}
        renderItem={({ item }) => {
          return <Todo content={item.content} />;
        }}
        keyExtractor={item => item.id.toString()}
        renderHiddenItem={(data, rowMap) => (
          <View style={styles.rowBack}>
            <TouchableOpacity
              style={{
                alignSelf: "flex-end",
                width: 75,
                height: 50,
                backgroundColor: "#CC3333"
              }}
              onPress={() => {
                setTodos(
                  todos.filter(todo => {
                    return todo.id != data.item.id;
                  })
                );
              }}
            >
              <Text style={{ lineHeight: 46, textAlign: "center" }}>削除</Text>
            </TouchableOpacity>
          </View>
        )}
        rightOpenValue={-75}
        disableRightSwipe={true}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    textAlign: "center",
    fontSize: 30
  },
  todoInput: {
    backgroundColor: "#fff",
    width: "70%",
    alignSelf: "center",
    marginTop: 20,
    padding: 10,
    fontSize: 20
  },
  container: {
    backgroundColor: "#ddd",
    flex: 1
  },
  button: {
    backgroundColor: "blue",
    width: "60%",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 20
  },
  buttonText: {
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    fontWeight: "bold",
    padding: 10
  },
  todo: {
    height: 50,
    backgroundColor: "#fff",
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "#d6d7da",
    padding: 10
  },
  todoText: {
    textAlign: "center",
    fontSize: 20
  }
});

export default App;
