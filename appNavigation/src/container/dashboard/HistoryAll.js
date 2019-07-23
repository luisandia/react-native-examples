import React from "react";
import { View, Text, FlatList } from "react-native";
import { Navigation } from "react-native-navigation";

export default class HistoryAll extends React.Component {
  constructor(props) {
    super(props);
    this.isSideDrawerVisible = false;
    Navigation.events().bindComponent(this);
    this.state = {
      data: [
        { id: 1, fname: "Adam", lname: "Lamb", age: 21, country: "USA" },
        { id: 2, fname: "Band", lname: "Pro", age: 21, country: "USA" },
        { id: 3, fname: "Clark", lname: "Bow", age: 22, country: "AUS" },
        { id: 4, fname: "Joe", lname: "Joe", age: 24, country: "JAP" },
        { id: 5, fname: "Barry", lname: "Pow", age: 61, country: "CAN" },
        { id: 6, fname: "Garry", lname: "Mann", age: 41, country: "RUS" }
      ]
    };
  }

  navigationButtonPressed({ buttonId }) {
    !this.isSideDrawerVisible
      ? (this.isSideDrawerVisible = true)
      : (this.isSideDrawerVisible = false);

    if (buttonId === "buttonOne") {
      Navigation.mergeOptions(this.props.componentId, {
        sideMenu: {
          left: {
            visible: this.isSideDrawerVisible
          }
        }
      });
    }
  }

  navigateToNextScreen = () => {
    Navigation.push(this.props.componentId, {
      component: {
        name: "FormScreen",
        options: {
          bottomTabs: {
            visible: false,
            drawBehind: true,
            animate: true
          }
        }
      }
    });
  };

  render() {
    return (
      <View style={{ flex: 1, paddingTop: 15 }}>
        {this.state.data.length > 0 ? (
          <FlatList
            data={this.state.data}
            renderItem={(item, index) => {
              return (
                <View key={index}>
                  <Text>{item.fname}</Text>
                </View>
              );
            }}
          />
        ) : (
          <View style={{ flex: 1, justifyContent: "center" }}>
            <Text style={{ textAlign: "center", fontSize: 20 }}>
              No History
            </Text>
          </View>
        )}
      </View>
    );
  }
}

// const styles = StyleSheet.create({
//   welcome: {
//     fontSize: 28
//   },
//   container: {
//     flex: 1
//   },
//   item1: {
//     fontSize: 17,
//     fontWeight: "bold"
//   },
//   item: {
//     fontSize: 15
//   },
//   details: {
//     flexDirection: "row",
//     alignItems: "center"
//   }
// });
