import _ from "lodash";

const Weather = (props) => {
    return (
        <div className="py-4">
            <h3 className="py-2 text-center location">{props.city}, {props.country}</h3>
            <h5 className="py-3 text-center">
                <i className={`wi ${props.weatherIcon} display-1`}></i>
            </h5>
            <h3 className="py-2 text-center">{props.temperature}&deg;</h3>

            <h5 className="text-center">{props.description.split(' ').map((desc) => {
                return _.upperFirst(desc);
            }).join(' ')}</h5>
        </div>
    )
}

export default Weather