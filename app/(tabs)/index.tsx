import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Session } from '@supabase/supabase-js';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Modal, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { supabase } from '../../lib/supabase';
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
  const [profileModalVisible, setProfileModalVisible] = useState(false);
  const [session, setSession] = useState<Session | null>(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [website, setWebsite] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(true);

  // Check for session on component mount
  useEffect(() => {
    checkSession();
  }, []);

  async function checkSession() {
    const { data: { session } } = await supabase.auth.getSession();
    setSession(session);
    if (session) {
      getProfile();
    }
  }

  async function getProfile() {
    try {
      setProfileLoading(true);
      if (!session?.user) return;

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', session?.user.id)
        .single();

      if (error && status !== 406) {
        console.error('Error loading profile:', error);
        return;
      }

      if (data) {
        setUsername(data.username || '');
        setWebsite(data.website || '');
        setAvatarUrl(data.avatar_url || '');
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setProfileLoading(false);
    }
  }

  async function updateProfile() {
    try {
      setProfileLoading(true);
      if (!session?.user) {
        Alert.alert('No user session found');
        return;
      }

      const updates = {
        id: session?.user.id,
        username,
        website,
        avatar_url: avatarUrl,
        updated_at: new Date(),
      };

      const { error } = await supabase.from('profiles').upsert(updates);

      if (error) {
        Alert.alert('Error updating profile:', error.message);
        return;
      }

      Alert.alert('Profile updated successfully!');
      setProfileModalVisible(false);
    } catch (error) {
      Alert.alert('Error updating profile');
      console.error('Error:', error);
    } finally {
      setProfileLoading(false);
    }
  }
//login funcitons, signout, isLoggedIn
  function isLoggedIn() {
    return session && session.user;
  }
  async function signOut() {
    const { error } = await supabase.auth.signOut()
    router.push('/login');
  }

  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
              <ThemedText style={styles.title}>The Jedi Archives</ThemedText>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <TouchableOpacity onPress={() => {
                  if(!isLoggedIn()) {
                    router.push('/login');
                    console.log("to login")
                  } else {
                    signOut();
                    console.log('signed out');
                  }
                }}>

                  <ThemedText style={{
                    backgroundColor: 'red',
                    borderRadius: 10,
                    padding: 10,
                    margin: 10,
                    color: 'white',
                    fontSize: 16,
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>{session && session.user ? 'Sign Out' : 'Login'}</ThemedText>
                </TouchableOpacity>
                
                {session && (
                  <TouchableOpacity onPress={() => setProfileModalVisible(true)}>
                    <ThemedText style={{
                      backgroundColor: '#4CAF50',
                      borderRadius: 10,
                      padding: 10,
                      margin: 10,
                      color: 'white',
                      fontSize: 16,
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}>Profile</ThemedText>
                  </TouchableOpacity>
                )}
              </View>
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
        
      {/* Book Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(false);
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
              onPress={() => setModalVisible(false)}>
              <Text style={styles.textStyle}>X</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Profile Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={profileModalVisible}
        onRequestClose={() => {
          setProfileModalVisible(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={{
              color: 'white',
              fontSize: 30,
              fontWeight: 'bold',
              margin: 10,
              textAlign: 'center',
            }}>Update Profile</Text>
            
            <TextInput
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                color: 'black',
                width: 225,
                height: 50,
                margin: 10,
                borderWidth: 1,
                padding: 10,
                borderRadius: 8,
              }}
              placeholderTextColor="#D2B48C"
            />
            
            <TextInput
              placeholder="Website"
              value={website}
              onChangeText={setWebsite}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                color: 'black',
                width: 225,
                height: 50,
                margin: 10,
                borderWidth: 1,
                padding: 10,
                borderRadius: 8,
              }}
              placeholderTextColor="#D2B48C"
            />
            
            <TextInput
              placeholder="Avatar URL"
              value={avatarUrl}
              onChangeText={setAvatarUrl}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                color: 'black',
                width: 225,
                height: 50,
                margin: 10,
                borderWidth: 1,
                padding: 10,
                borderRadius: 8,
              }}
              placeholderTextColor="#D2B48C"
            />
            
            <TouchableOpacity
              style={{
                backgroundColor: '#4CAF50',
                padding: 15,
                borderRadius: 8,
                margin: 10,
                width: 225,
              }}
              onPress={updateProfile}
              disabled={profileLoading}>
              <Text style={{
                color: 'white',
                textAlign: 'center',
                fontWeight: 'bold',
              }}>{profileLoading ? 'Updating...' : 'Update Profile'}</Text>
            </TouchableOpacity>
            
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setProfileModalVisible(false)}>
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
