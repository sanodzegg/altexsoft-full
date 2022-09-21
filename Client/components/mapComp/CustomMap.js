import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet'
import { useEffect, useRef, useState } from 'react';

import 'leaflet/dist/leaflet.css';

import axios from 'axios';
import { useDispatch } from 'react-redux';
import { apartmentActions } from '../../store/forms-slice';

const userIcon = L.icon({
    iconUrl: "/images/userLocation.png",
    iconSize: [45, 45],
});

const locationIcon = L.icon({
    iconUrl: "/images/locationIcon.png",
    iconSize: [45, 45],
});

const CustomMap = ( props ) => {

    const dispatch = useDispatch();
    const mapRef = useRef();

    const [center, setCenter] = useState({
        lat: 42.3154,
        lng: 43.3569
    });

    const [userLocation, setUserLocation] = useState({
        lat: 42.3154,
        lng: 43.3569
    });

    const [adding, setAdding] = useState(true);
    
    const getUserLocation = () => {
        navigator.geolocation.getCurrentPosition((pos) => {
            setCenter({
                lat: pos.coords.latitude,
                lng: pos.coords.longitude
            });
            setUserLocation({
                lat: pos.coords.latitude,
                lng: pos.coords.longitude,
            });
        });
    }

    useEffect(() => {
        if(props.displayMap) {
            getUserLocation();
        }
    }, [props.displayMap]);

    const LocationMarker = () => {
        const map = mapRef.current;
        const location = L.latLng(center);

        if (map) {
            map.flyTo(location, 15, {
                duration: 3
            }).setView(location, 15).once("focus", () => {
                map.scrollWheelZoom.enable();
            });
        }

        return (
            <Marker position={userLocation} icon={userIcon}>
                <Popup>
                    Your current location.
                </Popup>
            </Marker>
        )
    }

    const saveMarkers = (newCoords) => {
        getAddress(newCoords);
    }

    const Markers = ({ saveMarkers }) => {
        const map = useMapEvents({
          click: (e) => {
            const { lat, lng } = e.latlng;
            const locationMarker = L.marker([lat, lng], { icon: locationIcon });

            if(adding) {
                locationMarker.addTo(map);
                saveMarkers(e.latlng);
                setCenter({
                    lat: lat,
                    lng: lng
                });
                setAdding(false);
            }
            locationMarker.on("click", () => {
                locationMarker.remove();
                setAdding(true);
            });
          }
        });
        return null;
    }

    const getAddress = async (coords) => {
        const res = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${coords.lat}&lon=${coords.lng}`);
        const address = await res.data.display_name;
        dispatch(apartmentActions.setAddress(address));
    }

    if (props.displayMap) {
        return (
            <MapContainer ref={mapRef} style={{ width: "100%", height: "100vh", position: "relative", top: "-50%" }} center={center} zoom={12} scrollWheelZoom={false}>
                <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <LocationMarker />
                <Markers saveMarkers={saveMarkers} />
            </MapContainer>
        )
    }
}

export default CustomMap;