import React from 'react';
import {TabView} from '@rneui/themed';
import List from './List';
import Tabs from './Tabs';
import Nav from './Nav';
import {View, Text, StyleSheet} from 'react-native';

export default () => {
  const [index, setIndex] = React.useState(0);

  return (
    <>
      {/* <Nav />
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>All</Text>
          <Text style={styles.headerText2}> Books</Text>
        </View>
      </View>
      <Tabs index={index} setIndex={setIndex} />
      <TabView value={index} onChange={setIndex} animationType="spring">
        <TabView.Item style={styles.tabView}>
          <List />
        </TabView.Item>
        <TabView.Item style={styles.tabView}>
          <List />
        </TabView.Item>
      </TabView> */}
      <Text>Test</Text>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  headerText2: {
    fontSize: 20,
  },

  tabView: {
    backgroundColor: 'white',
    width: '100%',
  },
});
