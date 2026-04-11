import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export default function NoteCard({ note, onDelete, onEdit, COLORS }: any) {
  return (
    <View style={[styles.card, { backgroundColor: COLORS.card }]}>
      <Text style={[styles.title, { color: COLORS.textPrimary }]}>
        {note.title}
      </Text>

      <Text style={{ color: COLORS.textSecondary }}>
        {note.content}
      </Text>

      <View style={styles.actions}>
        <TouchableOpacity onPress={onEdit}>
          <Text style={{ color: COLORS.primary }}>Edit</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={onDelete}>
          <Text style={{ color: "red" }}>Delete</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});