import React, { Component } from "react";
import { View, Text, Button } from "@tarojs/components";
import Layout from "../../components/Layout";
import getUserInfo from "../../utils/getUserInfo";
import login from "../../utils/login";
import RoomItem from "../../components/RoomItem";
import Taro, { getStorageSync, cloud, navigateTo } from "@tarojs/taro";
import "./index.scss";

cloud.init()

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

  async componentDidShow () {
    console.log('onShow')
    const ins = this;
    cloud.init({
      env: 'poem-lab-1grq2bv3285feea1'
    })
    Taro.checkSession({
      success() {
        console.log("登录未过期");
        ins.fetchUserInfo();
      },
      fail() {
        console.log("未登录");
        navigateTo({
          url: '/pages/login/index'
        })
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
          <Button onClick={() => {
            navigateTo({
              url: "/pages/room/index?roomId=b00064a7602bbe35054e9eb608555266",
              success(res) {

              }
            })
          }}>asf</Button>
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
