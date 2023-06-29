import { useLoadScript } from '@react-google-maps/api';
import Map from '../Map/Map';

// import usePlacesAutocomplete, { getGeocode, getLatLng} from 'use-places-autocomplete';

const MapContainer = (props) => {

    const { isLoaded } = useLoadScript({
        googleMapsApiKey: 'AIzaSyDeDhnAquLlEEN_fDXFSCAIjNev8Z9L1Gw'
    });

    if(!isLoaded) return <div>Loading...</div>
    return (
        <>
            {/* <PlacesAutocomplete setSelected={setSelected}/> */}
            <Map data={props.data} draggable={props.data?.draggable}/>
        </>
    )
};


// const PlacesAutocomplete = ({setSelected}) => {
//     return (
//         <></>
//     )
// };

export default MapContainer;