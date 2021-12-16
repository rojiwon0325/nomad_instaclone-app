import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

const HeaderBack: React.FC<{ canGoBack: Boolean, goBack: () => void }> = ({ canGoBack, goBack }) => {
    if (canGoBack) {
        return <TouchableOpacity onPress={() => goBack()}><Ionicons name="chevron-back" color="rgb(0,149,253)" size={25} /></TouchableOpacity>;
    } else {
        return null;
    }
}

export default HeaderBack;