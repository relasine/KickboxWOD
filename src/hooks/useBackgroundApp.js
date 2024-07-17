import { useRef, useEffect } from "react";
import { AppState } from "react-native";

export const useBackgroundApp = ({ onBackground, onActive }) => {
  const appState = useRef(AppState.currentState);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState === "background" && onBackground) {
        onBackground();
      } else if (nextAppState === "active" && onActive) {
        onActive();
      }

      appState.current = nextAppState;
    });

    return () => {
      subscription.remove();
    };
  }, []);
};
