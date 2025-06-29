import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import './App.css'
import vegasLogo from './assets/vegas.jpg'

const ADVENTURES = [
  {
    id: 'desert-safari',
    title: 'Desert Safari',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    description: 'Experience the thrill of dune bashing and sunset views in the vast Nevada desert.',
    category: 'Sightseeing',
    details: 'Join our expert guides for a day of adventure in the Nevada desert. Includes dune bashing, camel rides, and a sunset BBQ.'
  },
  {
    id: 'grand-canyon-hike',
    title: 'Grand Canyon Hike',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    description: 'Embark on a breathtaking hike through one of the world\'s natural wonders.',
    category: 'Hiking',
    details: 'A full-day guided hike with stunning views, expert commentary, and a picnic lunch at the rim.'
  },
  {
    id: 'lake-mead-kayaking',
    title: 'Lake Mead Kayaking',
    image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80',
    description: 'Paddle through crystal waters and explore hidden coves on Lake Mead.',
    category: 'Water',
    details: 'Half-day kayaking adventure with all equipment provided. Suitable for beginners and families.'
  },
  {
    id: 'red-rock-climbing',
    title: 'Red Rock Climbing',
    image: 'https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=400&q=80',
    description: 'Scale the stunning cliffs of Red Rock Canyon with expert guides and epic views.',
    category: 'Climbing',
    details: 'Guided climbing for all skill levels. Includes gear, safety briefing, and snacks.'
  },
  {
    id: 'hoover-dam-biking',
    title: 'Hoover Dam Biking',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    description: 'Cycle scenic trails and marvel at the engineering wonder of the Hoover Dam.',
    category: 'Biking',
    details: 'Leisurely bike tour with stops for photos and a guided tour of the dam.'
  },
];

function Home() {
  const navigate = useNavigate();
  return (
    <div>
      <section className="hero">
        <h1>Unleash Your Spirit of Adventure</h1>
        <p>Discover unforgettable journeys and thrilling experiences with Vegas Adventures. Your next adventure starts here!</p>
        <button className="cta-btn" onClick={() => navigate('/adventures')}>Explore Adventures</button>
      </section>
      <section className="adventure-highlights">
        <h3>Featured Adventures</h3>
        <div className="adventure-cards">
          <div className="adventure-card">
            <img src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80" alt="Desert Safari" />
            <h4>Desert Safari</h4>
            <p>Experience the thrill of dune bashing and sunset views in the vast Nevada desert.</p>
          </div>
          <div className="adventure-card">
            <img src="https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80" alt="Grand Canyon Hike" />
            <h4>Grand Canyon Hike</h4>
            <p>Embark on a breathtaking hike through one of the world's natural wonders.</p>
          </div>
          <div className="adventure-card">
            <img src="https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80" alt="Lake Mead Kayaking" />
            <h4>Lake Mead Kayaking</h4>
            <p>Paddle through crystal waters and explore hidden coves on Lake Mead.</p>
          </div>
          <div className="adventure-card">
            <img src="https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&w=400&q=80" alt="Red Rock Climbing" />
            <h4>Red Rock Climbing</h4>
            <p>Scale the stunning cliffs of Red Rock Canyon with expert guides and epic views.</p>
          </div>
          <div className="adventure-card">
            <img src="https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80" alt="Hoover Dam Biking" />
            <h4>Hoover Dam Biking</h4>
            <p>Cycle scenic trails and marvel at the engineering wonder of the Hoover Dam.</p>
          </div>
        </div>
      </section>
      <section className="testimonials">
        <h3>What Our Adventurers Say</h3>
        <div className="testimonial-cards">
          <div className="testimonial-card">
            <p>"The Grand Canyon hike was breathtaking! The guides were knowledgeable and made the trip unforgettable."</p>
            <span>- Sarah M.</span>
          </div>
          <div className="testimonial-card">
            <p>"Kayaking on Lake Mead was the highlight of our vacation. Everything was perfectly organized!"</p>
            <span>- James L.</span>
          </div>
          <div className="testimonial-card">
            <p>"We loved the desert safari. The sunset BBQ was delicious and the views were stunning!"</p>
            <span>- Priya S.</span>
          </div>
        </div>
      </section>
    </div>
  )
}

