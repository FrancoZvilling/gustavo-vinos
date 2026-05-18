import { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { Search, SlidersHorizontal, X, Map, List } from 'lucide-react';
import PageWrapper from '../components/layout/PageWrapper';
import ScrollReveal from '../components/ui/ScrollReveal';
import Card, { CardImage, CardContent } from '../components/ui/Card';
import StarRating from '../components/ui/StarRating';
import { SkeletonCard } from '../components/ui/SkeletonLoader';
import { useMediaQuery } from '../hooks/useMediaQuery';
import { getRestaurants, getRestaurantZones } from '../api/services';
import 'leaflet/dist/leaflet.css';
import './Restaurants.css';

// Fix Leaflet default marker icons
import L from 'leaflet';
const customIcon = L.divIcon({
  className: 'custom-marker',
  html: `<div style="background:linear-gradient(135deg,#C8A96E,#B08D57);width:28px;height:28px;border-radius:50%;border:3px solid #fff;box-shadow:0 2px 8px rgba(0,0,0,0.3);"></div>`,
  iconSize: [28, 28],
  iconAnchor: [14, 14],
});

export default function Restaurants() {
  const isMobile = useMediaQuery('(max-width: 1023px)');
  const [restaurants, setRestaurants] = useState([]);
  const [zones, setZones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedZone, setSelectedZone] = useState('todas');
  const [mobileView, setMobileView] = useState('list');
  const [showFilters, setShowFilters] = useState(false);
  const mapRef = useRef(null);

  // Invalidate map size when switching to map view on mobile
  const handleViewChange = useCallback((view) => {
    setMobileView(view);
    if (view === 'map') {
      setTimeout(() => {
        mapRef.current?.invalidateSize();
      }, 100);
    }
  }, []);

  useEffect(() => {
    getRestaurantZones().then(setZones);
  }, []);

  useEffect(() => {
    setLoading(true);
    getRestaurants({ search, zone: selectedZone }).then(data => {
      setRestaurants(data);
      setLoading(false);
    });
  }, [search, selectedZone]);

  const mapCenter = useMemo(() => {
    if (restaurants.length === 0) return [-34.6037, -58.3816];
    const avgLat = restaurants.reduce((s, r) => s + r.coordinates[0], 0) / restaurants.length;
    const avgLng = restaurants.reduce((s, r) => s + r.coordinates[1], 0) / restaurants.length;
    return [avgLat, avgLng];
  }, [restaurants]);

  return (
    <PageWrapper className="restaurants-page">
      <div className="restaurants-page__header container">
        <ScrollReveal>
          <span className="text-label">Guía Gastronómica</span>
          <h1 className="heading-display restaurants-page__title">Restaurantes</h1>
          <p className="text-body--large">Los mejores restaurantes de Buenos Aires, curados por nuestros expertos.</p>
        </ScrollReveal>

        <div className="restaurants-page__controls">
          <div className="restaurants-page__search">
            <Search size={18} className="restaurants-page__search-icon" />
            <input
              type="text"
              placeholder="Buscar por nombre o cocina..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="restaurants-page__search-input"
            />
            {search && (
              <button onClick={() => setSearch('')} className="restaurants-page__search-clear">
                <X size={16} />
              </button>
            )}
          </div>

          <button
            className="restaurants-page__filter-toggle"
            onClick={() => setShowFilters(!showFilters)}
          >
            <SlidersHorizontal size={18} />
            Filtros
          </button>

          {isMobile && (
            <div className="restaurants-page__view-toggle">
              <button
                className={`restaurants-page__view-btn ${mobileView === 'list' ? 'active' : ''}`}
                onClick={() => handleViewChange('list')}
              >
                <List size={18} />
              </button>
              <button
                className={`restaurants-page__view-btn ${mobileView === 'map' ? 'active' : ''}`}
                onClick={() => handleViewChange('map')}
              >
                <Map size={18} />
              </button>
            </div>
          )}
        </div>

        {showFilters && (
          <div className="restaurants-page__filters glass">
            <div className="restaurants-page__filter-group">
              <label>Zona</label>
              <select value={selectedZone} onChange={(e) => setSelectedZone(e.target.value)}>
                <option value="todas">Todas las zonas</option>
                {zones.map(z => <option key={z} value={z}>{z}</option>)}
              </select>
            </div>
          </div>
        )}
      </div>

      <div className={`restaurants-page__body ${isMobile ? `restaurants-page__body--${mobileView}` : ''}`}>
        {/* List */}
        <div className={`restaurants-page__list ${isMobile && mobileView === 'map' ? 'restaurants-page__list--hidden' : ''}`}>
          {loading ? (
            <div className="restaurants-page__grid">
              {Array.from({ length: 4 }, (_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : restaurants.length === 0 ? (
            <div className="restaurants-page__empty">
              <p>No se encontraron restaurantes con esos filtros.</p>
            </div>
          ) : (
            <div className="restaurants-page__grid">
              {restaurants.map((rest, i) => (
                <ScrollReveal key={rest.id} delay={i * 0.08}>
                  <Link to={`/restaurantes/${rest.slug}`} className="restaurants-page__card-link">
                    <Card>
                      <CardImage src={rest.images[0]} alt={rest.name} aspect="3/2" />
                      <CardContent>
                        <div className="restaurants-page__card-top">
                          <h3 className="heading-card">{rest.name}</h3>
                          <span className="restaurants-page__price">{rest.priceRange}</span>
                        </div>
                        <StarRating rating={rest.rating} size={14} showLabel />
                        <div className="restaurants-page__card-info">
                          <span>{rest.cuisine}</span>
                          <span>·</span>
                          <span>{rest.zone}</span>
                        </div>
                        <p className="text-body restaurants-page__card-excerpt">
                          {rest.excerpt}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          )}
        </div>

        {/* Map */}
        <div className={`restaurants-page__map ${isMobile && mobileView === 'list' ? 'restaurants-page__map--hidden' : ''}`}>
          <MapContainer
            center={mapCenter}
            zoom={13}
            scrollWheelZoom={true}
            style={{ height: '100%', width: '100%' }}
            ref={mapRef}
          >
            <TileLayer
              attribution='&copy; <a href="https://carto.com/">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
            {restaurants.map(rest => (
              <Marker key={rest.id} position={rest.coordinates} icon={customIcon}>
                <Popup>
                  <div className="map-popup">
                    <strong>{rest.name}</strong>
                    <p>{rest.cuisine} · {rest.priceRange}</p>
                    <Link to={`/restaurantes/${rest.slug}`}>Ver detalle →</Link>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </PageWrapper>
  );
}
