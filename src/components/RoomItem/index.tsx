import React from "react";
import { View, Text } from "@tarojs/components";
import "./index.scss";

export default function RoomItem({
  config,
  index,
}: {
  config: IRoomConfig
  index: number;
}) {
  const { roomName, memberNum, posts } = config;
  return (
    <View className="roomItem">
      <Text className="">{roomName}</Text>
    </View>
  );
}
