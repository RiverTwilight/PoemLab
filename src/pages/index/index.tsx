import React, { Component } from "react";
import { View, Text } from "@tarojs/components";
import Layout from "../../components/Layout";
import getUserInfo from "../../utils/getUserInfo";
import login from "../../utils/login";
import RoomItem from "../../components/RoomItem";
import Taro, { getStorageSync } from "@tarojs/taro";
import "./index.scss";

export default class Index extends Component<
  any,
  {
    roomList: any[];
    userInfo: any;
  }
> {
  constructor(props) {
    super(props);
    this.state = {
      roomList: [],
      userInfo: {
        nickName: "游客",
      },
    };
  }

  /**
   * 获取服务器上的用户信息
   */
  fetchUserInfo = async () => {
    const { openid } = getStorageSync("login_session");
    const userData = await getUserInfo(openid);
    Taro.getUserInfo({
      success(res) {
        this.setState({
          userInfo: res.userInfo,
        });
      },
    });
    this.setState({
      roomList: [...userData?.ownRoom],
    });
  };

  async componentDidMount() {
    const ins = this;
    Taro.checkSession({
      success() {
        console.log("登录未过期");
        ins.fetchUserInfo();
      },
      fail() {
        console.log("登录已过期");
        login(ins.fetchUserInfo);
      },
    });
  }

  render() {
    const { roomList, userInfo } = this.state;
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
            <Text>
              {greeting} ，{userInfo.nickName}
            </Text>
          </View>
          <View className="roomList">
            {roomList.length ? (
              roomList.map((config, index) => (
                <RoomItem config={config} index={index} />
              ))
            ) : (
              <View className="centerText">点击下方按钮创建房间</View>
            )}
          </View>
        </View>
      </Layout>
    );
  }
}
