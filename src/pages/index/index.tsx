import React, { Component } from "react";
import { View, Text } from "@tarojs/components";
import BottomNav from "../../components/BottomNav";
import getAllRooms from "../../utils/getAllRooms";
import "./index.scss";

export default class Index extends Component {
  componentWillMount() {}

  async componentDidMount() {
    const roomList = await getAllRooms();
    console.log(roomList);
  }

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return (
      <View className="index">
        <Text>Hello world!</Text>
      </View>
    );
  }
}
