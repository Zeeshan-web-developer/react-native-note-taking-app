import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  FlatList,
  Alert,
} from 'react-native';
import React, {useMemo} from 'react';
import {Icon} from '@rneui/base';
import {Button} from '@rneui/themed';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Props = {};
type ViewStyle = {
  [key: string]: string | number | undefined;
};

const App = (props: Props) => {
  const [isDialogVisible, setIsDialogVisible] = React.useState(false);
  const [notes, setNotes] = React.useState([]);
  const [noteBgColors, setNoteBgColors] = React.useState([
    'lightblue',
    'lightgreen',
    'lightcoral',
    'lightcyan',
    'lightgoldenrodyellow',
    'lightgray',
    'lightpink',
    'lightsalmon',
    'lightseagreen',
    'lightskyblue',
    'lightslategray',
    'lightsteelblue',
    'lightyellow',
  ]);

  const [searchText, setSearchText] = React.useState('');
  const [note, setNote] = React.useState({
    title: '',
    content: '',
  });
  const loadNotes = async () => {
    try {
      const notes = await AsyncStorage.getItem('notes');
      if (notes) {
        //  sort  by latest date
        const sortedNotes = JSON.parse(notes).sort((a, b) => b.id - a.id);
        setNotes(sortedNotes);
      }
    } catch (error) {
      console.error('Failed to load notes');
    }
  };
  React.useEffect(() => {
    // Load notes from storage
    loadNotes();
  }, []);
  const saveNote = async () => {
    if (!note.title || !note.content) {
      Alert.alert('Please enter title and content');
      return;
    }
    try {
      const newNote = {
        id: Date.now(),
        title: note.title,
        content: note.content,
      };
      const newNotes = [newNote, ...notes];
      await AsyncStorage.setItem('notes', JSON.stringify(newNotes));
      setNotes(newNotes);
      setIsDialogVisible(false);
      Alert.alert('Note saved successfully');
      setNote({
        title: '',
        content: '',
      });
    } catch (error) {
      console.error('Failed to save note');
    }
  };

  const allNotes = useMemo(() => {
    if (!searchText) return notes;
    return notes.filter(note =>
      note?.title?.toLowerCase()?.includes(searchText),
    );
  }, [notes, searchText]);

  const [sortOrder, setSortOrder] = React.useState('desc'); // ['asc', 'desc'
  const sortNotesByDate = () => {
    if (sortOrder === 'desc') {
      const sortedNotes = [...notes].sort((a, b) => a.id - b.id);
      setNotes(sortedNotes);
      setSortOrder('asc');
      return;
    }
    const sortedNotes = [...notes].sort((a, b) => b.id - a.id);
    setNotes(sortedNotes);
    setSortOrder('desc');
  };
  return (
    <View style={{flex: 1}}>
      <View>
        {/* header */}
        <View style={styles.header}>
          <Icon name="menu" />
          <Text style={styles.heading}>Notes</Text>
          {
            <View>
              <Icon name="refresh" onPress={loadNotes} />
              <Text onPress={() => sortNotesByDate()}>
                {sortOrder === 'desc' ? (
                  <Icon name="arrow-downward" />
                ) : (
                  <Icon name="arrow-upward" />
                )}
              </Text>
            </View>
          }
          {/* refrsh */}
        </View>
        {/* search bar */}
        <View style={styles.searchConatiner}>
          <View style={styles.searchInnerContainer}>
            <Icon name="search" />
            <TextInput
              placeholder="Search"
              style={{flex: 1}}
              onChangeText={text => {
                setSearchText(
                  text
                    ?.toLowerCase()
                    .replace(/[^a-zA-Z0-9]/g, '')
                    .replace(/\s+/g, ' '),
                );
              }}
            />
          </View>
        </View>

        <FlatList
          style={{padding: 10}}
          scrollEnabled={true}
          data={allNotes}
          renderItem={({item, index}) => (
            <TouchableOpacity
              key={index}
              delayLongPress={200}
              style={[
                styles.cardContainer,
                {backgroundColor: noteBgColors[index % noteBgColors.length]},
              ]}
              onLongPress={() => {
                Alert.alert('Delete Note', 'Are you sure?', [
                  {
                    text: 'Yes',
                    onPress: async () => {
                      const newNotes = notes.filter(
                        note => note.id !== item.id,
                      );
                      await AsyncStorage.setItem(
                        'notes',
                        JSON.stringify(newNotes),
                      );
                      setNotes(newNotes);
                      Alert.alert('Note deleted successfully');
                    },
                  },
                  {
                    text: 'No',
                  },
                ]);
              }}>
              {/* <View key={index} style={styles.cardContainer}> */}
              <Text style={styles.noteDate}>
                {new Date(item.id).toDateString() +
                  ' ' +
                  new Date(item.id).toLocaleTimeString()}
              </Text>
              <Text>
                <Text style={{fontWeight: 'bold'}}>Title: </Text>
                {item.title}
              </Text>
              <Text>
                <Text style={{fontWeight: 'bold'}}>Content: </Text>
                {item.content}
              </Text>
              {/* </View> */}
            </TouchableOpacity>
          )}
          numColumns={2}
          keyExtractor={(item, index) => index.toString()}
        />
        {/* </View> */}
      </View>
      {/* add a fixed button for add */}
      <View
        style={{
          position: 'absolute',
          bottom: 20,
          right: 20,
          backgroundColor: 'lightblue',
          padding: 16,
          borderRadius: 50,
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 4},
          shadowOpacity: 0.25,
          shadowRadius: 4,
          elevation: 4, // For Android shadow
        }}>
        <TouchableOpacity onPress={() => setIsDialogVisible(true)}>
          <Icon name="add" />
        </TouchableOpacity>
      </View>

      {/* Modal to create note */}
      <Modal visible={isDialogVisible} animationType="slide">
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 16,
            backgroundColor: '#fffdff',
            shadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
          }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold',
            }}>
            <Icon
              name="arrow-back"
              style={{
                marginRight: 8,
              }}
              onPress={() => setIsDialogVisible(false)}
            />
            Create Note
          </Text>
        </View>
        <View
          style={{
            marginTop: 5,
            marginLeft: 5,
            marginRight: 5,
            marginBottom: 5,
            height: 'auto',
            padding: 8,
            backgroundColor: 'white',
            borderRadius: 8,
            borderWidth: 1,
            shadowColor: 'lightblue',
            shadowOffset: {width: 0, height: 4},
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 5,

            borderColor: 'lightgray',
          }}>
          <Text>Title</Text>
          <TextInput
            style={{
              borderWidth: 1,
              borderColor: 'lightgray',
              borderRadius: 8,
              padding: 8,
              marginBottom: 8,
            }}
            value={note.title}
            onChangeText={text => setNote({...note, title: text})}
          />
          <Text>Content</Text>
          <TextInput
            multiline
            numberOfLines={4}
            style={{
              borderWidth: 1,
              borderColor: 'lightgray',
              borderRadius: 8,
              padding: 2,
              marginBottom: 8,
            }}
            value={note.content}
            onChangeText={text => setNote({...note, content: text})}
          />

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              padding: 16,
            }}>
            <TouchableOpacity onPress={() => setIsDialogVisible(false)}>
              <Button onPress={() => setIsDialogVisible(false)}>
                <Icon name="close" />
                <Text>Close</Text>
              </Button>
            </TouchableOpacity>
            <TouchableOpacity>
              <Button
                onPress={() => {
                  saveNote();
                }}>
                <Icon name="done" />
                <Text>Save</Text>
              </Button>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = {
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fffdff',
    shadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  searchConatiner: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fffdff',
    shadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  },
  searchInnerContainer: {
    alignItems: 'center',

    width: '100%',
    flexDirection: 'row',
    backgroundColor: '#e0e0e0',
    borderRadius: 8,
    padding: 8,
  },

  cardContainer: {
    width: '48%', // Adjust the width as needed
    marginBottom: 10, // Add margin between cards
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: 'lightblue',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    margin: 1,
  },
  noteDate: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
};
export default App;
