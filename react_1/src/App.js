import "./styles/style.scss";
import Gallery from "./components/Gallery";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faChevronDown, faChevronUp, faCircleLeft, faCircleRight } from "@fortawesome/free-solid-svg-icons";
library.add(
  faCircleRight, faCircleLeft, faChevronUp, faChevronDown
);

function App() {
    return(
        <div>
            <Gallery/>
        </div>
    );
}

export default App;
