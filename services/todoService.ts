import AsyncStorage from "@react-native-async-storage/async-storage";

const STORAGE_KEY = "TODOS";

export type Todo = {
  id: string;
  text: string;
  completed: boolean;
  tag: string;
};

// 🔹 GET ALL
export const getTodos = async (): Promise<Todo[]> => {
  const data = await AsyncStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

// 🔹 SAVE ALL
export const saveTodos = async (todos: Todo[]) => {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
};

// 🔹 ADD
export const addTodo = async (todo: Todo) => {
  const todos = await getTodos();
  const updated = [todo, ...todos];
  await saveTodos(updated);
  return updated;
};

// 🔹 UPDATE
export const updateTodo = async (updatedTodo: Todo) => {
  const todos = await getTodos();
  const updated = todos.map((t) =>
    t.id === updatedTodo.id ? updatedTodo : t
  );
  await saveTodos(updated);
  return updated;
};

// 🔹 DELETE
export const deleteTodo = async (id: string) => {
  const todos = await getTodos();
  const updated = todos.filter((t) => t.id !== id);
  await saveTodos(updated);
  return updated;
};