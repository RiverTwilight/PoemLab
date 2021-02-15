import React, { Component } from "react";
import { View, Text } from "@tarojs/components";
import Layout from "../../components/Layout";
import getAllRooms from "../../utils/getAllRooms";
import "./index.scss";
import RoomItem from "../../components/RoomItem";
import login from "../../utils/login";
export default class Index extends Component<
  any,
  {
    roomList: any[];
  }
> {
  constructor(props) {
    super(props);
    this.state = {
      roomList: [],
    };
  }
  componentWillMount() {}

  async componentDidMount() {
    login();
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
    const today = new Date();
    const greeting = [
      ...Array(7).fill("早上好"),
      ...Array(5).fill("中午好"),
      ...Array(5).fill("下午好"),
      ...Array(12).fill("晚上好"),
    ][today.getHours()];
    return (
      <Layout>
        <View className="index">
          <View className="greetingBox">
            <Text>{greeting} ，{}</Text>
          </View>
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
