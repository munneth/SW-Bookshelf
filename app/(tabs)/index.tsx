import { ThemedView } from '@/components/ThemedView';
import {
  Button,
  ButtonText
} from "@/components/ui/button";
import { Heading } from '@/components/ui/heading';
import {
  Modal,
  ModalBackdrop,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@/components/ui/modal";
import { Text } from "@/components/ui/text";
import { Session } from '@supabase/supabase-js';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Alert, Pressable, ScrollView, TextInput, TouchableOpacity, View } from 'react-native';
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
    console.log('signed out');
  }
  
  return (
    <ThemedView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <View>
              <Heading size="2xl" bold style={styles.title}>The Jedi Archives</Heading>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <Button
                  onPress={() => {
                    if(!isLoggedIn()) {
                      router.push('/login');
                      console.log("to login")
                    } else {
                      signOut();
                      //console.log('signed out');

                    }
                  }}
                  variant="solid"
                  action="negative"
                  size="md"
                >
                  <ButtonText>
                    {session && session.user ? 'Sign Out' : 'Login'}
                  </ButtonText>
                </Button>
                
                {session && (
                  <Button
                    onPress={() => setProfileModalVisible(true)}
                    variant="solid"
                    action="positive"
                    size="md"
                  >
                    <ButtonText>Profile</ButtonText>
                  </Button>
                )}
              </View>
          </View>
          <Text size="md" style={styles.subtitle}>May the Force be with your reading</Text>
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
                <Text size="sm" bold style={styles.bookTitle} numberOfLines={2}>
                  {book.title}
                </Text>
                <Text size="xs" style={styles.bookAuthor} numberOfLines={1}>
                  {book.author}
                </Text>
                <View style={styles.eraContainer}>
                  <Text size="xs" style={styles.era}>{book.era}</Text>
                </View>
                <View style={styles.ratingContainer}>
                  <Text size="xs" style={styles.rating}>★ {book.rating}</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
        
      {/* Book Modal */}
      <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Text style={{
              color: 'white',
              fontSize: 30,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>Add New Book</Text>
            <ModalCloseButton onPress={() => setModalVisible(false)}>
              <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>×</Text>
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <TextInput
              placeholder="Book Title"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                color: 'black',
                width: '100%',
                height: 50,
                marginVertical: 10,
                borderWidth: 1,
                padding: 10,
                borderRadius: 8,
              }}
              placeholderTextColor="#D2B48C"
            />
            <TextInput
              placeholder="Author"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                color: 'black',
                width: '100%',
                height: 50,
                marginVertical: 10,
                borderWidth: 1,
                padding: 10,
                borderRadius: 8,
              }}
              placeholderTextColor="#D2B48C"
            />
            <TextInput
              placeholder="Cover URL"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                color: 'black',
                width: '100%',
                height: 50,
                marginVertical: 10,
                borderWidth: 1,
                padding: 10,
                borderRadius: 8,
              }}
              placeholderTextColor="#D2B48C"
            />
          </ModalBody>
          <ModalFooter>
            <Button
              onPress={() => setModalVisible(false)}
              variant="outline"
              action="secondary"
              size="sm"
            >
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button
              onPress={() => {
                // Add book logic here
                setModalVisible(false);
              }}
              variant="solid"
              action="primary"
              size="sm"
            >
              <ButtonText>Add Book</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      {/* Profile Modal */}
      <Modal isOpen={profileModalVisible} onClose={() => setProfileModalVisible(false)}>
        <ModalBackdrop />
        <ModalContent>
          <ModalHeader>
            <Text style={{
              color: 'white',
              fontSize: 30,
              fontWeight: 'bold',
              textAlign: 'center',
            }}>Update Profile</Text>
            <ModalCloseButton onPress={() => setProfileModalVisible(false)}>
              <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>×</Text>
            </ModalCloseButton>
          </ModalHeader>
          <ModalBody>
            <TextInput
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.9)',
                color: 'black',
                width: '100%',
                height: 50,
                marginVertical: 10,
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
                width: '100%',
                height: 50,
                marginVertical: 10,
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
                width: '100%',
                height: 50,
                marginVertical: 10,
                borderWidth: 1,
                padding: 10,
                borderRadius: 8,
              }}
              placeholderTextColor="#D2B48C"
            />
          </ModalBody>
          <ModalFooter>
            <Button
              onPress={() => setProfileModalVisible(false)}
              variant="outline"
              action="secondary"
              size="sm"
            >
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button
              onPress={updateProfile}
              disabled={profileLoading}
              variant="solid"
              action="primary"
              size="sm"
            >
              <ButtonText>{profileLoading ? 'Updating...' : 'Update Profile'}</ButtonText>
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <Pressable
        style={[styles.button, styles.buttonOpen]}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.textStyle}>+</Text>
      </Pressable>
        
    </ThemedView>
  );
}
