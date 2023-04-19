import "../assets/css/styles.css"
import Banner from "../assets/img/RogeneFamilyGathering2025.png"
import { Link } from "react-router-dom"
function WikiHome() {
    return (
        <div class="p-5 text-center bg-image" style={{backgroundImage: `url(${Banner})`, height:300,}}>
            <div class="mask" style={{backgroundColor: '#00000050'}}>
                <div class="d-flex justify-content-center align-items-center h-100">
                    <div class="text-white">
                        <h1 class="mb-3">Heading</h1>
                        <h4 class="mb-3">Subheading</h4>
                    </div>
                </div>
            </div>
        </div>
    );
  }
export default WikiHome;