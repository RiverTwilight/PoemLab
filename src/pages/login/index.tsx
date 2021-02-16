import React, { Component } from "react";
import { View, Text, Button } from "@tarojs/components";
import { authorize, navigateBack , getSetting } from "@tarojs/taro";
import login from "../../utils/login";
import Layout from "../../components/Layout";
import "./index.scss";

export default class CreateRoom extends Component<
  any,
  {
    cbUrl: string
  }
  > {
  constructor(props) {
    super(props);
    this.state = {
      cbUrl: '/pages/index/index'
    };
  }
  onLoad(option) {
    if (option && option.cbUrl) {
      this.setState({
        cbUrl: decodeURIComponent(option.cbUrl)
      })
    }

    //TODO 检查是否登录
  }
  handleClick = () => {
    const { cbUrl } = this.state;
    const cb = () => {
      login(() => {
        navigateBack()
      })
    }

    authorize({
      scope: 'scope.userInfo',
      success: function () {
        cb()
      },
      fail() {
        console.log('asfasdfsadf')
      }
    })
  }

  render() {
    return (
      <Layout>
        <View className="index">
          <Button openType="getUserInfo" onClick={this.handleClick}>
            微信一键登录
          </Button>
        </View>
      </Layout>
    );
  }
}
