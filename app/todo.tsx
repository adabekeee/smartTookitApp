import AppHeader from "@/components/AppHeader";
import { TAGS, getTagColor } from "@/constants/tag";
import { Todo, addTodo, deleteTodo, getTodos, updateTodo,} from "@/services/todoService";
import { useEffect, useState } from "react";
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View,} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useTheme from "../hooks/useTheme";

export default function TodoScreen() {
  const COLORS = useTheme();

  const [todos, setTodos] = useState<Todo[]>([]);
  const [input, setInput] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("Low");
  const [editingId, setEditingId] = useState<string | null>(null);

  // 🔹 Load Todos
  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    const data = await getTodos();
    setTodos(data);
  };

  // 🔹 Add / Edit Todo
  const handleAdd = async () => {
    if (!input.trim()) return;

    if (editingId) {
      const updated = await updateTodo({
        id: editingId,
        text: input,
        completed: false,
        tag: selectedTag,
      });
      setTodos(updated);
      setEditingId(null);
    } else {
      const newTodo: Todo = {
        id: Date.now().toString(),
        text: input,
        completed: false,
        tag: selectedTag,
      };

      const updated = await addTodo(newTodo);
      setTodos(updated);
    }

    setInput("");
  };

  // 🔹 Toggle Complete
  const toggleComplete = async (item: Todo) => {
    const updated = await updateTodo({
      ...item,
      completed: !item.completed,
    });
    setTodos(updated);
  };

  // 🔹 Delete
  const handleDelete = async (id: string) => {
    const updated = await deleteTodo(id);
    setTodos(updated);
  };

  // 🔹 Edit
  const editTodo = (todo: Todo) => {
    setInput(todo.text);
    setSelectedTag(todo.tag);
    setEditingId(todo.id);
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: COLORS.background }]}
      edges={["top", "left", "right"]}
    >
      <AppHeader title="To-Do List" />

      {/* INPUT */}
      <View style={[styles.inputBox, { backgroundColor: COLORS.card }]}>
        <TextInput
          placeholder="Add a task..."
          placeholderTextColor={COLORS.textSecondary}
          value={input}
          onChangeText={setInput}
          style={[styles.input, { color: COLORS.textPrimary }]}
          multiline
        />

        {/* TAG SELECTOR */}
        <View style={styles.tagRow}>
          {TAGS.map((tag) => (
            <TouchableOpacity
              key={tag}
              onPress={() => setSelectedTag(tag)}
              style={[
                styles.tag,
                {
                  backgroundColor:
                    selectedTag === tag ? getTagColor(tag) : COLORS.card,
                },
              ]}
            >
              <Text
                style={{
                  color: selectedTag === tag ? "white" : COLORS.textSecondary,
                }}
              >
                {tag}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* ADD BUTTON */}
        <TouchableOpacity
          style={[styles.addBtn, { backgroundColor: COLORS.primary }]}
          onPress={handleAdd}
        >
          <Text style={{ color: "white" }}>
            {editingId ? "Update Task" : "Add Task"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* LIST */}
      <FlatList
        data={todos}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ marginTop: 20 }}
        ListEmptyComponent={
          <Text style={{ color: COLORS.textSecondary }}>No tasks yet...</Text>
        }
        renderItem={({ item }) => (
          <View
            style={[
              styles.todoItem,
              {
                backgroundColor: COLORS.card,
                opacity: item.completed ? 0.5 : 1,
              },
            ]}
          >
            {/* Checkbox */}
            <TouchableOpacity
              onPress={() => toggleComplete(item)}
              style={[
                styles.checkbox,
                {
                  borderColor: getTagColor(item.tag),
                  backgroundColor: item.completed
                    ? getTagColor(item.tag)
                    : "transparent",
                },
              ]}
            >
              {item.completed && <Text style={styles.checkmark}>✓</Text>}
            </TouchableOpacity>

            {/* Text */}
            <Text
              style={{
                flex: 1,
                marginHorizontal: 10,
                color: COLORS.textPrimary,
                textDecorationLine: item.completed ? "line-through" : "none",
              }}
            >
              • {item.text}
            </Text>

            {/* Tag */}
            <View style={styles.bookmarkWrapper}>
              <View
                style={[
                  styles.bookmark,
                  { backgroundColor: getTagColor(item.tag) },
                ]}
              />
              <View
                style={[
                  styles.bookmarkTriangle,
                  { borderTopColor: getTagColor(item.tag) },
                ]}
              />
            </View>

            {/* Edit */}
            <TouchableOpacity onPress={() => editTodo(item)}>
              <Text style={{ marginLeft: 10 }}>✏️</Text>
            </TouchableOpacity>

            {/* Delete */}
            <TouchableOpacity onPress={() => handleDelete(item.id)}>
              <Text style={{ marginLeft: 10 }}>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  inputBox: {
    borderRadius: 12,
    padding: 15,
  },
  input: {
    fontSize: 16,
    marginBottom: 10,
  },
  tagRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 10,
  },
  tag: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 6,
  },
  addBtn: {
    padding: 10,
    borderRadius: 12,
    alignItems: "center",
  },
  todoItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  tagBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  bookmarkWrapper: {
    alignItems: "center",
    marginLeft: 8,
  },
  bookmark: {
    width: 16,
    height: 15,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  bookmarkTriangle: {
    width: 0,
    height: 0,
    borderLeftWidth: 7,
    borderRightWidth: 7,
    borderTopWidth: 7,
    borderLeftColor: "transparent",
    borderRightColor: "transparent",
  },
  checkbox: {
    width: 26,
    height: 26,
    borderRadius: 13,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
  },
  checkmark: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});
