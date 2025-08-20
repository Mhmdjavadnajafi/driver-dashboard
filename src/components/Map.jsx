import { useEffect, useRef, useState } from "react";
import "@neshan-maps-platform/react-openlayers/dist/style.css";
import "@neshan-maps-platform/mapbox-gl/dist/NeshanMapboxGl.css";
import person from "../assets/images/person.jpeg";
import home from "../assets/images/home.jpeg";
import {
    MapContainer,
    TileLayer,
    Marker,
    Popup,
    useMap,
    useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { FaLocationCrosshairs } from "react-icons/fa6";
const userIcon = new L.Icon({
    iconUrl: person,
    iconSize: [30, 30],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38],
});

const ShopIcon = new L.Icon({
    iconUrl: home,
    iconSize: [40, 40],
    iconAnchor: [19, 38],
    popupAnchor: [0, -38],
});

const MyLocation = () => {
    const [position, setPosition] = useState(null);
    const map = useMap();
    useEffect(() => {
        map.locate().on("locationfound", (e) => {
            setPosition(e.latlng);
            map.setView(e.latlng, map.getZoom(30));
        });
    }, [map]);
    const showMyLoaction = (e) => {
        // e.preventdefault();
        // e.stopPropagation();
        map.locate().on("locationfound", (e) => {
            setPosition(e.latlng);
            map.setView(e.latlng, map.getZoom(50));
        });
    };
    return (
        <>
            {!!position && (
                <Marker
                    icon={userIcon}
                    className="w-40 h-40 bg-red-400"
                    position={position}
                >
                    {/* <Popup>موقعیت شما</Popup>  */}
                </Marker>
            )}

            <span
                className="z-[100000000000] absolute bottom-5 right-4 bg-white w-8 rounded-full h-8 cursor-pointer"
                onClick={(e) => showMyLoaction(e)}
            >
                <FaLocationCrosshairs className="w-fit mx-auto h-fit mt-1.5 text-xl" />
            </span>
        </>
    );
};

function LocationMarker({ data, setData }) {
    // console.log(data);

    useMapEvents({
        click(e) {
            // console.log(e.latlng);
            // setData(e.latlng);
            // e.originalEvent.stopPropagation();
            // !!data ? setData(null) : setData(e.latlng);
            if (!e.originalEvent.target.closest("span")) {
                // بررسی اینکه کلیک روی آیکون نبوده است
                !!data ? setData(null) : setData(e.latlng);
            }
        },
    });

    return (
        !!data?.lat && (
            <Marker
                position={[data?.lat, data?.lng]}
                icon={ShopIcon}
                className="w-40 h-40 bg-red-400"
            >
                <Popup>موقعیت فروشگاه</Popup>
            </Marker>
        )
    );
}

const MapEventsHandler = ({ setData }) => {
    const map = useMapEvents({
        moveend: () => {
            const center = map.getCenter();
            setData({ lat: center.lat, lng: center.lng });
        },
    });

    return null;
};
const MAP = ({ data, setData }) => {
    const mapRef = useRef();

    useEffect(() => {
        // console.log(mapRef);
        if (!mapRef.current) return;

        const map = mapRef.current;

        const handleMoveEnd = () => {
            const center = map.getCenter();
            setData({
                lat: center.lat,
                lng: center.lng,
            });
        };


        map.on("moveend", handleMoveEnd);

        return () => {
            map.off("moveend", handleMoveEnd);
        };
    }, []);
    return (
        <div className="w-full h-full z-0 rounded-xl overflow-hidden relative">
            <MapContainer
                center={[35.69972169335737, 51.33797230866538]}
                zoom={14}
                style={{ height: "100%", width: "100%", zIndex: 10 }}
                whenCreated={(mapInstance) => {
                    console.log(mapInstance);

                    mapRef.current = mapInstance;
                }}
            >
                <TileLayer
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    attribution='&copy; <a href="http://www.openstreetmap.org/copyright" className="!text-black" >OpenStreetMap</a>'
                />
                <MapEventsHandler setData={setData} />
                <MyLocation />
                {/* <LocationMarker data={data} setData={setData} /> */}
            </MapContainer>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full z-[9999] pointer-events-none">
                <img src={home} alt="marker" className="w-8 h-fit object-fit
        " />
            </div>
        </div>
    );
};

export default MAP;