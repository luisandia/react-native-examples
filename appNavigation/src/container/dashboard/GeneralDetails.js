import React from "react";
import { View, TouchableOpacity } from "react-native";
import { connect } from "react-redux";
import * as AppAction from "../../actions";
import { removeListeners } from "../../utilities/listeners";
import { Navigation } from "react-native-navigation";
import { manageComponentStats } from "../../actions/componentStats";
import { userList } from "../../actions/list/listAction";
// import Loader from "./../../components/common/loader";

import GeneralCard from "../../components/generalCard";
import { moderateScale } from "../../helpers/ResponsiveFonts";
import Icon from "react-native-vector-icons/FontAwesome";
import constants from "../../constants";

let removeListener = true;

class GeneralDetails extends React.Component {
  constructor(props) {
    super(props);
    this.isSideDrawerVisible = false;
    Navigation.events().bindComponent(this);
  }

  static getDerivedStateFromProps(props, state) {
    // Store prevId in state so we can compare when props change.
    // Clear out previously-loaded data (so we don't render stale stuff).
    if (props.listData !== (state && state.listData)) {
      return {
        listData: props.listData
      };
    }
    // No state update necessary
    return null;
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

  componentDidMount() {
    this.props.userList();
    this.props.dispatch(
      manageComponentStats(
        this.props.componentId,
        "Home",
        this.props.componentStats
      )
    );
  }
  componentWillUnmount() {
    if (removeListener) {
      removeListeners();
    }
  }

  render() {
    // if (false) {
    //   return (
    //     <View
    //       style={{
    //         flex: 1,
    //         justifyContent: "center",
    //         alignItems: "center"
    //       }}
    //     >
    //       <Loader />
    //     </View>
    //   );
    // }
    return (
      <View style={{ flex: 1, paddingHorizontal: moderateScale(25) }}>
        <View
          style={{
            zIndex: 0
          }}
        >
          <GeneralCard data={this.props.data} detailedMessage={true} />
        </View>
        <TouchableOpacity
          style={{
            position: "absolute",
            right: moderateScale(20),
            bottom: moderateScale(20),
            height: moderateScale(40),
            width: moderateScale(40),
            borderRadius: moderateScale(100),
            backgroundColor: "rgb(62, 156, 236)",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1
          }}
        >
          <Icon name={"sliders"} size={30} color={constants.Colors.White} />
        </TouchableOpacity>
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    componentStats: state.componentStats.componentStats,
    listData: state.userList.listData,
    loading: state.userList.loading
  };
}

const mapDispatchToProps = dispatch => {
  return {
    userList: () => {
      dispatch(userList());
    },
    logOut: () => {
      dispatch(AppAction.logOut());
    },
    dispatch: () => {}
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GeneralDetails);

// const styles = StyleSheet.create({});
