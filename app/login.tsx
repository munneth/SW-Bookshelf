import { Session } from '@supabase/supabase-js'
import { useRouter } from 'expo-router'
import { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import Account from '../components/Account'
import Auth from '../components/Auth'
import { supabase } from '../lib/supabase'

export default function LoginScreen() {
  const [session, setSession] = useState<Session | null>(null)
  const router = useRouter()

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      if (session) {
        // Redirect to main app if user is already logged in
        router.replace('/(tabs)')
      }
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      if (session) {
        // Redirect to main app after successful login
        router.replace('/(tabs)')
      }
    })
  }, [router])

  return (
    <View style={styles.container}>
      {session && session.user ? (
        <Account key={session.user.id} session={session} />
      ) : (
        <Auth />
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
})