
import { Link, Route } from "react-router-dom"
import "./DistricGardenSelect.css"


function DistrictGardenSelect () {
    return (
        <>
            <section className="DistrictGardenCardsContainer">
                <div className="DistrictCardGardenSelect">
                    <div className="imgCardGardenContainer">
                        <img src="./index-jardin-quilmes.jpg" alt="img jardin card quilmes" />
                    </div>
                    <div className="linkGardenCard">
                        <p className="LinkGarden"><Link to={'/gardens'}>Jardines de Región 4</Link></p>
                    </div>
                </div>
            </section>
        </>
    )
}


export default DistrictGardenSelect;