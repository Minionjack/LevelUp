/**
 * Profile Tab
 * User profile and settings screen
 */

import { View, Text, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '@/store';

export default function ProfileTab() {
  const { user } = useSelector((state: RootState) => state.auth);
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      {user && (
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{user.username}</Text>
          <Text style={styles.userEmail}>{user.email}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f0f1e',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  userInfo: {
    backgroundColor: '#1a1a2e',
    padding: 16,
    borderRadius: 12,
  },
  userName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#666',
  },
});
