/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';

import Header from "./header"

import { Colors } from 'react-native/Libraries/NewAppScreen'
import { registerComponents } from "@xpfw/form-native"
import { SharedField, ExtendedJSONSchema } from "@xpfw/form"
import { BackendClient, UserStore } from "@xpfw/data"
import { useForm } from './app'
import Create from "./create"
import Edit from "./edit"
import List from "./list"

registerComponents()

const RecipeName = {
  title: "name",
  type: "string",
  label: "Name"
}

const RecipeAuthor = {
  title: "createdBy",
  type: "string",
  label: "Created By"
}


const RecipeModel = {
  title: "recipeModel",
  collection: "recipes",
  type: "object",
  required: [String(RecipeName.title), String(RecipeAuthor.title)],
  properties: {
    [String(RecipeName.title)]: RecipeName,
    [String(RecipeAuthor.title)]: RecipeAuthor
  }
}

for (let i = 0; i < 10; i++) {
  BackendClient.client.create("recipes", {name: `Recipe #${i}`, createdBy: `Author #${i}`})
}

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header text="@xpfw/data" />
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Create</Text>
                <Create schema={RecipeModel} prefix="create" />
            </View>
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>Edit</Text>
                <Edit schema={RecipeModel} id={0} />
            </View>
            <View style={styles.sectionContainer}>
                <Text style={styles.sectionTitle}>List</Text>
                <List collection={RecipeModel.collection} schema={RecipeModel} />
            </View>
            <View style={{marginTop: 20, marginLeft: 5, marginRight: 5}}>
              <Button
                title={"Show @xpfw/form"}
                onPress={() => useForm.set(true)}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default App;
