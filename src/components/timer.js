import { View, Text } from "react-native";
import { useTimer } from "use-timer";
import { speak } from "expo-speech";
import { Button } from "./Button";
import { useBackgroundApp } from "../hooks/useBackgroundApp";
import { titleCase } from "../utils/utilityFunctions";

export const Timer = ({
  duration,
  onExpiry,
  nextDuration,
  nextStepExercise,
}) => {
  const { time, advanceTime, pause, status, start } = useTimer({
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
      } else if (time <= 0 && nextDuration && nextStepExercise) {
        speak(`${nextStepExercise}`);
        advanceTime(-nextDuration);
        onExpiry(false);
      } else if (time === 0) {
        speak("done");
        pause();
        onExpiry(true);
      }
    },
  });

  useBackgroundApp({ onBackground: pause });

  const upNext = nextStepExercise?.[0];

  return (
    <View>
      <Text
        style={{
          fontSize: 200,
          textAlign: "center",
          fontWeight: 900,
          color: "#fff",
          width: 500,
        }}
      >
        {time}
      </Text>
      {nextStepExercise && (
        <View
          style={{
            flexDirection: "row",
            borderRadius: 1,
            borderColor: "black",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "#fff", fontSize: 18 }}>Next: </Text>
          {nextStepExercise.map((exercise, index, array) => {
            return (
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 18,
                  marginBottom: 32,
                  color: "#fff",
                }}
                key={`${exercise}-${index}`}
              >
                {titleCase(exercise)}
                {index === array.length - 1 ? "" : " - "}
              </Text>
            );
          })}
        </View>
      )}
      <Button onPress={status === "RUNNING" ? pause : start}>
        {status === "RUNNING" ? "Pause" : "Resume"}
      </Button>
    </View>
  );
};
