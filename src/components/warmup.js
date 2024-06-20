import { Text, View } from "react-native";
import { Timer } from "./timer";
import { useStep } from "../hooks/useStep";

export const Warmup = ({ routine, setActiveSection, nextSection }) => {
  const { currentStep, advance } = useStep(
    routine,
    setActiveSection,
    nextSection
  );

  if (currentStep === null) {
    return null;
  }

  const step = routine[currentStep];

  return (
    <View>
      {step.exercise.map((exercise, index) => {
        return (
          <Text
            style={{ textAlign: "center", fontSize: 28, marginBottom: 32 }}
            key={`${exercise}-${index}`}
          >
            {exercise}
          </Text>
        );
      })}
      <Timer
        duration={step.duration}
        nextDuration={routine[currentStep + 1]?.duration}
        onExpiry={advance}
      />
    </View>
  );
};
