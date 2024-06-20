import { useState, useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Warmup } from "./src/components/warmup";

import { WARMUP, BAG_ROUNDS, POWER_ROUNDS } from "./src/constants/constants";

export default function App() {
  const [workout, setWorkout] = useState(null);
  const [activeSection, setActiveSection] = useState(null);

  useEffect(() => {
    const fetchWorkout = async () => {
      try {
        const response = await fetch("http://localhost:3000/");
        const parsedWorkout = await response.json();
        setWorkout(parsedWorkout);
        setActiveSection(WARMUP);
      } catch (e) {
        console.log(e);
      }
    };

    fetchWorkout();
  }, []);

  if (!workout || !activeSection) {
    return (
      <View style={styles.container}>
        <Text>Loading</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 36, fontWeight: 800, margin: 32 }}>
        {activeSection.toUpperCase()}
      </Text>
      {activeSection === WARMUP && (
        <Warmup
          routine={workout.warmup}
          setActiveSection={setActiveSection}
          nextSection={BAG_ROUNDS}
        />
      )}
      {activeSection === BAG_ROUNDS && (
        <Warmup
          routine={workout.bagRounds}
          setActiveSection={setActiveSection}
          nextSection={POWER_ROUNDS}
        />
      )}
      {activeSection === POWER_ROUNDS && (
        <Warmup
          routine={workout.powerRounds}
          setActiveSection={setActiveSection}
          nextSection={null}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
