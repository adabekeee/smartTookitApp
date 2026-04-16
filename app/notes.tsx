import { useEffect, useState } from "react";
import {
    FlatList,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import AppHeader from "../components/AppHeader";
import NoteCard from "../components/NoteCard";
import useTheme from "../hooks/useTheme";
import {
  getNotes,
  addNote,
  updateNote,
  deleteNote,
  Note,
} from "@/services/noteService";


export default function Notes() {
  const COLORS = useTheme();

  const [notes, setNotes] = useState<Note[]>([]);
  const [mode, setMode] = useState<"list" | "editor">("list");

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    const stored = await getNotes();
    setNotes(stored);
  };

  const handleSave = async () => {
    if (!title.trim()) return;

    let updated;

    if (editingId) {
      updated = await updateNote({
        id: editingId,
        title,
        content,
      });
      setEditingId(null);
    } else {
      const newNote = {
        id: Date.now().toString(),
        title,
        content,
      };

      updated = await addNote(newNote);
    }

    setNotes(updated);
    setTitle("");
    setContent("");
    setMode("list");
  };

  const handleDelete = async (id: string) => {
    const updated = await deleteNote(id);
    setNotes(updated);
  };

  const handleEdit = (note: Note) => {
    setTitle(note.title);
    setContent(note.content);
    setEditingId(note.id);
    setMode("editor");
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: COLORS.background }}
      edges={["top", "left", "right"]}
    >
      <KeyboardAvoidingView
        style={{ flex: 1, padding: 20 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* HEADER */}
        <AppHeader
          title="Notes"
          leftIcon={mode === "list" ? "add" : "arrow-back"}
          onLeftPress={() =>
            mode === "list" ? setMode("editor") : setMode("list")
          }
        />

        {/* CONTENT */}
        {mode === "editor" ? (
          <View style={[styles.box, { backgroundColor: COLORS.card }]}>
            <TextInput
              placeholder="Title"
              placeholderTextColor={COLORS.textSecondary}
              value={title}
              onChangeText={setTitle}
              style={[styles.input, { color: COLORS.textPrimary }]}
            />

            <TextInput
              placeholder="Write your note..."
              placeholderTextColor={COLORS.textSecondary}
              value={content}
              onChangeText={setContent}
              multiline
              textAlignVertical="top"
              returnKeyType="default"
              blurOnSubmit={false}
              style={[
                styles.input,
                {
                  color: COLORS.textPrimary,
                  minHeight: 150,
                },
              ]}
            />

            <TouchableOpacity
              style={[styles.button, { backgroundColor: COLORS.primary }]}
              onPress={handleSave}
            >
              <Text style={{ color: "white" }}>
                {editingId ? "Update Note" : "Save Note"}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={notes}
            keyExtractor={(item) => item.id}
            contentContainerStyle={{ paddingTop: 10 }}
            ListEmptyComponent={
              <Text style={{ color: COLORS.textSecondary }}>
                No notes yet...
              </Text>
            }
            renderItem={({ item }) => (
              <NoteCard
                note={item}
                COLORS={COLORS}
                onDelete={() => handleDelete(item.id)}
                onEdit={() => handleEdit(item)}
              />
            )}
          />
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  box: {
    padding: 15,
    borderRadius: 12,
    marginTop: 20,
  },
  input: {
    marginBottom: 10,
    fontSize: 16,
  },
  button: {
    padding: 12,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
});
