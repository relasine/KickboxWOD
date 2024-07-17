import { Text, View } from "react-native";
import { Timer } from "./Timer";
import { useStep } from "../hooks/useStep";
import { titleCase } from "../utils/utilityFunctions";

export const Exercise = ({ routine, setWorkoutDone }) => {
  const { currentStep, advance } = useStep(routine);

  if (currentStep === null) {
    return null;
  }

  const step = routine[currentStep];
  const nextStepExercise = routine[currentStep + 1]?.exercise;

  const onExpiry = (done) => {
    if (done) {
      setWorkoutDone();
    } else {
      advance();
    }
  };

  return (
    <View>
      {step.section && (
        <Text
          style={{
            fontSize: 36,
            fontWeight: 800,
            margin: 32,
            color: "#fff",
            textAlign: "center",
          }}
        >
          {step.section.toUpperCase()}
        </Text>
      )}
      {!!step.position && (
        <Text
          style={{
            textAlign: "center",
            fontSize: 22,
            marginBottom: 16,
            color: "#fff",
          }}
        >
          Position: {titleCase(step.position)}
        </Text>
      )}
      <View
        style={{
          flexDirection: "row",
          borderRadius: 1,
          borderColor: "black",
          justifyContent: "center",
        }}
      >
        {step.exercise.map((exercise, index, array) => {
          return (
            <Text
              style={{
                textAlign: "center",
                fontSize: 28,
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

      <Timer
        duration={step.duration}
        nextDuration={routine[currentStep + 1]?.duration}
        onExpiry={onExpiry}
        nextStepExercise={nextStepExercise}
      />
    </View>
  );
};
