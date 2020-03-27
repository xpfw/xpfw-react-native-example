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
} from 'react-native';

import Header from "./header"

import { Colors } from 'react-native/Libraries/NewAppScreen'
import { registerComponents } from "@xpfw/form-native"
import { SharedField, ExtendedJSONSchema } from "@xpfw/form"
import { BackendClient, UserStore } from "@xpfw/data"
import { Button } from "react-native-elements"
import { useForm } from './app'

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
const FormPage = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header text="@xpfw/form" />
          <View style={styles.body}>
            <View style={styles.sectionContainer}>
                <SharedField schema={RecipeModel} />
            </View>
            <View style={{marginTop: 20, marginLeft: 5, marginRight: 5}}>
              <Button
                title={"Show @xpfw/data"}
                onPress={() => useForm.set(false)}
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

export default FormPage;
