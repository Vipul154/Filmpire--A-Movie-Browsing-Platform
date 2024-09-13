import { useAuthStore } from "../../store/authUser";
import AuthScreen from "./AuthScreen";
import HomeScreen from "./HomeScreen";

const HomePage = () => {
  // const user = false;
  const { user } = useAuthStore();
  return <>{user ? <HomeScreen /> : <AuthScreen />}</>;
};

export default HomePage;
