import { GoogleMap, Marker } from "@react-google-maps/api";
import { useMemo } from "react";


const Map = (props) => {

    const center = useMemo(() => ({lat: props.data?.lat ? props.data?.lat : 4.6097100, lng: props.data?.lng ? props.data?.lng : -74.0817500}), []);
    const latLng = {};

    console.log('props.draggable', props.draggable);

    const onMarkerDragEnd = (event) => {
        console.log('drag end event', event.latLng.lat(), event.latLng.lng());
        latLng.lat = event.latLng.lat();
        latLng.lng = event.latLng.lng();
        console.log(latLng);
        localStorage.setItem('prod Location', JSON.stringify(latLng));
        alert('¡Has selecionado la ubicación del producto!');
    };

    return (
        <GoogleMap 
            zoom={10} 
            center={center} 
            mapContainerClassName='map-container'
        >
            <Marker position={center} draggable={props.draggable} onDragEnd={onMarkerDragEnd}/>
        </GoogleMap>
    )
};

export default Map;