import { GoogleMap, InfoWindow, Marker } from "@react-google-maps/api";
import { useMemo, useState } from "react";
import Swal from 'sweetalert2/dist/sweetalert2.js'


const Map = (props) => {

    const [showMarkerTooltip, setShowMarkerTooltip] = useState(false);

    const center = useMemo(() => ({lat: props.data?.lat ? props.data?.lat : 4.6097100, lng: props.data?.lng ? props.data?.lng : -74.0817500}), []);
    const latLng = {};

    console.log('props.draggable', props.draggable);
    console.log('props.data', props.data);

    const onMarkerDragEnd = (event) => {
        console.log('drag end event', event.latLng.lat(), event.latLng.lng());
        latLng.lat = event.latLng.lat();
        latLng.lng = event.latLng.lng();
        console.log(latLng);
        localStorage.setItem('prod Location', JSON.stringify(latLng));
        Swal.fire({
            position: 'bottom-start',
            icon: 'success',
            title: 'Has selecionado la ubicación del producto!',
            showConfirmButton: false,
            timer: 1000
        })
    };

    
    const handleMarkerClick = () => {
        setShowMarkerTooltip(true);
    };


    return (
        <GoogleMap 
            zoom={10} 
            center={center} 
            mapContainerClassName='map-container'
        >
            <Marker position={center} draggable={props.draggable} onDragEnd={onMarkerDragEnd} onClick={handleMarkerClick} title={props.data.name} />

        </GoogleMap>
    )
};

export default Map;