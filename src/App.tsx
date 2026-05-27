import { Home } from "./pages/Home";
import { ScrollToTop } from "./components/ScrollToTop/ScrollToTop";
import { BackgroundNetwork } from "./components/BackgroundNetwork/BackgroundNetwork";
import "./styles.css"; // The original global css

function App() {
    return (
        <>
            <BackgroundNetwork />
            <ScrollToTop />
            <Home />
        </>
    );
}

export default App;
