import React from "react";
import { View, Text } from "@tarojs/components";
import "./index.scss";

export default function RoomItem({
  config,
  index,
}: {
  config: {
    roomName: string;
    memberNum: number;
    posts: {
      author: string;
    }[];
  };
  index: number;
}) {
  const { roomName, memberNum, posts } = config;
  return (
    <View className="roomItem">
      <Text>{roomName}</Text>
    </View>
  );
}
