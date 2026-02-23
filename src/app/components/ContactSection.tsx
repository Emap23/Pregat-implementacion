// 📁 src/app/components/ContactSection.tsx
// Sin anime.js — 100% Framer Motion

import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'motion/react';
import { Send, CheckCircle, MapPin, Phone, Mail, AlertCircle } from 'lucide-react';

interface FormData   { name: string; email: string; organization: string; phone: string; message: string; }
interface FormErrors { name?: string; email?: string; message?: string; }

const contactInfo = [
  { icon: MapPin, label: 'Dirección', value: 'Anillo Periférico Ecológico, Puebla, México' },
  { icon: Phone,  label: 'Teléfono',  value: '+52 (222) 000-0000' },
  { icon: Mail,   label: 'Email',     value: 'contacto@pregat.mx' },
];

export function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView   = useInView(sectionRef, { once: true, amount: 0.15 });

  const [form, setForm]       = useState<FormData>({ name: '', email: '', organization: '', phone: '', message: '' });
  const [errors, setErrors]   = useState<FormErrors>({});
  const [focused, setFocused] = useState<string | null>(null);
  const [sending, setSending] = useState(false);
  const [sent, setSent]       = useState(false);
  const [shake, setShake]     = useState<string[]>([]);

  const validate = (): boolean => {
    const e: FormErrors = {};
    if (!form.name.trim())  e.name  = 'El nombre es obligatorio';
    if (!form.email.trim()) e.email = 'El email es obligatorio';
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Email inválido';
    if (!form.message.trim()) e.message = 'El mensaje es obligatorio';
    setErrors(e);
    if (Object.keys(e).length > 0) {
      const fields = Object.keys(e);
      setShake(fields);
      setTimeout(() => setShake([]), 600);
    }
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSending(true);
    await new Promise(res => setTimeout(res, 1800));
    setSending(false);
    setSent(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) setErrors(prev => ({ ...prev, [name]: undefined }));
  };

  return (
    <section ref={sectionRef} id="contacto" className="relative py-24 bg-[#0a1628] overflow-hidden">
      {/* Fondos decorativos */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-[600px] h-[600px] rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, rgb(220,38,38) 0%, transparent 70%)', transform: 'translate(-30%,-30%)' }} />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full opacity-5"
          style={{ background: 'radial-gradient(circle, rgb(37,99,235) 0%, transparent 70%)', transform: 'translate(30%,30%)' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-3">
            <motion.div initial={{ width: 0 }} animate={isInView ? { width: 40 } : {}} transition={{ duration: 0.7, delay: 0.3 }} className="h-px bg-red-500" />
            <span className="text-red-400 text-xs font-mono uppercase tracking-[0.25em]">Hablemos</span>
            <motion.div initial={{ width: 0 }} animate={isInView ? { width: 40 } : {}} transition={{ duration: 0.7, delay: 0.3 }} className="h-px bg-red-500" />
          </div>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">Contáctanos</h2>
          <p className="text-white/40 text-base max-w-lg mx-auto">
            ¿Listo para transformar la seguridad de tu institución? Hablemos sobre tu proyecto.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 items-start">

          {/* Info de contacto */}
          <div className="lg:col-span-2 space-y-6">
            {contactInfo.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -40 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.7, delay: 0.3 + i * 0.12 }}
                className="flex items-start gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-red-600/10 border border-red-600/20 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-4 h-4 text-red-500" />
                </div>
                <div>
                  <div className="text-white/30 text-xs uppercase tracking-widest mb-1">{item.label}</div>
                  <div className="text-white/80 text-sm">{item.value}</div>
                </div>
              </motion.div>
            ))}

            {/* Mapa */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.9, duration: 0.7 }}
              className="rounded-2xl overflow-hidden border border-white/10 mt-6"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d60341.91!2d-98.2436!3d19.0436!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85cfc7dc7b1e2adf%3A0x7b4c3cb44e40c1a6!2sPuebla%2C%20Pue.%2C%20Mexico!5e0!3m2!1ses!2smx!4v1700000000000!5m2!1ses!2smx"
                width="100%" height="200"
                style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.1)' }}
                allowFullScreen loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación PREGAT"
              />
            </motion.div>
          </div>

          {/* Formulario */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {!sent ? (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-5"
                  noValidate
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Nombre completo *" name="name" type="text" value={form.name} onChange={handleChange} error={errors.name} focused={focused} onFocus={() => setFocused('name')} onBlur={() => setFocused(null)} placeholder="Tu nombre" shake={shake.includes('name')} isInView={isInView} delay={0.5} />
                    <Field label="Email *" name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} focused={focused} onFocus={() => setFocused('email')} onBlur={() => setFocused(null)} placeholder="correo@institución.mx" shake={shake.includes('email')} isInView={isInView} delay={0.58} />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field label="Institución / Empresa" name="organization" type="text" value={form.organization} onChange={handleChange} focused={focused} onFocus={() => setFocused('organization')} onBlur={() => setFocused(null)} placeholder="Nombre de tu institución" shake={false} isInView={isInView} delay={0.66} />
                    <Field label="Teléfono" name="phone" type="tel" value={form.phone} onChange={handleChange} focused={focused} onFocus={() => setFocused('phone')} onBlur={() => setFocused(null)} placeholder="+52 000 000 0000" shake={false} isInView={isInView} delay={0.74} />
                  </div>

                  {/* Textarea */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.82 }}
                    animate-x={shake.includes('message') ? [0, -6, 6, -4, 4, 0] : 0}
                  >
                    <label className="block text-white/50 text-xs uppercase tracking-widest mb-2">Mensaje *</label>
                    <textarea
                      name="message" value={form.message} onChange={handleChange}
                      onFocus={() => setFocused('message')} onBlur={() => setFocused(null)}
                      rows={5} placeholder="Cuéntanos sobre tu proyecto o necesidad..."
                      className={`w-full bg-white/5 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 outline-none resize-none transition-all duration-300
                        ${errors.message ? 'border border-red-500/70' : focused === 'message' ? 'border border-red-500/50' : 'border border-white/10'}`}
                    />
                    {errors.message && (
                      <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-1.5 mt-1.5 text-red-400 text-xs">
                        <AlertCircle className="w-3 h-3" />{errors.message}
                      </motion.div>
                    )}
                  </motion.div>

                  {/* Botón */}
                  <motion.button
                    type="submit"
                    disabled={sending}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.9 }}
                    whileHover={{ scale: sending ? 1 : 1.02, boxShadow: sending ? 'none' : '0 0 30px rgba(220,38,38,0.4)' }}
                    whileTap={{ scale: 0.97 }}
                    className="w-full relative overflow-hidden bg-red-600 hover:bg-red-700 disabled:bg-red-900 text-white font-bold py-4 px-8 rounded-xl transition-colors duration-300 flex items-center justify-center gap-3 text-sm tracking-wide"
                  >
                    <span className="absolute inset-0 translate-x-[-100%] hover:translate-x-[100%] transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12 pointer-events-none" />
                    {sending ? (
                      <>
                        <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }} className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                        Enviando...
                      </>
                    ) : (
                      <><Send className="w-4 h-4" />Enviar Mensaje</>
                    )}
                  </motion.button>
                </motion.form>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center justify-center text-center py-20 px-8 rounded-2xl border border-white/10"
                >
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 220, delay: 0.2 }} className="mb-6">
                    <CheckCircle className="w-16 h-16 text-emerald-400" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-white mb-3">¡Mensaje enviado!</h3>
                  <p className="text-white/50 text-sm max-w-xs mb-8">Nuestro equipo se pondrá en contacto contigo en las próximas 24 horas hábiles.</p>
                  <button
                    onClick={() => { setSent(false); setForm({ name: '', email: '', organization: '', phone: '', message: '' }); }}
                    className="text-red-400 text-sm hover:text-red-300 transition-colors underline underline-offset-4"
                  >
                    Enviar otro mensaje
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Campo reutilizable ──────────────────────────────────────────────
interface FieldProps {
  label: string; name: string; type: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string; focused: string | null;
  onFocus: () => void; onBlur: () => void;
  placeholder?: string; shake: boolean;
  isInView: boolean; delay: number;
}

function Field({ label, name, type, value, onChange, error, focused, onFocus, onBlur, placeholder, shake, isInView, delay }: FieldProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView
        ? shake
          ? { opacity: 1, y: 0, x: [-6, 6, -4, 4, -2, 2, 0] }
          : { opacity: 1, y: 0, x: 0 }
        : {}}
      transition={{ duration: shake ? 0.5 : 0.5, delay: shake ? 0 : delay }}
    >
      <label className="block text-white/50 text-xs uppercase tracking-widest mb-2">{label}</label>
      <input
        type={type} name={name} value={value} onChange={onChange}
        onFocus={onFocus} onBlur={onBlur} placeholder={placeholder}
        className={`w-full bg-white/5 rounded-xl px-4 py-3 text-white text-sm placeholder-white/20 outline-none transition-all duration-300
          ${error ? 'border border-red-500/70' : focused === name ? 'border border-red-500/50' : 'border border-white/10'}`}
      />
      {error && (
        <motion.div initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-1.5 mt-1.5 text-red-400 text-xs">
          <AlertCircle className="w-3 h-3" />{error}
        </motion.div>
      )}
    </motion.div>
  );
}