function Adventures({ user, setUser }) {
  const [filter, setFilter] = useState('All');
  const categories = ['All', ...Array.from(new Set(ADVENTURES.map(a => a.category)))];
  const filteredAdventures = filter === 'All' ? ADVENTURES : ADVENTURES.filter(a => a.category === filter);

  // Handle favoriting
  const isFav = (id) => user && user.favorites.includes(id);
  const toggleFav = (id) => {
    if (!user) return;
    const newFavs = isFav(id)
      ? user.favorites.filter(f => f !== id)
      : [id, ...user.favorites];
    const updatedUser = { ...user, favorites: newFavs };
    setUser(updatedUser);
    // Also update in users list in localStorage
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const idx = users.findIndex(u => u.email === user.email);
    if (idx !== -1) {
      users[idx] = updatedUser;
      localStorage.setItem('users', JSON.stringify(users));
    }
  };

  return (
    <div className="adventures-page">
      <h2>Our Adventures</h2>
      <div className="adventure-filters">
        {categories.map(cat => (
          <button
            key={cat}
            className={`filter-btn${filter === cat ? ' active' : ''}`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
      <div className="adventure-cards">
        {filteredAdventures.map((adv) => (
          <div className="adventure-card fade-in-up" key={adv.id}>
            <img src={adv.image} alt={adv.title} />
            <h4>{adv.title}</h4>
            <span className="adventure-category">{adv.category}</span>
            <p>{adv.description}</p>
            {user && (
              <button
                className={`fav-btn${isFav(adv.id) ? ' fav' : ''}`}
                title={isFav(adv.id) ? 'Remove from favorites' : 'Add to favorites'}
                onClick={() => toggleFav(adv.id)}
              >
                {isFav(adv.id) ? '❤️' : '🤍'}
              </button>
            )}
            <button className="details-btn" onClick={() => window.location.href = `/adventures/${adv.id}`}>View Details</button>
          </div>
        ))}
      </div>
    </div>
  );
}

function AdventureDetail() {
  const { id } = useParams();
  const adventure = ADVENTURES.find(a => a.id === id);
  const navigate = useNavigate();
  const [bookings, setBookings] = usePersistentState('bookings', []);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [mpesaStep, setMpesaStep] = useState(false);
  const [mpesaPhone, setMpesaPhone] = useState('');
  const [mpesaSuccess, setMpesaSuccess] = useState(false);
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    setBookings([{ adventureId: id, ...form, date: new Date().toISOString() }, ...bookings]);
    setSubmitted(true);
    setForm({ name: '', email: '', message: '' });
    setMpesaStep(true);
  };
  const handleMpesaPay = e => {
    e.preventDefault();
    if (!mpesaPhone.match(/^\d{10,13}$/)) {
      alert('Please enter a valid phone number.');
      return;
    }
    setTimeout(() => setMpesaSuccess(true), 1200);
  };
  if (!adventure) return <div style={{padding: '2rem'}}><h2>Adventure Not Found</h2></div>;
  return (
    <div className="adventure-detail">
      <button className="back-btn" onClick={() => navigate(-1)}>&larr; Back</button>
      <img src={adventure.image} alt={adventure.title} className="detail-img" />
      <h2>{adventure.title}</h2>
      <span className="adventure-category">{adventure.category}</span>
      <p className="detail-desc">{adventure.details}</p>
      <div className="booking-form-section">
        <h3>Book or Inquire</h3>
        {!submitted ? (
          <form className="booking-form" onSubmit={handleSubmit} autoComplete="off">
            <div className={`floating-label-group${form.name ? ' filled' : ''}`}>
              <input type="text" name="name" value={form.name} onChange={handleChange} required />
              <label htmlFor="name">Your Name</label>
            </div>
            <div className={`floating-label-group${form.email ? ' filled' : ''}`}>
              <input type="email" name="email" value={form.email} onChange={handleChange} required />
              <label htmlFor="email">Your Email</label>
            </div>
            <div className={`floating-label-group${form.message ? ' filled' : ''}`}>
              <textarea name="message" value={form.message} onChange={handleChange} required />
              <label htmlFor="message">Your Message</label>
            </div>
            <button type="submit" className="cta-btn">Send Inquiry</button>
          </form>
        ) : mpesaStep && !mpesaSuccess ? (
          <form className="booking-form mpesa-section" onSubmit={handleMpesaPay} autoComplete="off">
            <h4>Complete Payment with M-Pesa</h4>
            <div className={`floating-label-group${mpesaPhone ? ' filled' : ''}`}>
              <input type="tel" name="mpesaPhone" value={mpesaPhone} onChange={e => setMpesaPhone(e.target.value)} required placeholder="e.g. 07XXXXXXXX" />
              <label htmlFor="mpesaPhone">M-Pesa Phone Number</label>
            </div>
            <button type="submit" className="cta-btn">Pay with M-Pesa</button>
          </form>
        ) : mpesaSuccess ? (
          <div className="form-success">Payment successful! Thank you for booking with us. We will contact you soon.</div>
        ) : (
          <div className="form-success">Thank you! We received your inquiry and will contact you soon.</div>
        )}
      </div>
    </div>
  );
}

function About() {
  return (
    <div className="about-page">
      <section className="about-hero fade-in-up">
        <h2>About Vegas Adventures</h2>
        <p className="about-mission">Empowering explorers to experience life-changing adventures in the world's most breathtaking places.</p>
      </section>
      <section className="about-story fade-in-up">
        <h3>Our Story</h3>
        <p>Founded by passionate adventurers, Vegas Adventures was born from a love of exploration and a desire to share the world's wonders with others. From humble beginnings organizing local hikes, we've grown into a leading adventure travel company, curating unforgettable journeys for thrill-seekers and nature lovers alike.</p>
      </section>
      <section className="about-values fade-in-up">
        <h3>Our Values</h3>
        <ul>
          <li><strong>Sustainability:</strong> We're committed to responsible travel that protects the planet and supports local communities.</li>
          <li><strong>Expertise:</strong> Our guides are local specialists, ensuring authentic, safe and enriching experiences.</li>
          <li><strong>Safety:</strong> Your well-being is our top priority, with rigorous safety standards on every trip.</li>
          <li><strong>Quality:</strong> We handle every detail, so you can focus on adventure and discovery.</li>
        </ul>
      </section>
      <section className="about-team fade-in-up">
        <h3>Meet Our Team</h3>
        <div className="team-cards">
          <div className="team-card fade-in-up">
            <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Alex - Founder" />
            <h4>Alex otieno</h4>
            <span>Founder & Chief Explorer</span>
            <div className="team-socials">
              <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" title="LinkedIn">🔗</a>
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" title="Twitter">🐦</a>
              <a href="mailto:alex@vegasadventures.com" title="Email">✉️</a>
            </div>
          </div>
          <div className="team-card fade-in-up">
            <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Jamie - Adventure Guide" />
            <h4>Jamie wendy</h4>
            <span>Lead Adventure Guide</span>
            <div className="team-socials">
              <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" title="LinkedIn">🔗</a>
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" title="Twitter">🐦</a>
              <a href="mailto:jamie@vegasadventures.com" title="Email">✉️</a>
            </div>
          </div>
          <div className="team-card fade-in-up">
            <img src="https://randomuser.me/api/portraits/men/65.jpg" alt="Sam - Operations" />
            <h4>Sospeter </h4>
            <span>Operations Manager</span>
            <div className="team-socials">
              <a href="https://linkedin.com/" target="_blank" rel="noopener noreferrer" title="LinkedIn">🔗</a>
              <a href="https://twitter.com/" target="_blank" rel="noopener noreferrer" title="Twitter">🐦</a>
              <a href="mailto:sam@vegasadventures.com" title="Email">✉️</a>
            </div>
          </div>
        </div>
      </section>
      <section className="about-cta fade-in-up">
        <h3>Ready to start your next adventure?</h3>
        <Link to="/adventures" className="cta-btn">Explore Our Trips</Link>
      </section>
    </div>
  );
}

function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    setSubmitted(true);
    setForm({ name: '', email: '', message: '' });
  };
  return (
    <div className="contact-page">
      <section className="contact-info fade-in-up">
        <h2>Contact Us</h2>
        <p>We'd love to hear from you! Reach out with questions, feedback, or to start planning your next adventure.</p>
        <ul>
          <li><strong>Email:</strong> info@vegasadventures.com</li>
          <li><strong>Phone:</strong> +1 (555) 123-4567</li>
          <li><strong>Office:</strong> 123 Explorer Ave, Las Vegas, NV</li>
        </ul>
      </section>
      <section className="contact-form-section fade-in-up">
        <h3>Send Us a Message</h3>
        {submitted ? (
          <div className="form-success">Thank you for reaching out! We'll get back to you soon.</div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit} autoComplete="off">
            <div className={`floating-label-group${form.name ? ' filled' : ''}`}>
              <input type="text" name="name" value={form.name} onChange={handleChange} required />
              <label htmlFor="name">Your Name</label>
            </div>
            <div className={`floating-label-group${form.email ? ' filled' : ''}`}>
              <input type="email" name="email" value={form.email} onChange={handleChange} required />
              <label htmlFor="email">Your Email</label>
            </div>
            <div className={`floating-label-group${form.message ? ' filled' : ''}`}>
              <textarea name="message" value={form.message} onChange={handleChange} required />
              <label htmlFor="message">Your Message</label>
            </div>
            <button type="submit" className="cta-btn">Send Message</button>
          </form>
        )}
      </section>
    </div>
  );
}

function Gallery() {
  const [images, setImages] = useState([
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80',
  ]);
  const handleAddImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setImages([ev.target.result, ...images]);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="gallery-page">
      <h2>Gallery</h2>
      <label className="gallery-upload-btn fade-in-up">
        + Add Photo
        <input type="file" accept="image/*" style={{ display: 'none' }} onChange={handleAddImage} />
      </label>
      <div className="gallery-grid">
        {images.map((img, idx) => (
          <img src={img} alt={`Gallery ${idx + 1}`} key={idx} className="gallery-img fade-in-up" />
        ))}
      </div>
    </div>
  );
}

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const faqs = [
    {
      q: 'How do I book an adventure?',
      a: 'You can book any adventure directly on our website by visiting the Adventures page, selecting your trip, and filling out the inquiry/booking form.'
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept M-Pesa, credit/debit cards, and bank transfers. M-Pesa payment is available as part of the booking process.'
    },
    {
      q: 'Is it safe to travel with Vegas Adventures?',
      a: 'Absolutely! Your safety is our top priority. All trips are led by experienced, certified guides and follow strict safety protocols.'
    },
    {
      q: 'Can I cancel or reschedule my booking?',
      a: 'Yes, you can cancel or reschedule up to 7 days before your trip. Please see our cancellation policy for details.'
    },
    {
      q: 'What should I pack for my adventure?',
      a: 'Packing lists are provided for each trip. Generally, bring comfortable clothing, sturdy shoes, and any personal items you need.'
    },
    {
      q: 'How do I contact support?',
      a: 'You can reach us via the Contact page, email, or phone. We\'re here to help!'
    }
  ];
  return (
    <div className="faq-page">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqs.map((item, idx) => (
          <div className="faq-item" key={idx}>
            <button className="faq-question" onClick={() => setOpenIndex(openIndex === idx ? null : idx)}>
              {item.q}
              <span className="faq-toggle">{openIndex === idx ? '−' : '+'}</span>
            </button>
            <div className={`faq-answer${openIndex === idx ? ' open' : ''}`}>{item.a}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function usePersistentState(key, initial) {
  const [value, setValue] = useState(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initial;
  });
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
  return [value, setValue];
}

function Admin() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [tab, setTab] = useState('adventures');
  const [bookings, setBookings] = usePersistentState('bookings', []);
  const [username, setUsername] = useState('');
  const [session, setSession] = useState(() => localStorage.getItem('adminSession'));

  // Persistent state for admin data
  const [adventures, setAdventures] = usePersistentState('adventures', ADVENTURES);
  const [gallery, setGallery] = usePersistentState('gallery', [
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=400&q=80',
  ]);
  const [testimonials, setTestimonials] = usePersistentState('testimonials', [
    { text: 'The Grand Canyon hike was breathtaking! The guides were knowledgeable and made the trip unforgettable.', author: 'Sarah M.' },
    { text: 'Kayaking on Lake Mead was the highlight of our vacation. Everything was perfectly organized!', author: 'James L.' },
    { text: 'We loved the desert safari. The sunset BBQ was delicious and the views were stunning!', author: 'Priya S.' },
  ]);

  // Adventure form state
  const [form, setForm] = useState({ id: '', title: '', image: '', description: '', category: '', details: '' });
  const [editIdx, setEditIdx] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    if (username === 'admin' && password === 'admin123') {
      setLoggedIn(true);
      setSession('admin-session-token');
      localStorage.setItem('adminSession', 'admin-session-token');
    } else {
      alert('Incorrect username or password');
    }
  };
  useEffect(() => {
    if (session === 'admin-session-token') setLoggedIn(true);
  }, [session]);
  const handleLogout = () => {
    setLoggedIn(false);
    setSession(null);
    localStorage.removeItem('adminSession');
  };
  const handleDeleteGallery = (idx) => {
    if (window.confirm('Delete this image?')) setGallery(gallery.filter((_, i) => i !== idx));
  };
  const handleDeleteTestimonial = (idx) => {
    if (window.confirm('Delete this testimonial?')) setTestimonials(testimonials.filter((_, i) => i !== idx));
  };
  const handleDeleteAdventure = (idx) => {
    if (window.confirm('Delete this adventure?')) setAdventures(adventures.filter((_, i) => i !== idx));
  };
  const handleEditAdventure = (idx) => {
    setEditIdx(idx);
    setForm(adventures[idx]);
  };
  const handleAdventureFormChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const handleAdventureFormSubmit = (e) => {
    e.preventDefault();
    if (!form.title || !form.image || !form.description || !form.category || !form.details) {
      alert('Please fill in all fields.');
      return;
    }
    if (editIdx !== null) {
      // Edit
      const updated = [...adventures];
      updated[editIdx] = { ...form, id: form.id || form.title.toLowerCase().replace(/\s+/g, '-') };
      setAdventures(updated);
      setEditIdx(null);
    } else {
      // Add
      setAdventures([
        { ...form, id: form.title.toLowerCase().replace(/\s+/g, '-') },
        ...adventures
      ]);
    }
    setForm({ id: '', title: '', image: '', description: '', category: '', details: '' });
  };
  const handleCancelEdit = () => {
    setEditIdx(null);
    setForm({ id: '', title: '', image: '', description: '', category: '', details: '' });
  };
  const handleImageUpload = (e, cb) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => cb(ev.target.result);
      reader.readAsDataURL(file);
    }
  };

  if (!loggedIn) {
    return (
      <div className="admin-login">
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin} className="admin-login-form">
          <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" />
          <button type="submit" className="cta-btn">Login</button>
        </form>
      </div>
    );
  }
  return (
    <div className="admin-dashboard">
      <h2>Admin Dashboard</h2>
      <button className="admin-logout-btn" onClick={handleLogout}>Logout</button>
      <div className="admin-tabs">
        <button className={tab === 'adventures' ? 'active' : ''} onClick={() => setTab('adventures')}>Adventures</button>
        <button className={tab === 'gallery' ? 'active' : ''} onClick={() => setTab('gallery')}>Gallery</button>
        <button className={tab === 'testimonials' ? 'active' : ''} onClick={() => setTab('testimonials')}>Testimonials</button>
        <button className={tab === 'bookings' ? 'active' : ''} onClick={() => setTab('bookings')}>Bookings</button>
      </div>
      <div className="admin-content">
        {tab === 'adventures' && (
          <div>
            <h3>Adventures</h3>
            <form className="admin-adv-form" onSubmit={handleAdventureFormSubmit} autoComplete="off">
              <input name="title" value={form.title} onChange={handleAdventureFormChange} placeholder="Title" />
              <input name="image" value={form.image} onChange={handleAdventureFormChange} placeholder="Image URL or upload below" />
              <input type="file" accept="image/*" onChange={e => handleImageUpload(e, img => setForm(f => ({ ...f, image: img })))} />
              <input name="category" value={form.category} onChange={handleAdventureFormChange} placeholder="Category" />
              <input name="description" value={form.description} onChange={handleAdventureFormChange} placeholder="Short Description" />
              <textarea name="details" value={form.details} onChange={handleAdventureFormChange} placeholder="Full Details" />
              <div style={{ display: 'flex', gap: '1rem', marginTop: '0.5rem' }}>
                <button type="submit" className="cta-btn">{editIdx !== null ? 'Update' : 'Add'} Adventure</button>
                {editIdx !== null && <button type="button" className="admin-delete-btn" onClick={handleCancelEdit}>Cancel</button>}
              </div>
            </form>
            <ul className="admin-adv-list">
              {adventures.map((a, idx) => (
                <li key={a.id} className="admin-adv-item">
                  <img src={a.image} alt={a.title} className="admin-adv-thumb" />
                  <div className="admin-adv-info">
                    <strong>{a.title}</strong> <span>({a.category})</span>
                    <div className="admin-adv-actions">
                      <button onClick={() => handleEditAdventure(idx)} className="cta-btn">Edit</button>
                      <button onClick={() => handleDeleteAdventure(idx)} className="admin-delete-btn">Delete</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
        {tab === 'gallery' && (
          <div>
            <h3>Gallery Images</h3>
            <input type="file" accept="image/*" onChange={e => handleImageUpload(e, img => setGallery([img, ...gallery]))} />
            <div className="admin-gallery-grid">
              {gallery.map((img, idx) => (
                <div key={idx} className="admin-gallery-img-wrap">
                  <img src={img} alt={`Gallery ${idx + 1}`} className="admin-gallery-img" />
                  <button onClick={() => handleDeleteGallery(idx)} className="admin-delete-btn">Delete</button>
                </div>
              ))}
            </div>
          </div>
        )}
        {tab === 'testimonials' && (
          <div>
            <h3>Testimonials</h3>
            <ul className="admin-testimonials-list">
              {testimonials.map((t, idx) => (
                <li key={idx} className="admin-testimonial-item">
                  <span>"{t.text}" — <strong>{t.author}</strong></span>
                  <button onClick={() => handleDeleteTestimonial(idx)} className="admin-delete-btn">Delete</button>
                </li>
              ))}
            </ul>
          </div>
        )}
        {tab === 'bookings' && (
          <div>
            <h3>Bookings/Inquiries</h3>
            <ul className="admin-bookings-list">
              {bookings.length === 0 && <li>No bookings yet.</li>}
              {bookings.map((b, idx) => (
                <li key={idx} className="admin-booking-item">
                  <div><strong>Adventure:</strong> {b.adventureId}</div>
                  <div><strong>Name:</strong> {b.name}</div>
                  <div><strong>Email:</strong> {b.email}</div>
                  <div><strong>Message:</strong> {b.message}</div>
                  <div><strong>Date:</strong> {new Date(b.date).toLocaleString()}</div>
                  <button onClick={() => setBookings(bookings.filter((_, i) => i !== idx))} className="admin-delete-btn">Delete</button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

// --- User Auth & Profile ---
function useUser() {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('userSession');
    return stored ? JSON.parse(stored) : null;
  });
  useEffect(() => {
    if (user) localStorage.setItem('userSession', JSON.stringify(user));
    else localStorage.removeItem('userSession');
  }, [user]);
  return [user, setUser];
}

function Auth() {
  const [, setUser] = useUser();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [users, setUsers] = usePersistentState('users', []);
  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = e => {
    e.preventDefault();
    if (!form.email || !form.password || (!isLogin && !form.name)) {
      setError('Please fill in all fields.');
      return;
    }
    if (isLogin) {
      const found = users.find(u => u.email === form.email && u.password === form.password);
      if (found) setUser(found);
      else setError('Invalid credentials.');
    } else {
      if (users.find(u => u.email === form.email)) {
        setError('Email already registered.');
        return;
      }
      const newUser = { ...form, favorites: [], bookings: [] };
      setUsers([newUser, ...users]);
      setUser(newUser);
    }
  };
  return (
    <div className="user-auth">
      <h2>{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={handleSubmit} className="user-auth-form">
        {!isLogin && <input name="name" value={form.name} onChange={handleChange} placeholder="Name" />}
        <input name="email" value={form.email} onChange={handleChange} placeholder="Email" />
        <input name="password" type="password" value={form.password} onChange={handleChange} placeholder="Password" />
        {error && <div className="form-error">{error}</div>}
        <button type="submit" className="cta-btn">{isLogin ? 'Login' : 'Register'}</button>
      </form>
      <button className="user-auth-toggle" onClick={() => { setIsLogin(!isLogin); setError(''); }}>
        {isLogin ? 'Need an account? Register' : 'Already have an account? Login'}
      </button>
    </div>
  );
}

function Profile() {
  const [currentUser, setUser] = useUser();
  const [bookings] = usePersistentState('bookings', []);
  const handleLogout = () => { setUser(null); };
  if (!currentUser) return null;
  const userBookings = bookings.filter(b => b.email === currentUser.email);
  return (
    <div className="profile-page">
      <h2>My Profile</h2>
      <div className="profile-info">
        <div><strong>Name:</strong> {currentUser.name}</div>
        <div><strong>Email:</strong> {currentUser.email}</div>
      </div>
      <h3>Favorites</h3>
      <ul className="profile-fav-list">
        {currentUser.favorites.length === 0 && <li>No favorites yet.</li>}
        {currentUser.favorites.map((id, idx) => (
          <li key={idx}>{id}</li>
        ))}
      </ul>
      <h3>Booking History</h3>
      <ul className="profile-bookings-list">
        {userBookings.length === 0 && <li>No bookings yet.</li>}
        {userBookings.map((b, idx) => (
          <li key={idx}>
            <div><strong>Adventure:</strong> {b.adventureId}</div>
            <div><strong>Date:</strong> {new Date(b.date).toLocaleString()}</div>
          </li>
        ))}
      </ul>
      <button className="cta-btn" onClick={handleLogout}>Logout</button>
    </div>
  );
}

// --- WhatsApp Button ---
function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/254715641618?text=Hello%20Vegas%20Adventures!%20I%20have%20a%20question."
      className="whatsapp-btn"
      target="_blank"
      rel="noopener noreferrer"
      title="Chat with us on WhatsApp"
    >
      <span role="img" aria-label="WhatsApp">💬</span> Chat
    </a>
  );
}

function App() {
  const [mode, setMode] = useState('dark');
  const [burgerOpen, setBurgerOpen] = useState(false);
  const [currentUser] = useUser();
  useEffect(() => {
    if (mode === 'light') {
      document.body.classList.add('light-mode');
    } else {
      document.body.classList.remove('light-mode');
    }
  }, [mode]);
  return (
    <Router>
      <nav className="nav-bar">
        <Link to="/" className="nav-logo-link">
          <img src={vegasLogo} alt="Vegas Adventures Logo" className="nav-logo" />
        </Link>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/adventures">Adventures</Link></li>
          <li><Link to="/gallery">Gallery</Link></li>
          <li><Link to="/faq">FAQ</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
          <li className="nav-hide-mobile"><Link to="/profile">{currentUser ? 'Profile' : 'Login'}</Link></li>
          <li className="nav-hide-mobile"><Link to="/admin" className="admin-link">Admin</Link></li>
        </ul>
        <button className="mode-toggle-btn" onClick={() => setMode(mode === 'dark' ? 'light' : 'dark')}>
          {mode === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
        </button>
        <button className="burger-btn" onClick={() => setBurgerOpen(!burgerOpen)} aria-label="Menu">
          <span className="burger-icon">☰</span>
        </button>
        {burgerOpen && (
          <div className="burger-menu">
            <Link to="/profile" onClick={() => setBurgerOpen(false)}>{currentUser ? 'Profile' : 'Login'}</Link>
            <Link to="/admin" className="admin-link" onClick={() => setBurgerOpen(false)}>Admin</Link>
          </div>
        )}
      </nav>
      <WhatsAppButton />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adventures" element={<Adventures />} />
        <Route path="/adventures/:id" element={<AdventureDetail />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={currentUser ? <Profile /> : <Auth />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </Router>
  )
}

export default App