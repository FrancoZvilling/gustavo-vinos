import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Check, Loader2 } from 'lucide-react';
import './NewsletterForm.css';

export default function NewsletterForm({ variant = 'default', title, subtitle }) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;
    setStatus('loading');

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setStatus('success');
    setEmail('');
    setTimeout(() => setStatus('idle'), 4000);
  };

  return (
    <div className={`newsletter newsletter--${variant}`}>
      {title && <h3 className="newsletter__title">{title}</h3>}
      {subtitle && <p className="newsletter__subtitle">{subtitle}</p>}

      <form className="newsletter__form" onSubmit={handleSubmit}>
        <div className="newsletter__input-wrapper">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="tucorreo@email.com"
            className="newsletter__input"
            required
            disabled={status === 'loading'}
          />
          <button
            type="submit"
            className="newsletter__submit"
            disabled={status === 'loading' || !email}
          >
            <AnimatePresence mode="wait">
              {status === 'loading' ? (
                <motion.span key="loading" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <Loader2 size={18} className="newsletter__spinner" />
                </motion.span>
              ) : status === 'success' ? (
                <motion.span key="success" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ opacity: 0 }}>
                  <Check size={18} />
                </motion.span>
              ) : (
                <motion.span key="send" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                  <Send size={18} />
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>

        <AnimatePresence>
          {status === 'success' && (
            <motion.p
              className="newsletter__message newsletter__message--success"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              ¡Bienvenido! Te mantendremos al tanto.
            </motion.p>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
