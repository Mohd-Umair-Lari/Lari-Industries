import React, { useState } from 'react';
import '../styles/Contact.css';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitStatus, setSubmitStatus] = useState('');
  const [focusedField, setFocusedField] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFocus = (e) => {
    setFocusedField(e.target.name);
  };

  const handleBlur = () => {
    setFocusedField('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitStatus('sent');
    setTimeout(() => {
      setFormData({ name: '', email: '', subject: '', message: '' });
      setSubmitStatus('');
    }, 2000);
  };

  return (
    <div className="contact">
      <section className="contact__section">
        <div className="contact__container">
          <h2 className="contact__title">CONTACT</h2>
          
          <div className="contact__content">
            <div className="contact__info">
              <div className="contact__info-item">
                <h4 className="contact__info-title">✉ THROUGH Email</h4>
                <p><a href="mailto:Larindustries@gmail.com" className="contact__link">Larindustries@gmail.com</a></p>
              </div>
              <div className="contact__info-item">
                <h4 className="contact__info-title">☎ THROUGH Contact No.</h4>
                <p><a href="tel:+919956675648" className="contact__link">+91 9956675648</a></p>
              </div>
              <div className="contact__info-item">
                <h4 className="contact__info-title">📍 ADDRESS</h4>
                <p>C-33 CHANDRA NAGAR, LAL BANGLAW,<br/>KANPUR-208007, INDIA</p>
              </div>
            </div>

            <form className="contact__form" onSubmit={handleSubmit}>
              <input 
                type="text" 
                name="name"
                placeholder="Your Name" 
                value={formData.name}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="contact__input"
                required 
              />
              <input 
                type="email" 
                name="email"
                placeholder="Your Email" 
                value={formData.email}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="contact__input"
                required 
              />
              <input 
                type="text" 
                name="subject"
                placeholder="Subject" 
                value={formData.subject}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="contact__input"
                required 
              />
              <textarea 
                name="message"
                placeholder="Your Message" 
                rows="5" 
                value={formData.message}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                className="contact__textarea"
                required
              ></textarea>
              <button 
                type="submit" 
                className={`contact__button ${submitStatus === 'sent' ? 'sent' : ''}`}
              >
                {submitStatus === 'sent' ? '✓ MESSAGE SENT' : 'SEND MESSAGE'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
