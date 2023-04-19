import "../assets/css/styles.css"
import { Link } from "react-router-dom"
function Home() {
    return (
        <header class="masthead">
            <div class="container px-4 px-lg-5 d-flex h-100 align-items-center justify-content-center">
                <div class="d-flex justify-content-center">
                    <div class="text-center">
                        <h1 class="mx-auto my-0 text-uppercase">Uinderal</h1>
                        <h2 class="mx-auto mt-2 mb-5">Discover the limitless magical dimensions from a world born from chaos.</h2>
                        <Link class="btn btn-danger" to="Wiki" style={{backgroundColor:"#BF0000"}}>Enter the Universe</Link>
                    </div>
                </div>
            </div>
        </header>
    );
  }
export default Home;