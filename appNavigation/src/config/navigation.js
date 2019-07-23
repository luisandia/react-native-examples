import { Navigation } from "react-native-navigation";

export const goToAuth = () =>
  Navigation.setRoot({
    root: {
      stack: {
        id: "App",
        children: [
          {
            component: {
              name: "SignIn",
              passProps: {
                text: "React Native"
              },
              options: {
                statusBar: {
                  visible: true,
                  style: "light",
                  hideWithTopBar: true,
                  blur: true
                },
                topBar: {
                  drawBehind: true,
                  visible: false,
                  animate: false
                }
              }
            }
          }
        ]
      }
    }
  });

export const goHome = () => {
  let bottomTabs = [
    {
      stack: {
        id: "MY_STACK",
        children: [
          {
            component: {
              name: "Home",
              options: {
                bottomTab: {
                  fontSize: 12,
                  text: "Home",
                  icon: require("../assets/img/home.png"),
                  color: "black"
                }
              }
            }
          }
        ]
      }
    },
    {
      stack: {
        children: [
          {
            component: {
              name: "HistoryAll",
              options: {
                bottomTab: {
                  text: "History",
                  fontSize: 12,
                  icon: require("../assets/img/history.png")
                },
                topBar: {
                  hideOnScroll: true,
                  title: {
                    text: "History",
                    color: "white"
                  },
                  leftButtons: [
                    {
                      id: "buttonOne",
                      icon: require("../assets/img/menu.png")
                    }
                  ],
                  background: {
                    color: "#05B8CC"
                  },
                  drawBehind: false,
                  visible: false,
                  animate: true
                }
              }
            }
          }
        ]
      }
    },
    {
      stack: {
        children: [
          {
            component: {
              name: "Notifications",
              options: {
                bottomTab: {
                  text: "Notifications",
                  fontSize: 12,
                  icon: require("../assets/img/notifications.png")
                },
                topBar: {
                  hideOnScroll: true,
                  title: {
                    text: "Notifications",
                    color: "white"
                  },
                  leftButtons: [
                    {
                      id: "buttonOne",
                      icon: require("../assets/img/menu.png")
                    }
                  ],
                  background: {
                    color: "#05B8CC"
                  },
                  drawBehind: false,
                  visible: false,
                  animate: true
                }
              }
            }
          }
        ]
      }
    }
  ];

  Navigation.setRoot({
    root: {
      sideMenu: {
        left: {
          component: {
            id: "sideDrawer",
            name: "SideMenu"
          }
        },
        center: {
          bottomTabs: {
            id: "BottomTabsId",
            children: bottomTabs
          }
        }
      }
    }
  });
};
