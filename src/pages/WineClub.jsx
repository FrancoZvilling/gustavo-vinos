import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wine, Star, Gift, Award, Check, Loader2, ChevronDown } from 'lucide-react';
import PageWrapper from '../components/layout/PageWrapper';
import ScrollReveal from '../components/ui/ScrollReveal';
import Button from '../components/ui/Button';
import { getWineClubPlans, getFounderBenefits, subscribeFounder } from '../api/services';
import './WineClub.css';

const iconMap = { wine: Wine, star: Star, gift: Gift, badge: Award };

export default function WineClub() {
  const [plans, setPlans] = useState([]);
  const [benefits, setBenefits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', plan: '' });
  const [formStatus, setFormStatus] = useState('idle');
  const [openFaq, setOpenFaq] = useState(null);

  useEffect(() => {
    Promise.all([getWineClubPlans(), getFounderBenefits()]).then(([p, b]) => {
      setPlans(p);
      setBenefits(b);
      setFormData(prev => ({ ...prev, plan: p[1]?.id || '' }));
      setLoading(false);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;
    setFormStatus('loading');
    await subscribeFounder(formData);
    setFormStatus('success');
  };

  const faqs = [
    { q: '¿Cuándo se lanza el Club?', a: 'Estamos trabajando para lanzar en los próximos meses. Los Miembros Fundadores serán los primeros en recibir acceso.' },
    { q: '¿Puedo cancelar en cualquier momento?', a: 'Sí, todas las membresías son mensuales y se pueden cancelar sin penalidad.' },
    { q: '¿A qué zonas realizan envíos?', a: 'Inicialmente cubriremos CABA y GBA. Próximamente expandiremos a todo el país.' },
    { q: '¿Qué incluye el kit de bienvenida?', a: 'Copas de cristal sin plomo, un decanter de diseño, un cortacápsulas premium y una guía de cata exclusiva de TERROIR.' },
  ];

  const formatPrice = (n) => n.toLocaleString('es-AR');

  return (
    <PageWrapper className="wine-club">
      {/* Hero */}
      <section className="wine-club__hero">
        <div className="wine-club__hero-bg" />
        <div className="container wine-club__hero-content">
          <ScrollReveal>
            <span className="text-label">Próximo Lanzamiento</span>
            <h1 className="heading-display wine-club__hero-title">
              Club de Vinos<br />TERROIR
            </h1>
            <p className="wine-club__hero-desc">
              Una experiencia curada para quienes entienden que el vino es más que una bebida. Cada mes, una selección excepcional en tu puerta.
            </p>
            <a href="#founder-form">
              <Button variant="primary" size="lg">Convertite en Miembro Fundador</Button>
            </a>
          </ScrollReveal>
        </div>
      </section>

      {/* Founder Benefits */}
      <section className="section wine-club__founder">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <span className="text-label">Exclusivo</span>
              <h2 className="heading-section">Beneficios de Miembro Fundador</h2>
              <hr className="divider divider--center" />
            </div>
          </ScrollReveal>

          <div className="wine-club__benefits-grid">
            {benefits.map((b, i) => {
              const IconComp = iconMap[b.icon] || Wine;
              return (
                <ScrollReveal key={i} delay={i * 0.1}>
                  <div className="wine-club__benefit-card glass">
                    <IconComp size={28} className="wine-club__benefit-icon" />
                    <h3>{b.title}</h3>
                    <p>{b.description}</p>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="section wine-club__plans">
        <div className="container">
          <ScrollReveal>
            <div className="section-header">
              <span className="text-label">Membresías</span>
              <h2 className="heading-section">Elegí tu Plan</h2>
              <hr className="divider divider--center" />
            </div>
          </ScrollReveal>

          <div className="wine-club__plans-grid">
            {plans.map((plan, i) => (
              <ScrollReveal key={plan.id} delay={i * 0.15}>
                <motion.div
                  className={`wine-club__plan-card ${plan.featured ? 'wine-club__plan-card--featured' : ''}`}
                  whileHover={{ y: -8 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                >
                  {plan.featured && <div className="wine-club__plan-badge">Más Popular</div>}
                  <h3 className="wine-club__plan-name">{plan.name}</h3>
                  <p className="wine-club__plan-tagline">{plan.tagline}</p>
                  <div className="wine-club__plan-price">
                    <span className="wine-club__plan-currency">$</span>
                    <span className="wine-club__plan-amount">{formatPrice(plan.price)}</span>
                    <span className="wine-club__plan-period">{plan.period}</span>
                  </div>
                  <ul className="wine-club__plan-benefits">
                    {plan.benefits.map((b, j) => (
                      <li key={j}><Check size={16} /><span>{b}</span></li>
                    ))}
                  </ul>
                  <Button
                    variant={plan.featured ? 'primary' : 'ghost'}
                    fullWidth
                    onClick={() => {
                      setFormData(prev => ({ ...prev, plan: plan.id }));
                      document.getElementById('founder-form')?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    Elegir {plan.name}
                  </Button>
                </motion.div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Founder Form */}
      <section className="section wine-club__form-section" id="founder-form">
        <div className="container container--narrow">
          <ScrollReveal>
            <div className="section-header">
              <span className="text-label">Sumate Ahora</span>
              <h2 className="heading-section">Sé Miembro Fundador</h2>
              <p className="text-body" style={{ maxWidth: 480, margin: '0 auto', marginTop: 'var(--space-sm)' }}>
                Dejá tus datos y te avisamos cuando lancemos. Obtendrás beneficios exclusivos de por vida.
              </p>
              <hr className="divider divider--center" />
            </div>
          </ScrollReveal>

          <AnimatePresence mode="wait">
            {formStatus === 'success' ? (
              <motion.div
                key="success"
                className="wine-club__form-success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="wine-club__success-icon">
                  <Award size={48} />
                </div>
                <h3>¡Bienvenido, Miembro Fundador!</h3>
                <p>Te contactaremos cuando el club esté listo. Mientras tanto, disfrutá nuestro contenido exclusivo.</p>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                className="wine-club__form glass"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="wine-club__form-group">
                  <label htmlFor="founder-name">Nombre completo</label>
                  <input
                    id="founder-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                    placeholder="Tu nombre"
                    required
                    disabled={formStatus === 'loading'}
                  />
                </div>
                <div className="wine-club__form-group">
                  <label htmlFor="founder-email">Email</label>
                  <input
                    id="founder-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                    placeholder="tucorreo@email.com"
                    required
                    disabled={formStatus === 'loading'}
                  />
                </div>
                <div className="wine-club__form-group">
                  <label htmlFor="founder-plan">Membresía preferida</label>
                  <select
                    id="founder-plan"
                    value={formData.plan}
                    onChange={(e) => setFormData(p => ({ ...p, plan: e.target.value }))}
                    disabled={formStatus === 'loading'}
                  >
                    {plans.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                  </select>
                </div>
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  fullWidth
                  disabled={formStatus === 'loading'}
                  icon={formStatus === 'loading' ? <Loader2 size={18} className="newsletter__spinner" /> : undefined}
                >
                  {formStatus === 'loading' ? 'Registrando...' : 'Registrarme como Fundador'}
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* FAQ */}
      <section className="section wine-club__faq">
        <div className="container container--narrow">
          <ScrollReveal>
            <div className="section-header">
              <span className="text-label">FAQ</span>
              <h2 className="heading-section">Preguntas Frecuentes</h2>
              <hr className="divider divider--center" />
            </div>
          </ScrollReveal>

          <div className="wine-club__faq-list">
            {faqs.map((faq, i) => (
              <ScrollReveal key={i} delay={i * 0.08}>
                <div className={`wine-club__faq-item ${openFaq === i ? 'wine-club__faq-item--open' : ''}`}>
                  <button
                    className="wine-club__faq-question"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  >
                    <span>{faq.q}</span>
                    <ChevronDown size={18} className="wine-club__faq-chevron" />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        className="wine-club__faq-answer"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <p>{faq.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
