import React, { Component, useState } from 'react'
import { View, Text, Button, Input, Checkbox, Label } from '@tarojs/components'
import getRoomInfo from "../../utils/getRoomInfo"
import updateRoom from "../../utils/updateRoom"
import './index.scss'
import { cloud, getStorageSync, getSystemInfo, showToast } from "@tarojs/taro";
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
    <View className="postItem">
      <View className="authorBox">{post.author}</View>
      {post.content.map((content) => <Item key={content.text} text={content.text} />)}
    </View>
  )
}

const FormBox = ({ onConfirm, index }) => {
  const post = window.posts[index]

  const setType = (type) => {
    post.type = type;
    setActive(type)
  }

  const [active, setActive] = useState(1)

  return (
    <View>
      <View className="inputBox">
        <Input onInput={(e) => {
          post.text = e.detail.value
        }} value={post.text} confirmType="done" type='text' placeholder='最大输入长度为 10' />
        <Button style={{
          visibility: index === 0 ? "visible" : "hidden"
        }} className="send" onClick={onConfirm}> </Button>
      </View>
      <View className="typeBox">
        <Label className='checkbox-list__label'>
          <Checkbox onClick={() => setType(1)} className='checkbox-list__checkbox' value="1" checked={active === 1}>每当</Checkbox>
        </Label>
        <Label className='checkbox-list__label'>
          <Checkbox onClick={() => setType(2)} className='checkbox-list__checkbox' value="2" checked={active === 2}>就会</Checkbox>
        </Label>
      </View>
    </View>
  )
}

window.posts = [{
  text: "",
  type: 1,
}];

export default class Index extends Component<any, {
  roomInfo?: IRoomConfig;
  safeHeight: number;
  posts: {
    text: string;
    type: 1 | 2;
  }[];
  result: string[]
}> {
  constructor(props) {
    super(props);
    this.state = {
      safeHeight: 10,
      result: [],
      posts: window.posts
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
          roomInfo: roomInfo.data[0],
          result: this.generate(roomInfo.data[0].posts)
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

  // shouldComponentUpdate(nextProps, nextState) {
  //   return nextState.roomInfo !== this.state.roomInfo || nextState.type !== this.state.type
  // }

  handleSend = () => {
    const { roomInfo, posts } = this.state;
    const newPost = {
      _openid: "sadffasdfsdfasdfasdf",
      content: posts
    }

    if (posts[0].text !== "") {
      roomInfo && updateRoom(roomInfo?._id, newPost, () => {
        showToast({
          title: '已添加',
          icon: 'success',
          duration: 2000
        })
        roomInfo.posts = [...roomInfo.posts, newPost]
        this.setState({
          posts: [{
            text: '',
            type: 1
          }],
          roomInfo,
          result: this.generate(roomInfo.posts)
        })
      })
    }
  }

  generate = (posts) => {
    let up = [];
    let down: string[] = [];
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
      let random = getRandom(0, down.length - 1);
      if (down[random]) {
        final[index] = `${sens},${down[random]}`;
        down.splice(random, 1)
      }
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

  handleAdd = () => {
    const { posts } = this.state;
    window.posts = [...posts, {
      text: '',
      type: 1
    }];
    this.setState({
      posts: window.posts
    })
  }

  render() {
    const { roomInfo, safeHeight, posts, result } = this.state;
    console.log(posts)
    return (
      <View className='index'>
        {roomInfo && (
          <View>
            <View className="description">
              <Text>{roomInfo.description}</Text>
            </View>
            <View className="posts">
              <View className="postScrollBox">
                {roomInfo.posts.map((post, index) => <PostItem key={post.author + index} post={post} />)}
              </View>
            </View>
            <View className="form">
              {posts.map((post, i) => (
                <FormBox
                  key={post.text}
                  index={i}
                  onConfirm={() => {
                    this.handleSend()
                  }}
                />
              ))}
              <Button onClick={this.handleAdd} className="secondary">添加</Button>
            </View>

            <View className="generator">
              <View className="main">
                {result.length && result.map(para => (
                  <View className="para"><Text>{para}</Text></View>
                ))}
              </View>
            </View>
            <View style={{ paddingBottom: safeHeight }} className="bottomMenu">
              <Button className="primary" openType="share" >邀请好友创作</Button>
              <Button className="secondary" openType="share" >分享作品</Button>
            </View>
          </View>
        )}
      </View>
    )
  }
}
