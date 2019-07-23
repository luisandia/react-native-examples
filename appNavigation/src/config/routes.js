import React from "react";

import { Navigation } from "react-native-navigation";

import { View } from "react-native";

import { Provider } from "react-redux";
import SignUp from "../container/auth/SignUp";
import SignIn from "../container/auth/SignIn";
import Dashboard from "../container/dashboard/Home";
import Header from "../components/common/Header";
import SideMenu from "../components/common/SideMenu";
import GeneralDetails from "../container/dashboard/GeneralDetails";
import ForgotPassword from "../container/auth/ForgotPassword";
import HistoryAll from "../container/dashboard/HistoryAll";
import Notifications from "../container/dashboard/Notifications";
/* eslint-disable */
var background = require("../assets/img/Screen.jpg");
const WrapScreen = (ReduxScreen, store, headerProps) => props => (
  <Provider store={store}>
    <View style={{ flex: 1 }}>
      {/* <View
        style={{
          flex: 1,
          position: "absolute",
          top: 0,
          height: "100%",
          width: "100%"
        }}
      >
        <Image source={background} />
      </View> */}
      <View style={{ flex: 1, zIndex: 99 }}>
        {!headerProps.disableHeader ? (
          <Header
            title={headerProps.title}
            hideBack={headerProps.hideBack}
            hideDrawer={headerProps.hideDrawer}
            color={headerProps.color}
            rightIcon={headerProps.rightIcon}
            onRightPress={headerProps.onRightPress}
            rightText={headerProps.rightText}
            headerText={headerProps.headerText}
            onBackPress={() => Navigation.pop(props.componentId)}
            searchBox={headerProps.searchBox}
            onChangeSearchText={headerProps.onChangeSearchText}
            searchText={headerProps.searchText}
            searchPlaceHolder={headerProps.searchPlaceHolder}
            onDrawerPress={() =>
              Navigation.mergeOptions(props.componentId, {
                sideMenu: {
                  left: {
                    visible: true
                  }
                }
              })
            }
          />
        ) : null}
        <ReduxScreen {...props} />
      </View>
    </View>
  </Provider>
);
/* eslint-enable */

export const registerScreens = (store, Provider) => {
  // Loader Stack
  Navigation.registerComponentWithRedux(
    "Loader",
    () => require("../container/AppContainer").default,
    Provider,
    store
  );
  // Auth stack
  Navigation.registerComponent(
    "SignIn",
    () => WrapScreen(SignIn, store, { disableHeader: true }),
    () => SignIn
  );
  Navigation.registerComponent(
    "SignUp",
    () => WrapScreen(SignUp, store, { disableHeader: false, hideDrawer: true }),

    () => SignUp
  );
  Navigation.registerComponent(
    "ForgotPassword",
    () =>
      WrapScreen(ForgotPassword, store, {
        disableHeader: false,
        hideDrawer: true
      }),

    () => ForgotPassword
  );
  // Dashboard Stack
  Navigation.registerComponent(
    "Home",

    () => WrapScreen(Dashboard, store, { title: "Home" }),

    () => Dashboard
  );

  Navigation.registerComponent(
    "HistoryAll",

    () => WrapScreen(HistoryAll, store, { title: "History" }),

    () => HistoryAll
  );
  Navigation.registerComponent(
    "Notifications",

    () => WrapScreen(Notifications, store, { title: "Notifications" }),

    () => Notifications
  );
  Navigation.registerComponent(
    "GeneralDetails",

    () =>
      WrapScreen(GeneralDetails, store, { title: "Home", hideDrawer: true }),

    () => GeneralDetails
  );
  Navigation.registerComponentWithRedux(
    "SideMenu",
    () => SideMenu,
    Provider,
    store
  );
};
