import { Text, TouchableOpacity } from "react-native";

export const Button = ({ children, onPress, style }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        borderColor: "#fff",
        borderWidth: 2,
        borderRadius: 30,
        padding: 8,
        marginTop: 32,
        alignItems: "center",
        width: 200,
        alignSelf: "center",
        ...style,
      }}
    >
      <Text
        style={{
          textAlign: "center",
          fontSize: 18,
          fontWeight: 800,
          color: "#fff",
        }}
      >
        {children}
      </Text>
    </TouchableOpacity>
  );
};
