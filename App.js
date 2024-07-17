import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Exercise } from "./src/components/Exercise";

import { WARMUP, BAG_ROUNDS, POWER_ROUNDS } from "./src/constants/constants";
import { Button } from "./src/components/Button";

export default function App() {
  const [workout, setWorkout] = useState(null);
  const [workoutStarted, setWorkoutStarted] = useState(false);
  const [workoutDone, setWorkoutDone] = useState(false);

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const response = await fetch("http://10.0.0.84:3000/");
        const parsedWorkout = await response.json();
        setWorkout(parsedWorkout);
      } catch (e) {
        console.log(e);
      }
    };

    fetchWorkout();
  }, []);

  if (!workout) {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {workoutStarted && !workoutDone && (
        <Exercise routine={workout} setWorkoutDone={setWorkoutDone} />
      )}
      {!workoutStarted && !workoutDone && (
        <Button onPress={() => setWorkoutStarted(true)}>Start workout</Button>
      )}
      {workoutDone && (
        <Text
          style={{
            fontSize: 36,
            fontWeight: 800,
            margin: 32,
            color: "#fff",
            textAlign: "center",
          }}
        >
          Done!
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
});
