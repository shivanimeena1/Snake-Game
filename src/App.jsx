import "./App.css";
import SnakeGame from "../component/SnakeGame";
import GameLoader from "../component/GameLoader";
import { useEffect, useState } from "react";
function App() {
  const [Loader, setLoader] = useState(false);

  useEffect(() => {
    setLoader(true);
    setInterval(() => {
      setLoader(false);
    }, 3000);
  }, []);
  return <>{Loader ? <GameLoader /> : <SnakeGame />}</>;
}

export default App;
