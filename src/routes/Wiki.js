import "../assets/css/styles.css"
import Banner from "../assets/img/WikiBanner.png"
import { Link } from "react-router-dom"
import WikiJson from "../UniverseData.json"
import { useLocation } from 'react-router-dom';



function WikiHome() {
    return (
        <div class="Container">
            <div class="text-center bg-image" style={{backgroundImage: `url(${Banner})`, height:300,}}>
                <div class="mask" style={{backgroundColor: '#000000A0', height:300}}>
                    <div class="d-flex justify-content-center align-items-center h-100">
                        <div class="text-white">
                            <h1 class="mb-3">Universe of Uinderal's Wiki</h1>
                            <h4 class="mb-3">Quench your thirst for knowledge</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div class="d-flex flex-column p-5 justify-content-center align-items-center">
                <h2>Welcome to Uinderal</h2>
                <p>Welcome to the lore guide of the universe of Uinderal, in this document you will be able to find the answer to most of your questions. As for the unanswered ones, feel free to use your own theories as answers to them. Uinderal is a universe which was initially developed as a story but which was later developed for it to be used with dungeons and dragons. While most universes of dungeons and dragons allow for some homebrew content in them at the dungeon’s master discretion, they often do not provide the dungeon master with a quick and simple logical way to create anything they’d like to without spending countless amounts of hours to create content that’ll help them tie up their plot holes, Uinderal does.</p>
                <p>Consisting of a modified version of the classic 5e dungeons and dragons multiverse combined with an infinite amount of dimensions inside of the material plane to discover, each as unique as the dungeon master wishes, the universe of Uinderal was created with one simple goal in mind: allowing limitless creativity while providing a way to easily tie up loops. With the help of the Bottom, the Astral Passage and the multiple planes that the multiverse consists of, Uinderal provides a dungeon master with the ability to create adventures of any genre.</p>
                <p>Although there is a permanent ongoing story in the grander scale of the universe, feel free to change it to your own liking. All of the dimensions currently listed in this document are great places to start at but if you would rather create your own universes, it would be as easy as reading the difficulty charts and filtering what you’d like your world to be like. </p>
                <p>As of right now, this document is being developed with more dimensions and the lore that was created for the campaign of its creators is constantly updated in it. If you’d like to use Uinderal as the universe for one of your dungeons and dragons campaign, you may choose to ignore it or to carve alongside it. While it is recommended to keep it due to how it explains the way the world functions, you may do as you wish.</p>
                <h3 class="mt-5">There is much to learn about Uinderal</h3>
                <p>Where would you like to start?</p>
                <ul class="list-group text-center">
                    {CreateCategoryButtons()}
                </ul>
            </div>
        </div>
    );
}

  function CreateCategoryButtons(){
    var locationPlaceholder = "./";
    const location = useLocation();
    console.log(location.pathname)
    if (location.pathname.includes('/wiki/')){
        var locationPlaceholder = "../wiki/";
        console.log("DEEEEEEZ")
    }
    var list = [];
    WikiJson.Categories.forEach(category=>{
        list.push(
            <li class="list-group-item">
                <Link to={`${locationPlaceholder}${category.Route}`} class="wiki-link">{category.Name}</Link>
            </li>
        );
    })
    return list;
}

export function CreateWikiHeader(){
    return(
        <div>
            <div class="text-center bg-image" style={{backgroundImage: `url(${Banner})`, height:300,}}>
                <div class="mask" style={{backgroundColor: '#000000A0', height:300}}>
                    <div class="d-flex justify-content-center align-items-center h-100">
                        <div class="text-white">
                            <h1 class="mb-3">Universe of Uinderal's Wiki</h1>
                            <h4 class="mb-3">Quench your thirst for knowledge</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div class="d-flex flex-column p-5 justify-content-center align-items-center">
                <h3 class="mt-5">There is much else to learn about Uinderal</h3>
                <p>Where would you like to continue?</p>
                <ul class="list-group text-center">
                    {CreateCategoryButtons()}
                </ul>
            </div>
        </div>
    );
}

export default WikiHome;