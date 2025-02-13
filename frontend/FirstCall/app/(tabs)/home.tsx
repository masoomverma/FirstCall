import React from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet, 
  ScrollView, 
  TextInput,
  Dimensions
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const healthCards = [
    { id: '1', icon: '💊', title: 'Medicine Time', subtitle: 'Take your daily meds' },
    { id: '2', icon: '🌡️', title: 'Health Tips', subtitle: 'Stay healthy & fit' },
    { id: '3', icon: '❤️', title: 'Vital Stats', subtitle: 'Track your health' }
  ];

  return (
    <ScrollView style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.title}>FirstCall</Text>
        <Text style={styles.subtitle}>Your Health, Our Priority</Text>
      </View>

      {/* Health Statistics Carousel */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        style={styles.carousel}
      >
        {healthCards.map(card => (
          <View key={card.id} style={styles.carouselCard}>
            <Text style={styles.cardIcon}>{card.icon}</Text>
            <Text style={styles.cardTitle}>{card.title}</Text>
            <Text style={styles.cardSubtitle}>{card.subtitle}</Text>
          </View>
        ))}
      </ScrollView>

      {/* Login Section */}
      <View style={styles.loginContainer}>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={[styles.loginTypeButton, styles.activeButton]}>
            <Text style={styles.activeButtonText}>Hospital Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginTypeButton}>
            <Text style={styles.buttonText}>People Login</Text>
          </TouchableOpacity>
        </View>

        <TextInput 
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#999"
        />
        <TextInput 
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          secureTextEntry
        />

        <TouchableOpacity style={styles.forgotPassword}>
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>

      {/* Register Section */}
      <View style={styles.registerContainer}>
        <TouchableOpacity style={styles.registerButton}>
          <Text style={styles.registerButtonText}>Register as Hospital</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.registerButton, styles.registerAltButton]}>
          <Text style={styles.registerAltButtonText}>Register as Individual</Text>
        </TouchableOpacity>
      </View>

      {/* Emergency Call Button */}
      <TouchableOpacity 
        style={styles.emergencyButton}
        onPress={() => router.push('/emergency')}
      >
        <Ionicons name="call" size={24} color="white" />
        <Text style={styles.emergencyButtonText}>Emergency Call</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FF6B6B',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    marginTop: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
  },
  subtitle: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
    marginTop: 5,
  },
  carousel: {
    marginVertical: 20,
  },
  carouselCard: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 15,
    padding: 20,
    marginHorizontal: 10,
    width: width * 0.7,
    alignItems: 'center',
  },
  cardIcon: {
    fontSize: 32,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#FF6B6B',
    marginTop: 10,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  loginContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    margin: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  loginTypeButton: {
    flex: 1,
    padding: 15,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: 'white',
    marginHorizontal: 5,
  },
  activeButton: {
    backgroundColor: '#FF6B6B',
  },
  buttonText: {
    color: '#FF6B6B',
    fontWeight: '600',
  },
  activeButtonText: {
    color: 'white',
    fontWeight: '600',
  },
  input: {
    backgroundColor: '#f5f5f5',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  forgotPassword: {
    alignItems: 'flex-end',
    marginVertical: 10,
  },
  forgotPasswordText: {
    color: '#FF6B6B',
  },
  loginButton: {
    backgroundColor: '#FF6B6B',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  loginButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  registerContainer: {
    padding: 20,
  },
  registerButton: {
    backgroundColor: '#FF6B6B',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  registerAltButton: {
    backgroundColor: 'white',
  },
  registerButtonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 16,
  },
  registerAltButtonText: {
    color: '#FF6B6B',
    fontWeight: '600',
    fontSize: 16,
  },
  emergencyButton: {
    backgroundColor: '#FF0000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 30,
    margin: 20,
    marginBottom: 40,
  },
  emergencyButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
    marginLeft: 10,
  },
});