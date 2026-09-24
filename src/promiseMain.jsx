import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
// import RollingCalendar from './RollingCalendar';

import './promiseMain.css';

const KAKAO_APP_KEY = import.meta.env.VITE_KAKAO_MAP_KEY;

// 핀 찍을 장소들 (나중에 서버 데이터로 교체)
const places = [
    { id: 1, name: '강남역 고깃집', price: 32000, lat: 37.4979, lng: 127.0276 },
    { id: 2, name: '신논현 파스타', price: 18000, lat: 37.5046, lng: 127.0250 },
    { id: 3, name: '역삼 카페', price: 6500, lat: 37.5006, lng: 127.0364 },
];

// 카카오맵 SDK를 한 번만 불러오기
function loadKakaoMap() {
    if (window.kakao && window.kakao.maps) {
        return new Promise((resolve) => window.kakao.maps.load(resolve));
    }
    return new Promise((resolve, reject) => {
        if (!KAKAO_APP_KEY) {
            reject(new Error('VITE_KAKAO_MAP_KEY가 없습니다. 프로젝트 루트의 .env를 확인하세요.'));
            return;
        }
        const script = document.createElement('script');
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${KAKAO_APP_KEY}&autoload=false`;
        script.onload = () => window.kakao.maps.load(resolve);
        script.onerror = () => reject(new Error('카카오맵 SDK 로드 실패: 키 또는 등록된 도메인을 확인하세요.'));
        document.head.appendChild(script);
    });
}

function PromiseMain() {
    const mapRef = useRef(null);
    const mapInstance = useRef(null);
    const [selectedId, setSelectedId] = useState(null);

    useEffect(() => {
        loadKakaoMap().then(() => {
            const { kakao } = window;
            const map = new kakao.maps.Map(mapRef.current, {
                center: new kakao.maps.LatLng(places[0].lat, places[0].lng),
                level: 4,
            });
            mapInstance.current = map;

            const bounds = new kakao.maps.LatLngBounds();
            places.forEach((place) => {
                const position = new kakao.maps.LatLng(place.lat, place.lng);
                const marker = new kakao.maps.Marker({ map, position, title: place.name });
                kakao.maps.event.addListener(marker, 'click', () => setSelectedId(place.id));
                bounds.extend(position);
            });
            map.setBounds(bounds);
        }).catch((err) => console.error(err.message));
    }, []);

    const handleSelect = (place) => {
        setSelectedId(place.id);
        const { kakao } = window;
        if (mapInstance.current && kakao) {
            mapInstance.current.panTo(new kakao.maps.LatLng(place.lat, place.lng));
        }
    };

    return (
        <div>
            <Link to="" style={{color : "balck"}}>←약속</Link>
            <div className="map-layout">
                <div ref={mapRef} className="map-container"></div>
                <ul className="pin-list">
                    {places.map((place) => (
                        <li
                            key={place.id}
                            className={place.id === selectedId ? 'pin-item selected' : 'pin-item'}
                            onClick={() => handleSelect(place)}
                        >
                            <span className="pin-name">{place.name}</span>
                            <span className="pin-price">{place.price.toLocaleString()}원</span>
                        </li>
                    ))}
                </ul>
            </div>
            {/* <RollingCalendar></RollingCalendar> */}
        </div>
    );
}

export default PromiseMain;
