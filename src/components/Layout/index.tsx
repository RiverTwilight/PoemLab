import React from "react";
import { View } from "@tarojs/components";
import BottomNav from "../BottomNav";
import "./index.scss";

export default function Layout({ children }) {
  return (
    <View className="layout">
      {children}
      {/* <BottomNav /> */}
    </View>
  );
}
