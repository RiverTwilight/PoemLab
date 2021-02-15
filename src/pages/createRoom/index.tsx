import React, { Component } from "react";
import { View, Text } from "@tarojs/components";
import Layout from "../../components/Layout";
import getAllRooms from "../../utils/getAllRooms";
import "./index.scss";
import RoomItem from "../../components/RoomItem";

export default class Index extends Component<any, {
  roomList: any[]
}> {
  constructor(props) {
    super(props);
    this.state = {
      roomList: [],
    };
  }
  componentWillMount() {}

  async componentDidMount() {
    const roomList = await getAllRooms();
    this.setState({
      roomList,
    });
    wx.getSetting({
      success: () => {
        console.log("调用成功");
      },
      fail: () => {},
    });
  }

  componentWillUnmount() {}

  componentDidShow() {}
  componentDidHide() {}


  handleCreateRoom = () => {};
  render() {
    const { roomList } = this.state;
    return (
      <Layout>
        <View className="index">
          <View className="roomList">
            {roomList.map((config, index) => (
              <RoomItem config={config} index={index} />
            ))}
          </View>
        </View>
      </Layout>
    );
  }
}
