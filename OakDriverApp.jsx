import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

/* FIX ICONOS LEAFLET */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export default function OakDriverApp() {
  const [position, setPosition] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showNegotiation, setShowNegotiation] = useState(false);

  const request = {
    price: "12.000",
    distance: "5.4 km",
    time: "18 min",
  };

  /* GEOLOCALIZACIÓN */
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition([pos.coords.latitude, pos.coords.longitude]);
      },
      () => {
        alert("Permiso de ubicación denegado");
      }
    );
  }, []);

  if (!position) {
    return <div className="loading">Obteniendo ubicación…</div>;
  }

return (
    <div className="app">
      {/* HEADER */}
      <div className="top-bar">
        <span>Oak Driver</span>
        <button
          className="menu-btn"
          onClick={() => setShowSettings(!showSettings)}
        >
          ☰
        </button>
      </div>

      {/* MAPA */}
      <div className="map">
        <MapContainer
          center={position}
          zoom={15}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            attribution="© OpenStreetMap"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={position} />
        </MapContainer>
      </div>

      {/* PANEL AJUSTES */}
      {showSettings && (
        <div className="settings-panel">
          <h3>Ajustes del Conductor</h3>
          <ul>
            <li>🟢 Disponibilidad</li>
            <li>📍 Compartir ubicación</li>
            <li>🔔 Notificaciones</li>
            <li>🛡️ Seguridad y emergencia</li>
            <li>💰 Ganancias</li>
            <li>🎁 Bonificaciones</li>
            <li>🚪 Cerrar sesión</li>
          </ul>
        </div>
      )}

      {/* BARRA DE ACCIONES */}
      <div className="action-bar">
        <div className="info">
          <span className="price">💰 ${request.price}</span>
          <span className="meta">
            📏 {request.distance} · ⏱ {request.time}
          </span>
        </div>

        <div className="actions">
          <button className="btn-red">Rechazar</button>
          <button
            className="btn-blue"
            onClick={() => setShowNegotiation(!showNegotiation)}
          >
            Proponer
          </button>
          <button className="btn-green">Aceptar</button>
        </div>
        {showNegotiation && (
          <div className="negotiation">
            <input
              type="number"
              className="input"
              placeholder="Tu oferta"
            />
            <button className="btn-green">Enviar</button>
          </div>
        )}
      </div>
    </div>
  );
}

      
