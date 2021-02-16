import React, { Component } from 'react'
import { View, Text, Button } from '@tarojs/components'
import getRoomInfo from "../../utils/getRoomInfo"
import './index.scss'
import { cloud } from "@tarojs/taro";

// TODO 动态转发消息https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/share/updatable-message.html

cloud.init()

const PostItem = () => {

}

export default class Index extends Component<any, {
  roomInfo?: IRoomConfig
}> {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  onLoad(option) {
    if (option && option.roomId) {
      // 获取到上个页面传递的参数
      let temp = decodeURIComponent(option.roomId) // 解码
      getRoomInfo(temp, res => {
        console.log(res)
        this.setState({
          roomInfo: res.data[0]
        })
      })
    }
  }
  componentDidMount() {

  }

  handleInvite = () => {

  }
  handleShare = () => {

  }

  render() {
    const { roomInfo } = this.state;
    return (
      <View className='index'>
        {roomInfo && (
          <View>
            <Text>{roomInfo.roomName}</Text>
            <View className="posts">
              {roomInfo.posts.map((post, index)=><PostItem post={post} />)}
            </View>
            <View className="generator">

            </View>
            <View className="inputBox">

            </View>
            <View className="menu">
              <Button onClick={this.handleInvite}>邀请</Button>
              <Button onClick={this.handleShare}>分享</Button>
            </View>
          </View>
        )}

      </View>
    )
  }
}
