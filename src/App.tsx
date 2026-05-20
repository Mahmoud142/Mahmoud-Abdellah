import { Home } from "./pages/Home";
import { CursorFollower } from "./components/CursorFollower/CursorFollower";
import "./styles.css"; // The original global css

function App() {
    return (
        <>
            <CursorFollower />
            <Home />
        </>
    );
}

export default App;
