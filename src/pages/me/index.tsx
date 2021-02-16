import React, { Component } from 'react'
import { getUserInfo, authorize, getSetting } from "@tarojs/taro"
import { View, Text } from '@tarojs/components'
import './index.scss'

export default class Me extends Component {

  componentWillMount() { }

  componentDidMount() {

    Taro.getSetting({
      success: function (res) {
        if (!res.authSetting['scope.record']) {
          Taro.authorize({
            scope: 'scope.userInfo',
            success: function () {
            }
          })
        }
      }
    })
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  render() {
    return (
      <View className='index'>
        <Text>我的</Text>
      </View>
    )
  }
}
