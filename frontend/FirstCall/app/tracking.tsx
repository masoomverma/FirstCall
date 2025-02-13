import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Dimensions,
  Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker, Polyline, PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';

const { width, height } = Dimensions.get('window');

export default function TrackingScreen() {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [ambulanceLocation, setAmbulanceLocation] = useState(null);
  const [isGPSLost, setIsGPSLost] = useState(false);
  const [eta, setETA] = useState('15');

  const driverDetails = {
    name: "Aryan Singh",
    phone: "+91 9876543210",
    ambulanceId: "TN-01-AM-1234",
    hospitalName: "Apollo Hospital",
    hospitalAddress: "21 Greams Lane, Chennai"
  };

  useEffect(() => {
    getCurrentLocation();
    simulateAmbulanceMovement();
  }, []);

  const getCurrentLocation = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Location permission is required');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
    } catch (error) {
      setIsGPSLost(true);
    }
  };

  const simulateAmbulanceMovement = () => {
    // Simulated ambulance movement
    const interval = setInterval(() => {
      if (currentLocation) {
        setAmbulanceLocation({
          latitude: currentLocation.latitude + (Math.random() - 0.5) * 0.01,
          longitude: currentLocation.longitude + (Math.random() - 0.5) * 0.01,
        });
      }
    }, 3000);

    return () => clearInterval(interval);
  };

  const handleCallDriver = () => {
    Alert.alert('Calling Driver', `Dialing ${driverDetails.phone}`);
  };

  const handleFixGPS = () => {
    setIsGPSLost(false);
    getCurrentLocation();
  };

  return (
    <View style={styles.container}>
      {/* Map View */}
      <View style={styles.mapContainer}>
        {currentLocation && (
          <MapView
            provider={PROVIDER_GOOGLE}
            style={styles.map}
            initialRegion={{
              ...currentLocation,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
          >
            <Marker
              coordinate={currentLocation}
              title="Your Location"
              pinColor="blue"
            />
            {ambulanceLocation && (
              <>
                <Marker
                  coordinate={ambulanceLocation}
                  title="Ambulance"
                >
                  <Ionicons name="medical" size={30} color="#FF0000" />
                </Marker>
                <Polyline
                  coordinates={[currentLocation, ambulanceLocation]}
                  strokeColor="#FF0000"
                  strokeWidth={3}
                />
              </>
            )}
          </MapView>
        )}
      </View>

      {/* Status Panel */}
      <View style={styles.statusPanel}>
        {isGPSLost && (
          <TouchableOpacity style={styles.gpsAlert} onPress={handleFixGPS}>
            <Ionicons name="warning" size={24} color="white" />
            <Text style={styles.gpsAlertText}>GPS Signal Lost! Tap to fix</Text>
          </TouchableOpacity>
        )}

        <View style={styles.driverCard}>
          <View style={styles.driverInfo}>
            <Text style={styles.driverName}>{driverDetails.name}</Text>
            <Text style={styles.ambulanceId}>{driverDetails.ambulanceId}</Text>
          </View>
          <TouchableOpacity style={styles.callButton} onPress={handleCallDriver}>
            <Ionicons name="call" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.hospitalCard}>
          <Text style={styles.hospitalName}>{driverDetails.hospitalName}</Text>
          <Text style={styles.hospitalAddress}>{driverDetails.hospitalAddress}</Text>
        </View>

        <View style={styles.etaCard}>
          <Text style={styles.etaLabel}>Estimated Arrival Time</Text>
          <Text style={styles.etaTime}>{eta} minutes</Text>
        </View>

        <View style={styles.buttonGroup}>
          <TouchableOpacity style={styles.emergencyButton}>
            <Ionicons name="call" size={20} color="white" />
            <Text style={styles.buttonText}>Emergency Call</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    width: width,
    height: height * 0.6,
  },
  statusPanel: {
    flex: 1,
    padding: 10,
  },
  gpsAlert: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  gpsAlertText: {
    color: 'white',
    marginLeft: 10,
  },
  driverCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  driverInfo: {
    flexDirection: 'column',
  },
  driverName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  ambulanceId: {
    fontSize: 14,
    color: 'gray',
  },
  callButton: {
    backgroundColor: 'green',
    padding: 10,
    borderRadius: 5,
  },
  hospitalCard: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  hospitalName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  hospitalAddress: {
    fontSize: 14,
    color: 'gray',
  },
  etaCard: {
    backgroundColor: '#f2f2f2',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  etaLabel: {
    fontSize: 14,
    color: 'gray',
  },
  etaTime: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  emergencyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    marginLeft: 10,
  },
});
