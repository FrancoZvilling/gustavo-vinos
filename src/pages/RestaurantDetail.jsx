import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker } from 'react-leaflet';
import { ArrowLeft, MapPin, Clock, Phone, MessageCircle, DollarSign } from 'lucide-react';
import L from 'leaflet';
import PageWrapper from '../components/layout/PageWrapper';
import ScrollReveal from '../components/ui/ScrollReveal';
import StarRating from '../components/ui/StarRating';
import ImageSlider from '../components/ui/ImageSlider';
import Button from '../components/ui/Button';
import { getRestaurantBySlug } from '../api/services';
import 'leaflet/dist/leaflet.css';
import './RestaurantDetail.css';

const markerIcon = L.divIcon({
  className: 'custom-marker',
  html: `<div style="background:linear-gradient(135deg,#C8A96E,#B08D57);width:32px;height:32px;border-radius:50%;border:3px solid #fff;box-shadow:0 2px 12px rgba(0,0,0,0.4);"></div>`,
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

export default function RestaurantDetail() {
  const { slug } = useParams();
  const [restaurant, setRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    window.scrollTo(0, 0);
    getRestaurantBySlug(slug).then(data => {
      setRestaurant(data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [slug]);

  if (loading) {
    return (
      <PageWrapper>
        <div className="container" style={{ paddingTop: 'var(--space-3xl)' }}>
          <div className="skeleton skeleton--hero" />
        </div>
      </PageWrapper>
    );
  }

  if (!restaurant) {
    return (
      <PageWrapper>
        <div className="container" style={{ paddingTop: 'var(--space-4xl)', textAlign: 'center' }}>
          <h2>Restaurante no encontrado</h2>
          <Link to="/restaurantes">Volver a la guía</Link>
        </div>
      </PageWrapper>
    );
  }

  const whatsappUrl = `https://wa.me/${restaurant.whatsapp}?text=${encodeURIComponent(
    `¡Hola! Me gustaría hacer una reserva en ${restaurant.name}. Vi su perfil en TERROIR.`
  )}`;

  return (
    <PageWrapper className="restaurant-detail">
      <div className="container">
        <Link to="/restaurantes" className="restaurant-detail__back">
          <ArrowLeft size={18} />
          <span>Volver a la guía</span>
        </Link>

        {/* Gallery */}
        <ScrollReveal>
          <div className="restaurant-detail__gallery">
            <ImageSlider images={restaurant.images} aspectRatio="21/9" />
          </div>
        </ScrollReveal>

        {/* Header */}
        <ScrollReveal>
          <div className="restaurant-detail__header">
            <div className="restaurant-detail__header-left">
              <h1 className="heading-display restaurant-detail__name">{restaurant.name}</h1>
              <div className="restaurant-detail__tags">
                <span>{restaurant.cuisine}</span>
                <span>·</span>
                <span>{restaurant.zone}</span>
                <span>·</span>
                <span>{restaurant.priceRange}</span>
              </div>
              <StarRating rating={restaurant.rating} showLabel />
            </div>
            <div className="restaurant-detail__header-right">
              <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                <Button variant="primary" size="lg" icon={<MessageCircle size={18} />}>
                  Reservar
                </Button>
              </a>
            </div>
          </div>
        </ScrollReveal>

        {/* Body */}
        <div className="restaurant-detail__body">
          <div className="restaurant-detail__main">
            <ScrollReveal>
              <div className="restaurant-detail__review">
                <h2 className="heading-card">Reseña del Experto</h2>
                <hr className="divider" />
                <p className="text-body--large">{restaurant.review}</p>
              </div>
            </ScrollReveal>

            {/* Detailed Rating */}
            <ScrollReveal>
              <div className="restaurant-detail__ratings glass">
                <h3>Valoración Detallada</h3>
                <div className="restaurant-detail__rating-items">
                  {Object.entries(restaurant.ratingDetail).map(([key, val]) => (
                    <div key={key} className="restaurant-detail__rating-item">
                      <span className="restaurant-detail__rating-label">
                        {key === 'food' ? 'Comida' : key === 'ambiance' ? 'Ambiente' : 'Servicio'}
                      </span>
                      <div className="restaurant-detail__rating-bar">
                        <div
                          className="restaurant-detail__rating-fill"
                          style={{ width: `${(val / 5) * 100}%` }}
                        />
                      </div>
                      <span className="restaurant-detail__rating-value">{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Sidebar */}
          <aside className="restaurant-detail__sidebar">
            <ScrollReveal>
              <div className="restaurant-detail__info-card glass">
                <h3>Información</h3>
                <div className="restaurant-detail__info-list">
                  <div className="restaurant-detail__info-row">
                    <MapPin size={16} />
                    <span>{restaurant.address}</span>
                  </div>
                  <div className="restaurant-detail__info-row">
                    <Clock size={16} />
                    <span>{restaurant.hours}</span>
                  </div>
                  <div className="restaurant-detail__info-row">
                    <Phone size={16} />
                    <span>{restaurant.phone}</span>
                  </div>
                  <div className="restaurant-detail__info-row">
                    <DollarSign size={16} />
                    <span>{restaurant.priceRange} — {restaurant.cuisine}</span>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* Map */}
            <ScrollReveal delay={0.15}>
              <div className="restaurant-detail__map-wrapper">
                <MapContainer
                  center={restaurant.coordinates}
                  zoom={15}
                  scrollWheelZoom={false}
                  style={{ height: '100%', width: '100%' }}
                >
                  <TileLayer
                    attribution='&copy; CARTO'
                    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                  />
                  <Marker position={restaurant.coordinates} icon={markerIcon} />
                </MapContainer>
              </div>
            </ScrollReveal>
          </aside>
        </div>
      </div>
    </PageWrapper>
  );
}
