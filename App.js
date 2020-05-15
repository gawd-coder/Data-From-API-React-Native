import React from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  ActivityIndicator
} from 'react-native';

export default class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isLoading: true,
      dataSource: null
    }
  }

  //which will be evoked after the render method and will update the render method to output the data 
  componentDidMount(){
    return fetch("https://reactnative.dev/movies.json")
      .then((response) => response.json())
        .then((responseJSON) => {
          this.setState({
            dataSource: responseJSON.movies
          });
        })
    .catch((error) => {
      console.error("error");  
    })
    .finally(() => {
      this.setState({
        isLoading: false
      });
    })
  }

  render(){
    if(!!this.state.isLoading){
      return(
        <View style = {styles.container}><ActivityIndicator /></View>
      )
    }
    else{
      let movies = this.state.dataSource.map((val,key) => {
        return  <View key={key} style={styles.item}>
                  <Text>{val.title}</Text>
                </View>        
      });
      return(
        <View style={styles.container}>{movies}</View>
      )  
    }  
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
  },
  item: {
    flex: 1,
    alignSelf: "stretch",
    margin: 10,
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ffaaee"
  }
})