import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Switch,
  Alert
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfileScreen() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isEmergencyAlerts, setEmergencyAlerts] = useState(true);
  const [isLocationSharing, setLocationSharing] = useState(true);

  const userInfo = {
    name: "Masoom Verma",
    bloodGroup: "O+",
    emergencyContacts: [
      { name: "Harsh", relation: "Father", phone: "+91 9876543210" },
      { name: "Keval", relation: "Grand Father", phone: "+91 9876543211" }
    ],
    medicalConditions: ["Diabetes", "Hypertension"],
    medications: ["Metformin", "Lisinopril"]
  };

  const handleLogout = () => {
    Alert.alert(
      "Logout",
      "Are you sure you want to logout?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Logout", style: "destructive", onPress: () => console.log("Logged out") }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Profile Header */}
      <View style={styles.header}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: 'https://via.placeholder.com/100' }}
            style={styles.profileImage}
          />
          <TouchableOpacity style={styles.editButton}>
            <Ionicons name="pencil" size={20} color="white" />
          </TouchableOpacity>
        </View>
        <Text style={styles.name}>{userInfo.name}</Text>
        <Text style={styles.bloodGroup}>Blood Group: {userInfo.bloodGroup}</Text>
      </View>

      {/* Medical Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Medical Information</Text>
        <View style={styles.card}>
          <Text style={styles.subtitle}>Medical Conditions</Text>
          {userInfo.medicalConditions.map((condition, index) => (
            <Text key={index} style={styles.listItem}>• {condition}</Text>
          ))}
          
          <Text style={[styles.subtitle, styles.marginTop]}>Current Medications</Text>
          {userInfo.medications.map((medication, index) => (
            <Text key={index} style={styles.listItem}>• {medication}</Text>
          ))}
        </View>
      </View>

      {/* Emergency Contacts */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Emergency Contacts</Text>
        <View style={styles.card}>
          {userInfo.emergencyContacts.map((contact, index) => (
            <View key={index} style={styles.contactItem}>
              <View>
                <Text style={styles.contactName}>{contact.name}</Text>
                <Text style={styles.contactRelation}>{contact.relation}</Text>
              </View>
              <TouchableOpacity style={styles.callButton}>
                <Ionicons name="call" size={20} color="#FF6B6B" />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      {/* Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        <View style={styles.card}>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Dark Mode</Text>
            <Switch
              value={isDarkMode}
              onValueChange={setIsDarkMode}
              trackColor={{ false: "#767577", true: "#FF6B6B" }}
            />
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Emergency Alerts</Text>
            <Switch
              value={isEmergencyAlerts}
              onValueChange={setEmergencyAlerts}
              trackColor={{ false: "#767577", true: "#FF6B6B" }}
            />
          </View>
          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Location Sharing</Text>
            <Switch
              value={isLocationSharing}
              onValueChange={setLocationSharing}
              trackColor={{ false: "#767577", true: "#FF6B6B" }}
            />
          </View>
        </View>
      </View>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={24} color="white" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#FF6B6B',
    padding: 20,
    alignItems: 'center',
    paddingTop: 60,
  },
  profileImageContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'white',
  },
  editButton: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    backgroundColor: '#FF6B6B',
    padding: 8,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: 'white',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  bloodGroup: {
    fontSize: 16,
    color: 'white',
    opacity: 0.9,
  },
  section: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#666',
    marginBottom: 5,
  },
  marginTop: {
    marginTop: 15,
  },
  listItem: {
    fontSize: 15,
    color: '#666',
    marginLeft: 10,
    marginTop: 5,
  },
  contactItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  contactName: {
    fontSize: 16,
    fontWeight: '500',
  },
  contactRelation: {
    fontSize: 14,
    color: '#666',
  },
  callButton: {
    padding: 10,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#FF6B6B',
    margin: 15,
    padding: 15,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  logoutText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    marginLeft: 10,
  },
});
