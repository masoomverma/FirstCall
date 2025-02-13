import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TextInput,
  TouchableOpacity,
  Modal,
  Dimensions,
  ActivityIndicator 
} from 'react-native';
import { Card, DataTable, Badge } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import { Asset } from 'expo-asset';
import * as FileSystem from 'expo-file-system';

const { width } = Dimensions.get('window');

export default function ExplorerScreen() {
  const [hospitals, setHospitals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHospital, setSelectedHospital] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [filters, setFilters] = useState({
    hasICU: false,
    hasBloodBank: false,
    hasAmbulance: false
  });

  useEffect(() => {
    loadHospitalData();
  }, []);

  const loadHospitalData = async () => {
    try {
      // Load sample data while CSV implementation is in progress
      const sampleData = [
        {
          Hospital_Name: "Apollo Hospital",
          Address: "21 Greams Lane, Chennai",
          Available_Beds: "45",
          Blood_Groups_Available: "A+, B+, O+",
          ICU_Beds: "10",
          Ambulances: "5"
        },
        {
          Hospital_Name: "Fortis Malar Hospital",
          Address: "52 1st Main Road, Gandhi Nagar, Chennai",
          Available_Beds: "30",
          Blood_Groups_Available: "All Groups",
          ICU_Beds: "8",
          Ambulances: "3"
        },
        // Add more sample data here
      ];
      
      setHospitals(sampleData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredHospitals = hospitals.filter(hospital => {
    const matchesSearch = hospital.Hospital_Name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         hospital.Address?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilters = (!filters.hasICU || parseInt(hospital.ICU_Beds) > 0) &&
                          (!filters.hasBloodBank || hospital.Blood_Groups_Available !== '') &&
                          (!filters.hasAmbulance || parseInt(hospital.Ambulances) > 0);
    return matchesSearch && matchesFilters;
  });

  const renderHospitalCard = (hospital) => (
    <TouchableOpacity
      key={hospital.Hospital_Name}
      onPress={() => {
        setSelectedHospital(hospital);
        setModalVisible(true);
      }}
    >
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.hospitalName}>{hospital.Hospital_Name}</Text>
          <Text style={styles.address}>{hospital.Address}</Text>
          <View style={styles.statsContainer}>
            <View style={styles.stat}>
              <Ionicons name="bed" size={20} color="#FF6B6B" />
              <Text style={styles.statText}>{hospital.Available_Beds} beds</Text>
            </View>
            <View style={styles.stat}>
              <Ionicons name="water" size={20} color="#FF6B6B" />
              <Text style={styles.statText}>{hospital.Blood_Groups_Available || 'N/A'}</Text>
            </View>
          </View>
          <View style={styles.badgeContainer}>
            {parseInt(hospital.ICU_Beds) > 0 && (
              <Badge style={styles.badge}>ICU</Badge>
            )}
            {parseInt(hospital.Ambulances) > 0 && (
              <Badge style={styles.badge}>Ambulance</Badge>
            )}
          </View>
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Hospital Explorer</Text>
        <TextInput
          style={styles.searchInput}
          placeholder="Search hospitals..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#999"
        />
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filterContainer}>
          {Object.entries(filters).map(([key, value]) => (
            <TouchableOpacity
              key={key}
              style={[styles.filterButton, value && styles.filterButtonActive]}
              onPress={() => setFilters(prev => ({ ...prev, [key]: !value }))}
            >
              <Text style={[styles.filterText, value && styles.filterTextActive]}>
                {key.replace('has', '')}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#FF6B6B" style={styles.loader} />
      ) : (
        <ScrollView style={styles.content}>
          {filteredHospitals.map(renderHospitalCard)}
        </ScrollView>
      )}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {selectedHospital && (
              <>
                <Text style={styles.modalTitle}>{selectedHospital.Hospital_Name}</Text>
                <Text style={styles.modalAddress}>{selectedHospital.Address}</Text>
                <ScrollView>
                  <View style={styles.modalStats}>
                    <Text style={styles.modalStat}>Available Beds: {selectedHospital.Available_Beds}</Text>
                    <Text style={styles.modalStat}>ICU Beds: {selectedHospital.ICU_Beds}</Text>
                    <Text style={styles.modalStat}>Ambulances: {selectedHospital.Ambulances}</Text>
                    <Text style={styles.modalStat}>Blood Groups: {selectedHospital.Blood_Groups_Available}</Text>
                  </View>
                </ScrollView>
                <TouchableOpacity 
                  style={styles.closeButton}
                  onPress={() => setModalVisible(false)}
                >
                  <Text style={styles.closeButtonText}>Close</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    padding: 20,
    backgroundColor: '#FF6B6B',
    paddingTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 15,
  },
  searchInput: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 15,
  },
  filterContainer: {
    marginBottom: 10,
  },
  filterButton: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
  },
  filterButtonActive: {
    backgroundColor: '#FF0000',
  },
  filterText: {
    color: '#FF6B6B',
  },
  filterTextActive: {
    color: 'white',
  },
  content: {
    padding: 10,
  },
  card: {
    marginBottom: 10,
    elevation: 3,
  },
  hospitalName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  address: {
    color: '#666',
    marginBottom: 10,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    marginLeft: 5,
    color: '#666',
  },
  badgeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  badge: {
    backgroundColor: '#FF6B6B',
    marginRight: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 15,
    padding: 20,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  modalAddress: {
    color: '#666',
    marginBottom: 20,
  },
  modalStats: {
    gap: 10,
  },
  modalStat: {
    fontSize: 16,
    color: '#333',
  },
  closeButton: {
    backgroundColor: '#FF6B6B',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});