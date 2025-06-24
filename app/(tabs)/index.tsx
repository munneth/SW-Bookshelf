import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Modal, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { styles } from './styles';

// Star Wars themed books
const starWarsBooks = [
  {
    id: 1,
    title: 'Star Wars: A New Hope',
    author: 'George Lucas',
    cover: 'https://via.placeholder.com/120x180/FFD700/000000?text=ANH',
    rating: 4.8,
    era: 'Original Trilogy',
  },
  {
    id: 2,
    title: 'The Empire Strikes Back',
    author: 'George Lucas',
    cover: 'https://via.placeholder.com/120x180/000080/FFFFFF?text=ESB',
    rating: 4.9,
    era: 'Original Trilogy',
  },
  {
    id: 3,
    title: 'Return of the Jedi',
    author: 'George Lucas',
    cover: 'https://via.placeholder.com/120x180/228B22/FFFFFF?text=ROTJ',
    rating: 4.7,
    era: 'Original Trilogy',
  },
  {
    id: 4,
    title: 'The Phantom Menace',
    author: 'George Lucas',
    cover: 'https://via.placeholder.com/120x180/FF4500/FFFFFF?text=TPM',
    rating: 4.2,
    era: 'Prequel Trilogy',
  },
  {
    id: 5,
    title: 'Attack of the Clones',
    author: 'George Lucas',
    cover: 'https://via.placeholder.com/120x180/8B0000/FFFFFF?text=AOTC',
    rating: 4.3,
    era: 'Prequel Trilogy',
  },
  {
    id: 6,
    title: 'Revenge of the Sith',
    author: 'George Lucas',
    cover: 'https://via.placeholder.com/120x180/800080/FFFFFF?text=ROTS',
    rating: 4.5,
    era: 'Prequel Trilogy',
  },
  {
    id: 7,
    title: 'The Force Awakens',
    author: 'J.J. Abrams',
    cover: 'https://via.placeholder.com/120x180/4169E1/FFFFFF?text=TFA',
    rating: 4.4,
    era: 'Sequel Trilogy',
  },
  {
    id: 8,
    title: 'The Last Jedi',
    author: 'Rian Johnson',
    cover: 'https://via.placeholder.com/120x180/FF1493/FFFFFF?text=TLJ',
    rating: 4.1,
    era: 'Sequel Trilogy',
  },
];

export default function HomeScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const router = useRouter();
  return (
    


    
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
              <ThemedText style={styles.title}>The Jedi Archives</ThemedText>
              <TouchableOpacity style={styles.title}onPress={() => router.push('/login')}>
                <ThemedText style={{
                  flexDirection: 'row',
                  backgroundColor: 'red',
                  borderRadius: 10,
                  padding: 10,
                  margin: 10,
                  color: 'white',
                  fontSize: 16,
                  fontWeight: 'bold',
                  textAlign: 'center',
                }}>Login</ThemedText>
              </TouchableOpacity>
          </View>
          <ThemedText style={styles.subtitle}>May the Force be with your reading</ThemedText>
        </View>
        
        <View style={styles.booksGrid}>
          {starWarsBooks.map((book) => (
            <TouchableOpacity key={book.id} style={styles.bookCard}>
              <Image
                source={{ uri: book.cover }}
                style={styles.bookCover}
                contentFit="cover"
              />
              <View style={styles.bookInfo}>
                <ThemedText style={styles.bookTitle} numberOfLines={2}>
                  {book.title}
                </ThemedText>
                <ThemedText style={styles.bookAuthor} numberOfLines={1}>
                  {book.author}
                </ThemedText>
                <View style={styles.eraContainer}>
                  <ThemedText style={styles.era}>{book.era}</ThemedText>
                </View>
                <View style={styles.ratingContainer}>
                  <ThemedText style={styles.rating}>★ {book.rating}</ThemedText>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
        
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
              Alert.alert('Modal has been closed.');
              setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
              <Text style={{
                color: 'white',
                fontSize: 30,
                fontWeight: 'bold',
                margin: 10,
                textAlign: 'center',
              }}>Title</Text>
              <TextInput
                placeholder="Title"
                style={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  color: 'black',
                  width: 225,
                  height: 50,
                  margin: -10,
                  borderWidth: 1,
                  padding: 10,
                  borderRadius: 8,
                }}
                placeholderTextColor="#D2B48C"
              />
                <Pressable
                  style={[styles.button, styles.buttonClose]}
                  onPress={() => setModalVisible(!modalVisible)}>
                  <Text style={styles.textStyle}>X</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
          <Pressable
            style={[styles.button, styles.buttonOpen]}
            onPress={() => setModalVisible(true)}>
            <Text style={styles.textStyle}>+</Text>
          </Pressable>
        
    </ThemedView>
  );
}
