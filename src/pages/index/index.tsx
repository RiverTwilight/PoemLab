import React, { Component } from "react";
import { View, Text } from "@tarojs/components";
import BottomNav from "../../components/BottomNav";
import getAllRooms from "../../utils/getAllRooms";
import createRoom from "../../utils/createRoom";
import "./index.scss";

export default class Index extends Component {
  componentWillMount() {}

  async componentDidMount() {
    const roomList = await getAllRooms();
    console.log(roomList);
    // await createRoom("Roomfdasfd", {
    //   owner: "Dsf"
    // })
    wx.getSetting({
      success: () => {
        console.log('调用成功')
      },
      fail: () => {},
    });
  }

  componentWillUnmount() {}

  componentDidShow() {}
  componentDidHide() {}

  handleCreateRoom = () => {
    
  }
  render() {
    return (
      <View className="index">
        <Text>Hello wrld!</Text>
      </View>
    );
  }
}
