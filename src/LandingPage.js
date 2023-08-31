import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
} from 'react-native';
import axios from 'axios';
import {Dropdown} from './components';

const LandingPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [uniqueCategories, setUniqueCategories] = useState(new Set());
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios
      .get('https://api.publicapis.org/entries')
      .then(response => {
        setMovies(response.data.entries);
        const categories = new Set(
          response.data.entries.map(movie => movie.Category),
        );
        setUniqueCategories(categories);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching movie data:', error);
        setError('Error fetching movie data. Please try again later.');
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filtered = movies?.filter(
      movie =>
        movie.API.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (!selectedCategory || movie.Category === selectedCategory),
    );
    setFilteredMovies(filtered);
  }, [searchTerm, selectedCategory, movies]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleCategoryChange = category => {
    setSelectedCategory(category);
    toggleDropdown();
  };

  const renderItem = ({item}) => (
    <View style={styles.movieCard}>
      <Image
        source={{uri: 'https://i.imgur.com/gdWuDGD.jpg'}}
        style={styles.image}
      />
      <Text style={styles.movieTitle}>{item.API}</Text>
      <Text>{item.Description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextInput
          placeholder="Search movies..."
          value={searchTerm}
          onChangeText={text => setSearchTerm(text)}
          style={styles.searchInput}
        />
        <Button title="Filter" onPress={toggleDropdown} />
        <Dropdown
          uniqueCategories={uniqueCategories}
          isDropdownOpen={isDropdownOpen}
          handleCategoryChange={handleCategoryChange}
        />
      </View>

      <View style={styles.cardContainer}>
        {error ? (
          <Text style={styles.errorText}>{error}</Text>
        ) : loading ? (
          <Text>Loading...</Text>
        ) : (
          <FlatList
            data={filteredMovies}
            keyExtractor={(item, index) => index.toString()}
            renderItem={renderItem}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 10,
    marginBottom: 10,
    zIndex: 1,
  },
  searchInput: {
    flex: 1,
    marginRight: 10,
    padding: 5,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  cardContainer: {
    marginTop: 16,
  },
  movieCard: {
    marginVertical: 10,
    backgroundColor: '#ffffff',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  image: {
    width: '100%',
    height: 150,
    resizeMode: 'cover',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  movieTitle: {
    fontWeight: 'bold',
    marginTop: 16,
  },
  errorText: {
    color: 'red',
  },
});

export default LandingPage;
