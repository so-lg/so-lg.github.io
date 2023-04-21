import "../assets/css/styles.css"
import HeaderImage from "../assets/img/LogoWBackground.jpeg"
import { Link } from "react-router-dom"
function About() {
    return (
        <section class="about-section text-center mb-5" id="about">
            <div class="container px-4 px-lg-5">
                <div class="row gx-4 gx-lg-5 justify-content-center">
                    <div class="col-lg-8">
                        <h2 class="text-white mb-4">A Humble Start and A Long Journey</h2>
                        <p class="">
                            The birth of Uinderal was in 2018, when BobCalvery, its creator, began to write a story about a character named "Prometheus". Years later, the creation of this character would lead to the creation of multiple universes and draw other contributors to its ongoing story, becoming what is now known today as the Universe of Uinderal.                         </p>
                    </div>
                </div>
                <img class="img-fluid mb-5" src={HeaderImage} alt="Universe of Uinderal's Logo" width={650}/>
                <div class="row gx-4 gx-lg-5 justify-content-center">
                    <div class="col-lg-8">
                        <h4 class="text-white mb-4">But, What Exactly is Uinderal?</h4>
                        <p class="">Uinderal is a fictional universe that contains many dimensions connected to each others. It is often used as a setting for the popular tabletop game Dungeons and Dragons, and is known for its many unique dimensions and characters. Uinderal provides an explanation for everything from the beginning to the end, making it a popular choice for those who enjoy world-building and creating their own stories. As a fictional universe, Uinderal is limited only by the imagination of its creator and those who choose to explore its vast and intricate worlds.</p>
                        <h4 class="text-white mb-4">A Jack of All Trades</h4>
                        <p class="">Naturally, due to its size and its limitless amount of dimensions, Uinderal is known and loved for its twists. A universe this large allows for recurring characters to appear in different settings, which allows stories to stay refreshing. Although it has an official ongoing lore, writers are free to use the story and develop it to their liking, and are encouraged to write their own universes inside of it. Official guides to create new lore in Uinderal are even provided to make the process of creation as simple and satisfying as possible.</p>

                    </div>
                </div>
            </div>
        </section>
    );
  }
export default About;