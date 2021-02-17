import React from "react";
import { View, Text } from "@tarojs/components";
import { navigateTo } from "@tarojs/taro"
import "./index.scss";

export default function RoomItem({
  config,
  index,
}: {
  config: IRoomConfig
  index: number;
}) {
  const { roomName, memberNum, posts, _id } = config;
  const handleClick = () => {
    navigateTo({
      url: `/pages/room/index?roomId=${_id}`,
      success(res) {

      }
    })
  }
  return (
    <View className="roomItem" onClick={handleClick}>
      <Text className="">{roomName}</Text>
      <View></View>
    </View>
  );
}
