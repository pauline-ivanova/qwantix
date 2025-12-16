'use client';

import { useState } from 'react';

export default function ContactUs({ lang = 'en' }: { lang?: string }) {
  const isEs = lang === 'es';
  const isDe = lang === 'de';
  const isRu = lang === 'ru';
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phoneNumber: '',
    message: '',
  });

  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name) newErrors.name = isEs ? 'Por favor, introduce tu nombre.' : isDe ? 'Bitte geben Sie Ihren Namen ein.' : isRu ? 'Пожалуйста, укажите имя.' : 'Please enter your name.';
    if (!formData.email) {
      newErrors.email = isEs ? 'Por favor, introduce tu correo electrónico.' : isDe ? 'Bitte geben Sie Ihre E‑Mail‑Adresse ein.' : isRu ? 'Пожалуйста, укажите e‑mail.' : 'Please enter your email address.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = isEs ? 'Por favor, introduce un correo electrónico válido.' : isDe ? 'Bitte geben Sie eine gültige E‑Mail‑Adresse ein.' : isRu ? 'Пожалуйста, укажите корректный e‑mail.' : 'Please enter a valid email address.';
    }
    if (!formData.phoneNumber) newErrors.phoneNumber = isEs ? 'Por favor, introduce tu teléfono.' : isDe ? 'Bitte geben Sie Ihre Telefonnummer ein.' : isRu ? 'Пожалуйста, укажите телефон.' : 'Please enter your phone number.';
    if (!formData.message) newErrors.message = isEs ? 'Por favor, escribe tu mensaje.' : isDe ? 'Bitte schreiben Sie Ihre Nachricht.' : isRu ? 'Пожалуйста, напишите сообщение.' : 'Please enter your message.';
    if (!privacyConsent) {
      newErrors.privacy = isEs ? 'Debes aceptar la política de privacidad para continuar.' : isDe ? 'Sie müssen der Datenschutzerklärung zustimmen, um fortzufahren.' : isRu ? 'Необходимо принять политику конфиденциальности для продолжения.' : 'You must accept the privacy policy to continue.';
    }
    return newErrors;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      const newErrors = { ...errors };
      delete newErrors[name];
      setErrors(newErrors);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      console.log('Form submitted:', formData);
      // Here you would typically send the data to a server
      alert(isEs ? '¡Gracias por tu mensaje! Nos pondremos en contacto contigo pronto.' : isDe ? 'Vielen Dank für Ihre Nachricht! Wir melden uns in Kürze.' : isRu ? 'Спасибо! Мы свяжемся с вами в ближайшее время.' : 'Thank you for your message! We will get back to you shortly.');
      setFormData({ name: '', company: '', email: '', phoneNumber: '', message: '' });
      setPrivacyConsent(false);
      setErrors({});
    }
  };

  return (
    <div className="bg-gray-900 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl no-hyphen-break" suppressHydrationWarning>{isEs ? 'Hablemos de tu proyecto' : isDe ? 'Sprechen wir über Ihr Projekt' : isRu ? 'Обсудим ваш проект' : "Let's Talk About Your Project"}</h2>
          <p className="mt-6 text-lg leading-8 text-gray-300">
            {isEs ? 'Estamos aquí para ayudarte a alcanzar tus objetivos de marketing digital. Rellena el formulario y nos pondremos en contacto contigo para ver cómo podemos ayudarte.' : isDe ? 'Wir unterstützen Sie bei Ihren digitalen Marketingzielen. Füllen Sie das Formular aus – wir melden uns zeitnah, um Ihr Projekt zu besprechen.' : isRu ? 'Мы поможем достичь целей в digital‑маркетинге. Заполните форму — эксперты свяжутся с вами, чтобы обсудить проект и варианты стратегии.' : 'We’re here to help you achieve your digital marketing goals. Fill out the form below, and one of our experts will get back to you shortly to discuss your project and how we can help you succeed.'}
          </p>
        </div>
        <form onSubmit={handleSubmit} noValidate className="mx-auto mt-16 max-w-xl sm:mt-20">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <label htmlFor="name" className="block text-sm font-semibold leading-6 text-white">
                {isEs ? 'Nombre' : isDe ? 'Name' : isRu ? 'Имя' : 'Name'}
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="given-name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={isEs ? 'Tu nombre' : isDe ? 'Ihr Name' : isRu ? 'Ваше имя' : 'Your Name'}
                  className={`block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ${
                    errors.name ? 'ring-red-500' : 'ring-white/10'
                  } focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6`}
                />
                {errors.name && <p className="mt-2 text-sm text-red-500">{errors.name}</p>}
              </div>
            </div>
            <div>
              <label htmlFor="company" className="block text-sm font-semibold leading-6 text-white">
                {isEs ? 'Empresa' : isDe ? 'Unternehmen' : isRu ? 'Компания' : 'Company'}
              </label>
              <div className="mt-2.5">
                <input
                  type="text"
                  name="company"
                  id="company"
                  autoComplete="organization"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder={isEs ? 'Tu empresa (opcional)' : isDe ? 'Ihr Unternehmen (optional)' : isRu ? 'Ваша компания (необязательно)' : 'Your Company (Optional)'}
                  className="block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-semibold leading-6 text-white">
                {isEs ? 'Correo' : isDe ? 'E‑Mail' : isRu ? 'E‑mail' : 'Email'}
              </label>
              <div className="mt-2.5">
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder={isEs ? 'tu.email@ejemplo.com' : isDe ? 'ihre.email@beispiel.de' : isRu ? 'vashe.email@primer.ru' : 'your.email@example.com'}
                  className={`block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ${
                    errors.email ? 'ring-red-500' : 'ring-white/10'
                  } focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6`}
                />
                {errors.email && <p className="mt-2 text-sm text-red-500">{errors.email}</p>}
              </div>
            </div>
            <div>
              <label htmlFor="phone-number" className="block text-sm font-semibold leading-6 text-white">
                {isEs ? 'Teléfono' : isDe ? 'Telefonnummer' : isRu ? 'Телефон' : 'Phone number'}
              </label>
              <div className="mt-2.5">
                <input
                  type="tel"
                  name="phoneNumber"
                  id="phone-number"
                  autoComplete="tel"
                  required
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder={isEs ? '+34 600 123 456' : isDe ? '+49 1512 3456789' : isRu ? '+7 (999) 123‑45‑67' : '+1 (555) 123-4567'}
                  className={`block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ${
                    errors.phoneNumber ? 'ring-red-500' : 'ring-white/10'
                  } focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6`}
                />
                {errors.phoneNumber && <p className="mt-2 text-sm text-red-500">{errors.phoneNumber}</p>}
              </div>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="message" className="block text-sm font-semibold leading-6 text-white">
                {isEs ? 'Mensaje' : isDe ? 'Nachricht' : isRu ? 'Сообщение' : 'Message'}
              </label>
              <div className="mt-2.5">
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  placeholder={isEs ? '¿Cómo podemos ayudarte?' : isDe ? 'Wie können wir Ihnen helfen?' : isRu ? 'Как мы можем помочь?' : 'How can we help you?'}
                  className={`block w-full rounded-md border-0 bg-white/5 px-3.5 py-2 text-white shadow-sm ring-1 ring-inset ${
                    errors.message ? 'ring-red-500' : 'ring-white/10'
                  } focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6`}
                />
                {errors.message && <p className="mt-2 text-sm text-red-500">{errors.message}</p>}
              </div>
            </div>
          </div>
          <div className="mt-6">
            <div className="flex items-start gap-3">
              <input
                type="checkbox"
                id="privacy-consent"
                name="privacy-consent"
                required
                checked={privacyConsent}
                onChange={(e) => {
                  setPrivacyConsent(e.target.checked);
                  if (errors.privacy) {
                    const newErrors = { ...errors };
                    delete newErrors.privacy;
                    setErrors(newErrors);
                  }
                }}
                className={`mt-1 h-4 w-4 text-indigo-600 rounded focus:ring-indigo-500 ${
                  errors.privacy ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              <div className="flex-1">
                <label htmlFor="privacy-consent" className="text-sm text-gray-300">
                  {isEs ? 'He leído y acepto la' : isDe ? 'Ich habe die' : isRu ? 'Я прочитал(а) и принимаю' : 'I have read and accept the'}{' '}
                  <a 
                    href={`/${lang}/privacy`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-indigo-400 hover:text-indigo-300 underline font-medium"
                  >
                    {isEs ? 'Política de Privacidad' : isDe ? 'Datenschutzerklärung' : isRu ? 'Политику конфиденциальности' : 'Privacy Policy'}
                  </a>
                  {' '}{isEs ? 'y doy mi consentimiento para el tratamiento de mis datos personales según lo establecido en el Reglamento General de Protección de Datos (RGPD).' : isDe ? 'gelesen und akzeptiert und stimme der Verarbeitung meiner persönlichen Daten gemäß der Datenschutz-Grundverordnung (DSGVO) zu.' : isRu ? 'и даю согласие на обработку моих персональных данных в соответствии с Общим регламентом по защите данных (GDPR).' : 'and give my consent for the processing of my personal data as set out in the General Data Protection Regulation (GDPR).'}{' '}
                  <span className="text-red-400">*</span>
                </label>
                {errors.privacy && (
                  <p className="mt-1 text-sm text-red-400">{errors.privacy}</p>
                )}
              </div>
            </div>
          </div>
          <div className="mt-8 flex justify-end">
            <button
              type="submit"
              className="group relative inline-flex items-center justify-center overflow-hidden rounded-md bg-indigo-600 px-6 py-3 text-md font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <span className="transition-transform duration-300 group-hover:-translate-x-3">{isEs ? 'Enviar mensaje' : isDe ? 'Nachricht senden' : isRu ? 'Отправить сообщение' : 'Send Message'}</span>
              <span
                aria-hidden="true"
                className="absolute right-4 translate-x-10 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100"
              >
                &gt;
              </span>
            </button>
          </div>
          <p className="mt-4 text-center text-sm leading-6 text-gray-300">
            {isEs ? 'Respetamos tu privacidad y nunca compartiremos tus datos con terceros.' : isDe ? 'Wir respektieren Ihre Privatsphäre und geben Ihre Daten niemals an Dritte weiter.' : isRu ? 'Мы уважаем вашу конфиденциальность и не передаём данные третьим лицам.' : 'We respect your privacy and will never share your details with third parties.'}
          </p>
        </form>
      </div>
    </div>
  )
}
