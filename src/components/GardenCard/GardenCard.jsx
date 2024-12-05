

import "./GardenCard.css";

function GardenCard({ garden }) {
    return (
        <div className="garden-card">
            <img src={garden.gardenImg} alt="" />
            <h3>Jardín {garden.gardenNumber}</h3>
            <p><strong>Distrito:</strong> {garden.gardenDistrict}</p>
            <p><strong>Región:</strong> {garden.region}</p>
            <p><strong>Teléfono:</strong> {garden.gardenCelNum}</p>
            <a target="_blank" href={`${garden.gardenDirectionLink}`}><p><strong>Dirección:</strong> {garden.gardenDirection}</p></a>
            <button className="buttonCard">Comentar</button>
        </div>
    );
}
export default GardenCard;