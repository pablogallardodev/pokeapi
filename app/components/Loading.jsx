import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Overlay } from "react-native-elements";
import { ActivityIndicator, Colors } from "react-native-paper";


export default function Loading(props) {
  const { isVisible, text } = props;

  return (
    <Overlay
      isVisible={isVisible}
      windowBackgroundColor="rgba(0,0,0,0.5)"
      overlayBackgroundColor="transparent"
      overlayStyle={styles.overlay}
    >
      <View style={styles.container}>
        <ActivityIndicator animating={true} color={Colors.lightBlue700} />
        {text && <Text style={styles.text}>{text}</Text>}
      </View>
    </Overlay>
  );
}

const styles = StyleSheet.create({
  overlay: {
    height: 100,
    width: 200,
    backgroundColor: "rgba(255,255,255,0.9)",
    borderRadius: 10
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    color: "#0066FF",
    fontSize: 18,
    textTransform: "capitalize",
    marginTop: 10
  }
});
