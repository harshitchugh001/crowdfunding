import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

export default function AddProjectScreen() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [goalAmount, setGoalAmount] = useState('');
  const [category, setCategory] = useState('');

  const handleSubmit = () => {
    // Handle the submit action
    console.log({ title, description, goalAmount, category });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Add a New Project</Text>

      <TextInput
        style={styles.input}
        placeholder="Project Title"
        value={title}
        onChangeText={setTitle}
      />

      <TextInput
        style={styles.textArea}
        placeholder="Project Description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
      />
      <TouchableOpacity style={styles.imageUpload}>
        <Text style={styles.imageUploadText}>Upload Image</Text>
      </TouchableOpacity>

      <Button title="Submit Project" onPress={handleSubmit} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  textArea: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    textAlignVertical: 'top',
  },
  imageUpload: {
    borderWidth: 1,
    borderColor: 'gray',
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: 'center',
  },
  imageUploadText: {
    color: 'gray',
  },
});
