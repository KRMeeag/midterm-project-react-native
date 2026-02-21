import { StatusBar } from "expo-status-bar";
import AppNavigator from "./src/navigation";
import { JobProvider } from "./src/contexts/JobContext";
import { ThemeProvider } from "./src/contexts/ThemeContext"; // Adjust path as necessary

export default function App() {
  return (
    <ThemeProvider>
      <JobProvider>
        <AppNavigator />
      </JobProvider>
    </ThemeProvider>
  );
}
