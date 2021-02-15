import React, { Component } from "react";
import { View, Text, Button } from "@tarojs/components";
import { showLoading, getStorageInfo } from "@tarojs/taro";
import Layout from "../../components/Layout";
import createRoom from "../../utils/createRoom";
import "./index.scss";

export default class CreateRoom extends Component<
  any,
  {
    title: string;
    template: 1;
  }
> {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      template: 1,
    };
  }
  componentWillMount() {}

  componentWillUnmount() {}

  componentDidShow() {}
  componentDidHide() {}
  componentDidMount() {
    //TODO 检查是否登录
  }
  handleCreateRoom = () => {
    const { title } = this.state;
    showLoading({
      title: "加载中",
    });
    getStorageInfo({
      async success(res) {
        console.log(res.OpenID);
        const create = await createRoom(title, {
          owner: res.OpenID,
        });
      },
    });
  };
  render() {
    const { roomList } = this.state;
    return (
      <Layout>
        <View className="index"></View>
      </Layout>
    );
  }
}
