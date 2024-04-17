import * as React from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Pressable,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

function App() {
  const [todos, setTodos] = React.useState<string[]>([]);
  const [input, setInput] = React.useState<string>('');
  const navigation = useNavigation();
  const storeInAsyncStorage = async () => {
    try {
      await AsyncStorage.setItem('todos', JSON.stringify(todos));
      console.log('Data saved', todos);
    } catch (e) {
      console.log(e);
    }
  };

  const getFromAsyncStorage = async () => {
    try {
      const value = await AsyncStorage.getItem('todos');
      console.log({getFromAsyncStorage: value});
      if (value !== null) {
        setTodos(JSON.parse(value));
      }
    } catch (e) {
      console.log(e);
    }
  };
  React.useEffect(() => {
    getFromAsyncStorage();
  }, []);
  type itemProps = {
    item: string;
  };
  const renderItem = ({item}: itemProps) => (
    <Pressable
      style={styles.todoItem}
      onPress={() => {
        navigation.navigate('ProductDetail', {todo: item});
      }}>
      <Text style={styles.todoText}>{item}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text
            style={{
              marginBottom: 15,
              textAlign: 'center',
              fontSize: 20,
              fontWeight: 'bold',
            }}>
            Add a new task
          </Text>

          <View style={styles.wrap}>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                value={input}
                onChangeText={setInput}
                placeholder="Enter task"
              />
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              gap: 10,
              marginTop: 10,
            }}>
            <TouchableOpacity
              style={{...styles.openButton, backgroundColor: 'green'}}
              onPress={() => {
                setTodos([...todos, input]);
                setInput('');
                storeInAsyncStorage();
              }}>
              <Text style={styles.textStyle}>Add</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <FlatList
        style={styles.todoList}
        data={todos}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  wrap: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  inputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#ccc',
    borderRadius: 5,
  },
  input: {
    paddingHorizontal: 10,
    borderColor: 'gray',
    borderWidth: 1,
    flex: 1,
    borderRadius: 5,
  },
  calendarButton: {
    backgroundColor: 'blue',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  addButton: {
    backgroundColor: 'blue',
    marginLeft: 10,
    borderRadius: 5,
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    marginLeft: 5,
  },
  icon: {
    marginRight: 5,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f7f7f7',
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  taskList: {
    flex: 1,
  },
  taskItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  taskText: {
    flex: 1,
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: 'red',
    borderRadius: 5,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  openButton: {
    backgroundColor: '#F194FF',
    borderRadius: 5,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  todoList: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  todoItem: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    elevation: 2,
  },
  todoText: {
    fontSize: 16,
  },
});

export default App;
