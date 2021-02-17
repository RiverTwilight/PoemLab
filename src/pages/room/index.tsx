import React, { Component } from 'react'
import { View, Text, Button, Input, Checkbox, Label } from '@tarojs/components'
import getRoomInfo from "../../utils/getRoomInfo"
import updateRoom from "../../utils/updateRoom"
import './index.scss'
import { cloud, getStorageSync, getSystemInfo } from "@tarojs/taro";
// TODO 动态转发消息https://developers.weixin.qq.com/miniprogram/dev/framework/open-ability/share/updatable-message.html

cloud.init()

function getRandom(n, m) {
  var num = Math.floor(Math.random() * (m - n + 1) + n)
  return num
}

const PostItem = ({ post }: {
  post: any
}) => {
  const Item = ({ text }) => (
    <View>{text}</View>
  )
  return (
    <View>
      <View className="authorBox">{post.author}</View>
      {post.content.map((content) => <Item key={content.text} text={content.text} />)}
    </View>
  )
}

export default class Index extends Component<any, {
  roomInfo?: IRoomConfig;
  safeHeight: number;
  text?: string;
  type?: 1 | 2;
  list: any[]
}> {
  constructor(props) {
    super(props);
    this.state = {
      safeHeight: 10,
      list: [
        {
          value: 1,
          text: '每当...',
          checked: true
        }, {
          value: 2,
          text: '就会...',
          checked: false
        },
      ]
    };
  }

  onLoad(option) {
    if (option && option.roomId) {
      // 获取到上个页面传递的参数
      let temp = decodeURIComponent(option.roomId) // 解码
      getRoomInfo(temp, roomInfo => {
        console.log(roomInfo);
        if (getStorageSync('login_session').openid === roomInfo.owner) {
          console.log('Owned Room')
        }
        this.setState({
          roomInfo: roomInfo.data[0]
        })
      })
    }
    getSystemInfo({
      success: (res) => {
        let blackBarHeight = res.screenHeight - res.safeArea.bottom
        this.setState({
          safeHeight: blackBarHeight === 0 ? 10 : blackBarHeight
        })
      }
    })
  }
  componentDidMount() {

  }

  handleSend = () => {
    const { roomInfo } = this.state
    roomInfo && updateRoom(roomInfo?._id, {
      author: "",
      content: [
        {
          type: 0,
          text: ''
        }
      ]
    }, () => {
      console.log('Upload successfully')
    })
  }
  generate = () => {
    let up = [];
    let down: string[] = [];
    const { posts } = this.state.roomInfo
    posts.map((post) => {
      post.content.map((sen) => {
        switch (sen.type) {
          case 1: up.push(sen.text); break;
          case 2: down.push(sen.text); break;
        }
      })
    })
    console.log(up, down);
    let final = [...down]
    up.map((sens, index) => {
      let random = getRandom(0, down.length - 1)
      final[index] = `${sens},${down[random]}`;
      down.splice(random, 1)
    })
    console.log(final)
    return final
  }

  onShareAppMessage = (mode: 'share' | 'invite') => {
    const { roomInfo } = this.state
    return {
      share: {
        title: "给你看看我们的作品"
      },
      invite: {
        title: `${roomInfo?.roomName}等你加入，快来玩诗词游戏吧！`
      }
    }[mode]
  }

  render() {
    const { roomInfo, safeHeight, list } = this.state;
    return (
      <View className='index'>
        {roomInfo && (
          <View>
            <View className="description">
              <Text>{roomInfo.description}</Text>
            </View>
            <View className="posts">
              {roomInfo.posts.map((post, index) => <PostItem key={post.author + index} post={post} />)}
            </View>
            <View className="inputBox">
              <Input type='text' placeholder='最大输入长度为 10' />
              <Button className="send" onClick={this.handleSend}> </Button>
            </View>
            <View className="typeBox">
              {list.map((item, i) => {
                return (
                  <Label className='checkbox-list__label' for={i} key={i}>
                    <Checkbox className='checkbox-list__checkbox' value={item.value} checked={item.checked}>{item.text}</Checkbox>
                  </Label>
                )
              })}
            </View>
            <View className="generator">
              <View className="main">
                {roomInfo && this.generate().map(para => (
                  <View className="para"><Text>{para}</Text></View>
                ))}
              </View>
            </View>
            <View style={{ paddingBottom: safeHeight }} className="bottomMenu">
              <Button className="primary" openType="share" >邀请</Button>
              <Button className="secondary" openType="share" >分享</Button>
            </View>
          </View>
        )}
      </View>
    )
  }
}
