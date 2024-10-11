
import { StatusBar } from 'expo-status-bar';
import { useReducer, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View, FlatList, TouchableOpacity } from 'react-native';

export default function App() {

  function todos(state, action) {
    switch (action.type) {
      case "ADD":
        return [...state, { text: action.text, completed: false }];
      case "TOGGLE":
        return state.map((todo, index) =>
          index === action.index ? { ...todo, completed: !todo.completed } : todo
        );
      case "REMOVE":
        return state.filter((_, index) => index !== action.index);
      default:
        throw new Error();
    }
  }

  const [text, setText] = useState(""); 
  const [tasks, dispatch] = useReducer(todos, []);


  function addTodo() {
    if (text.trim()) {
      dispatch({ type: "ADD", text });
      setText("");
    }
  }

  function removeTodo(index) {
    dispatch({ type: 'REMOVE', index });
  }

  const renderItem = ({ item, index }) => (
    <TouchableOpacity onPress={() => toggleTodo(index)} onLongPress={() => removeTodo(index)}>
      <Text style={[styles.todoItem, item.completed && styles.completed]}>
        {item.text}
      </Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Add new task..."
        style={styles.input}
      />
      <Pressable onPress={addTodo}>
        <Text style={{ color: "blue", fontSize: 15,}}>Save</Text>
      </Pressable>
      
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  input: {
    borderBottomWidth: 1,
    borderColor: '#ccc',
    marginBottom: 20,
    paddingHorizontal: 10,
    height: 40,
  },
  
  todoItem: {
    padding: 15,
    fontSize: 15,
  },
});
