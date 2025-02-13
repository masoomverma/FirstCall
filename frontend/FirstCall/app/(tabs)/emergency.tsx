import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Slider from '@react-native-community/slider';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';

export default function EmergencyScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [location, setLocation] = useState(null);
  const [severity, setSeverity] = useState(1);
  const [emergencyType, setEmergencyType] = useState('');
  const [victims, setVictims] = useState('1');
  const [additionalInfo, setAdditionalInfo] = useState('');
  const [formComplete, setFormComplete] = useState(false);

  useEffect(() => {
    checkFormCompletion();
  }, [location, severity, emergencyType, victims]);

  const checkFormCompletion = () => {
    setFormComplete(
      location && emergencyType && victims && severity > 0
    );
  };

  const getLocation = async () => {
    try {
      setLoading(true);
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Please enable location services');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    } catch (error) {
      Alert.alert('Error', 'Could not fetch location');
    } finally {
      setLoading(false);
    }
  };

  const requestEmergency = () => {
    Alert.alert(
      'Confirm Emergency Request',
      'Are you sure you want to request an ambulance?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Request', 
          style: 'destructive',
          onPress: () => handleEmergencyRequest() 
        }
      ]
    );
  };

  const handleEmergencyRequest = () => {
    Alert.alert(
      'Confirm Emergency Request',
      'Are you sure you want to request an ambulance?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Request', 
          style: 'destructive',
          onPress: () => {
            // Navigate to tracking screen
            router.push('/tracking');
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Emergency Request</Text>
      </View>

      {/* Location Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📍 Location</Text>
        <TouchableOpacity 
          style={styles.locationButton}
          onPress={getLocation}
        >
          <Ionicons name="location" size={24} color="white" />
          <Text style={styles.locationButtonText}>
            {loading ? 'Getting Location...' : 'Share Live Location'}
          </Text>
          {loading && <ActivityIndicator color="white" />}
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          placeholder="Or enter address manually"
          multiline
        />
      </View>

      {/* Severity Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🚨 Emergency Severity</Text>
        <Slider
          style={styles.slider}
          minimumValue={1}
          maximumValue={3}
          step={1}
          value={severity}
          onValueChange={setSeverity}
          minimumTrackTintColor="#FF0000"
          maximumTrackTintColor="#D3D3D3"
        />
        <View style={styles.severityLabels}>
          <Text style={styles.severityText}>Mild</Text>
          <Text style={styles.severityText}>Moderate</Text>
          <Text style={styles.severityText}>Critical</Text>
        </View>
      </View>

      {/* Emergency Type Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>🏥 Emergency Type</Text>
        {['Road Accident', 'Cardiac Emergency', 'Fire Incident', 'Other'].map((type) => (
          <TouchableOpacity
            key={type}
            style={[
              styles.typeButton,
              emergencyType === type && styles.selectedType
            ]}
            onPress={() => setEmergencyType(type)}
          >
            <Text style={[
              styles.typeButtonText,
              emergencyType === type && styles.selectedTypeText
            ]}>
              {type}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Additional Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>ℹ️ Additional Details</Text>
        <TextInput
          style={styles.input}
          placeholder="Number of victims"
          keyboardType="numeric"
          value={victims}
          onChangeText={setVictims}
        />
        <TextInput
          style={[styles.input, styles.multilineInput]}
          placeholder="Additional information (optional)"
          multiline
          numberOfLines={4}
          value={additionalInfo}
          onChangeText={setAdditionalInfo}
        />
      </View>

      {/* Emergency Request Button */}
      <TouchableOpacity
        style={[
          styles.emergencyButton,
          !formComplete && styles.disabledButton
        ]}
        onPress={requestEmergency}
        disabled={!formComplete}
      >
        <Ionicons name="warning" size={24} color="white" />
        <Text style={styles.emergencyButtonText}>
          Request Emergency Assistance
        </Text>
      </TouchableOpacity>

      {/* Quick Call Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>📞 Quick Call</Text>
        <TouchableOpacity style={styles.quickCallButton}>
          <Ionicons name="call" size={24} color="white" />
          <Text style={styles.quickCallButtonText}>Call Emergency Services</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#FF0000',
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  section: {
    backgroundColor: 'white',
    margin: 10,
    padding: 15,
    borderRadius: 10,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
    color: '#333',
  },
  locationButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  locationButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    marginBottom: 10,
  },
  multilineInput: {
    height: 100,
    textAlignVertical: 'top',
  },
  slider: {
    height: 40,
  },
  severityLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  severityText: {
    color: '#666',
    fontSize: 14,
  },
  typeButton: {
    borderWidth: 1,
    borderColor: '#FF0000',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10,
  },
  selectedType: {
    backgroundColor: '#FF0000',
  },
  typeButtonText: {
    color: '#FF0000',
    textAlign: 'center',
    fontSize: 16,
  },
  selectedTypeText: {
    color: 'white',
  },
  emergencyButton: {
    backgroundColor: '#FF0000',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    margin: 10,
    borderRadius: 10,
  },
  disabledButton: {
    backgroundColor: '#ffcccc',
  },
  emergencyButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  quickCallSection: {
    padding: 10,
    marginBottom: 20,
  },
  quickCallButton: {
    backgroundColor: '#4CAF50',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 8,
  },
  quickCallText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
});