import { View, Text } from "react-native";
import { useTimer } from "use-timer";
import { speak } from "expo-speech";

export const Timer = ({ duration, onExpiry, nextDuration }) => {
  const { time, advanceTime, pause } = useTimer({
    initialTime: duration,
    timerType: "DECREMENTAL",
    autostart: true,
    onTimeUpdate: () => {
      if (time === 3) {
        speak("three");
      } else if (time === 2) {
        speak("two");
      } else if (time === 1) {
        speak("one");
      } else if (time <= 0 && nextDuration) {
        speak("next");
        advanceTime(-nextDuration);
        onExpiry();
      } else if (time === 0) {
        speak("done");
        pause();
        onExpiry();
      }
    },
  });

  return (
    <View>
      <Text style={{ fontSize: 32 }}>Remaining Time: {time}</Text>
    </View>
  );
};
