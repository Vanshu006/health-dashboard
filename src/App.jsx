import { useState, useRef, useEffect } from 'react'
import { MdHealthAndSafety, MdPerson, MdEmail, MdLock, MdLogout, MdUploadFile, MdHistory, MdPreview, MdFavorite, MdSearch, MdLocalHospital, MdHealing, MdPeople, MdLocalPharmacy, MdAccessTime } from 'react-icons/md';
import './App.css'

function DepartmentCard({ icon, title, desc }) {
  return (
    <div className="department-card" style={{ textAlign: 'center', padding: 24, background: 'none', boxShadow: 'none', border: 'none' }}>
      <span className="icon" style={{ fontSize: '2.5em', marginBottom: 8 }}>{icon}</span>
      <h4 style={{ margin: '12px 0 8px 0' }}>{title}</h4>
      <p style={{ color: '#666', fontSize: '0.95em' }}>{desc}</p>
    </div>
  );
}

function Footer() {
  return (
    <footer style={{ width: '100%', background: '#222', color: '#fff', textAlign: 'center', padding: '24px 0', marginTop: 32, borderRadius: '16px 16px 0 0' }}>
      <div style={{ fontWeight: 600, fontSize: '1.1em' }}>MediCare &copy; {new Date().getFullYear()}</div>
    </footer>
  );
}

function Header({ darkMode, toggleDarkMode }) {
  return (
    <nav style={{ width: '100%', background: '#222', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', height: 64, borderRadius: '0 0 16px 16px', boxShadow: '0 2px 8px #0001' }}>
      <div style={{ display: 'flex', alignItems: 'center', fontWeight: 700, fontSize: '1.3em', letterSpacing: 1 }}>
        <span className="icon" style={{ fontSize: '1.3em', marginRight: 8 }}><MdHealthAndSafety /></span> MediCare
      </div>
      <div style={{ display: 'flex', gap: 32, fontWeight: 500, fontSize: '1.1em', alignItems: 'center' }}>
        <a href="#home" style={{ color: '#fff', textDecoration: 'none' }}>Home</a>
        <a href="#departments" style={{ color: '#fff', textDecoration: 'none' }}>Departments</a>
        <a href="#about" style={{ color: '#fff', textDecoration: 'none' }}>About</a>
        <button onClick={toggleDarkMode} aria-label="Toggle dark mode" style={{ background: 'none', border: 'none', color: '#fff', fontSize: 22, marginLeft: 16, cursor: 'pointer' }}>
          {darkMode ? '🌙' : '☀️'}
        </button>
      </div>
    </nav>
  );
}

function DoctorCard({ name, title, img }) {
  return (
    <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 8px #0001', border: '1px solid #DDDDDD', padding: 16, textAlign: 'center' }}>
      <img src={img} alt={name} style={{ width: 80, height: 80, borderRadius: '50%', objectFit: 'cover', marginBottom: 12 }} />
      <h5 style={{ margin: '8px 0 4px 0' }}>{name}</h5>
      <span style={{ color: '#2ECC71', fontWeight: 500 }}>{title}</span>
    </div>
  );
}

function AnimatedSVGBackground() {
  return (
    <div className="animated-bg" aria-hidden="true">
      <svg width="100%" height="100%" viewBox="0 0 1440 900" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ position: 'absolute', top: 0, left: 0, width: '100vw', height: '100vh' }}>
        <defs>
          <linearGradient id="bg1" x1="0" y1="0" x2="1440" y2="900" gradientUnits="userSpaceOnUse">
            <stop stopColor="#1ABC9C" stopOpacity="0.18" />
            <stop offset="1" stopColor="#4DD0E1" stopOpacity="0.13" />
          </linearGradient>
        </defs>
        <ellipse cx="400" cy="200" rx="320" ry="140" fill="url(#bg1)" />
        <ellipse cx="1200" cy="700" rx="260" ry="110" fill="url(#bg1)" />
        <ellipse cx="900" cy="300" rx="180" ry="80" fill="url(#bg1)" />
        <ellipse cx="200" cy="800" rx="180" ry="80" fill="url(#bg1)" />
      </svg>
    </div>
  );
}

function MedicalHeroSVG() {
  // Example SVG from unDraw (doctor/medical scene, license-free)
  return (
    <svg width="340" height="220" viewBox="0 0 600 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="medical-hero-svg" style={{ display: 'block', margin: '0 auto', maxWidth: 340, maxHeight: 220 }}>
      <ellipse cx="300" cy="370" rx="220" ry="30" fill="#E0F7FA" />
      <rect x="180" y="120" width="240" height="180" rx="24" fill="#fff" stroke="#1ABC9C" strokeWidth="4" />
      <circle cx="300" cy="180" r="32" fill="#1ABC9C" />
      <rect x="260" y="220" width="80" height="40" rx="12" fill="#4DD0E1" />
      <rect x="220" y="270" width="160" height="18" rx="9" fill="#E0F7FA" />
      <rect x="240" y="295" width="120" height="12" rx="6" fill="#B2DFDB" />
      <rect x="285" y="160" width="30" height="10" rx="5" fill="#fff" />
      <rect x="295" y="170" width="10" height="20" rx="5" fill="#fff" />
      <ellipse cx="300" cy="180" rx="8" ry="8" fill="#fff" />
      <rect x="320" y="180" width="10" height="10" rx="5" fill="#fff" />
      <rect x="270" y="180" width="10" height="10" rx="5" fill="#fff" />
      <rect x="300" y="200" width="10" height="10" rx="5" fill="#fff" />
    </svg>
  );
}

function StatCounter({ icon, label, value, duration = 1200 }) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    let start = 0;
    const end = value;
    if (start === end) return;
    let incrementTime = Math.abs(Math.floor(duration / end));
    let timer = setInterval(() => {
      start += 1;
      setCount(start);
      if (start === end) clearInterval(timer);
    }, incrementTime);
    return () => clearInterval(timer);
  }, [value, duration]);
  return (
    <div style={{ textAlign: 'center', flex: 1, minWidth: 120 }}>
      <div style={{ fontSize: 36, color: '#fff', marginBottom: 4 }}>{icon}</div>
      <div style={{ fontSize: 32, fontWeight: 700, color: 'var(--text-color)' }}>{count}</div>
      <div style={{ fontSize: 16, color: 'var(--text-color)', opacity: 0.8 }}>{label}</div>
    </div>
  );
}

function UserAvatar({ name, size = 64 }) {
  // Get initials from name
  const initials = name ? name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() : '?';
  // Pick a color based on name hash
  const colors = ['#1ABC9C', '#4DD0E1', '#00B37A', '#FFB347', '#FF6961'];
  let colorIdx = 0;
  if (name) {
    colorIdx = name.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0) % colors.length;
  }
  return (
    <div style={{
      width: size,
      height: size,
      borderRadius: '50%',
      background: colors[colorIdx],
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontWeight: 700,
      fontSize: size * 0.42,
      color: '#fff',
      boxShadow: '0 2px 8px rgba(0,0,0,0.10)',
      marginRight: 18,
      border: '3px solid #fff',
      outline: '2px solid var(--primary-color)',
      outlineOffset: '-2px',
      userSelect: 'none',
    }} aria-label={`User avatar for ${name}`}>{initials}</div>
  );
}

// Add a RippleButton wrapper for ripple effect
function RippleButton({ children, className = '', style, ...props }) {
  const btnRef = useRef();
  function createRipple(e) {
    const button = btnRef.current;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;
    circle.className = 'ripple';
    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${e.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${e.clientY - button.getBoundingClientRect().top - radius}px`;
    button.appendChild(circle);
    circle.addEventListener('animationend', () => circle.remove());
  }
  return (
    <button ref={btnRef} className={className} style={style} {...props} onClick={e => { createRipple(e); props.onClick && props.onClick(e); }}>
      {children}
    </button>
  );
}

function LandingPage({ onLogin, darkMode, toggleDarkMode }) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--background)', position: 'relative' }}>
      <AnimatedSVGBackground />
      <div className="app-bg-interactive" />
      <div className="site-watermark-bg" />
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      {/* Split Hero Section */}
      <section className="split-hero" style={{ background: 'var(--white)', borderRadius: 16, margin: '32px auto 0 auto', boxShadow: '0 2px 12px rgba(0,0,0,0.07)', maxWidth: '1200px', alignItems: 'center', minHeight: 340 }}>
        <div className="split-hero-content" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: 260 }}>
          <h1 style={{ fontSize: '2.5em', margin: '8px 0 0 0', letterSpacing: 1, fontWeight: 700, color: 'var(--primary-color)' }}>MediCare</h1>
          <p style={{ fontSize: '1.2em', margin: '16px 0 24px 0', color: 'var(--text-color)', opacity: 0.95 }}>We provide best healthcare</p>
          <RippleButton className="modern-btn" onClick={onLogin}>Login</RippleButton>
        </div>
        <div className="split-hero-image">
          <img src={`${import.meta.env.BASE_URL}hero-bg.jpg`} alt="Hero BG" style={{ background: '#e0e0e0' }} />
          <MedicalHeroSVG />
        </div>
      </section>
      <div className="stats-bar" style={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', background: 'var(--primary-color)', borderRadius: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.07)', margin: '32px auto 0 auto', maxWidth: 1200, padding: '24px 0', gap: 16 }}>
        <StatCounter icon={<MdLocalHospital />} label="Doctors" value={120} />
        <StatCounter icon={<MdLocalPharmacy />} label="Departments" value={12} />
        <StatCounter icon={<MdAccessTime />} label="Years of Service" value={15} />
      </div>
      <main className="landing-main" style={{ maxWidth: 900, margin: '0 auto', padding: '32px 0 0 0' }}>
        <section id="departments" style={{ marginBottom: 64, width: '100%', maxWidth: 900, margin: '0 auto', background: 'none', boxShadow: 'none', border: 'none' }}>
          <h2 style={{ textAlign: 'center', marginBottom: 32, color: 'var(--text-color)' }}>Our Departments</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 24, width: '100%', margin: '0 auto' }}>
            <DepartmentCard icon={<MdFavorite />} title="Cardiology" desc="Heart care and cardiovascular health by the experts." />
            <DepartmentCard icon={<MdSearch />} title="Diagnosis" desc="Accurate diagnosis with modern technology and skilled staff." />
            <DepartmentCard icon={<MdLocalHospital />} title="Surgery" desc="Safe and advanced surgical procedures for all ages." />
            <DepartmentCard icon={<MdHealing />} title="First Aid" desc="Immediate care and first aid for emergencies and injuries." />
          </div>
        </section>
        <section id="about" className="about-us-section" style={{ marginBottom: 48, marginTop: 48, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 32, width: '100%', maxWidth: 900, margin: '0 auto', background: '#1ABC9C', borderRadius: 16, padding: '40px 24px' }}>
          <div style={{ flex: 1, minWidth: 220, textAlign: 'center' }}>
            <h3 style={{ color: '#fff' }}>About Us</h3>
            <p style={{ color: '#fff', fontSize: '1.1em', lineHeight: 1.7 }}>
              MediCare is dedicated to providing comprehensive, compassionate, and innovative healthcare services. Our team of experienced professionals leverages state-of-the-art technology and a patient-centered approach to ensure the best outcomes for every individual. We believe in making quality healthcare accessible and understandable for all, supporting you at every step of your wellness journey.
            </p>
          </div>
        </section>
      </main>
      <Footer />
      <div className="watermark">MediCare</div>
    </div>
  );
}

function LoginModal({ showSignUp, setShowSignUp, error, loading, handleSignUp, handleLogin, handleInputChange, form, setError, onClose }) {
  // Modal overlay and centered card
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(34,34,34,0.55)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(0,0,0,0.18)', padding: '40px 32px', minWidth: 320, maxWidth: 380, width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', animation: 'fadeInUp 0.7s cubic-bezier(.23,1.01,.32,1) both', position: 'relative' }}>
        <button onClick={onClose} style={{ position: 'absolute', top: 12, right: 16, background: 'none', border: 'none', fontSize: 22, color: '#888', cursor: 'pointer' }}>&times;</button>
        <div style={{ display: 'flex', width: '100%', marginBottom: 24, borderBottom: '1.5px solid #f0f0f0' }}>
          <button onClick={() => { setShowSignUp(true); setError(''); }} style={{ flex: 1, background: 'none', border: 'none', fontWeight: showSignUp ? 700 : 500, color: showSignUp ? '#1ABC9C' : '#888', fontSize: '1.1em', padding: '8px 0', borderBottom: showSignUp ? '2.5px solid #1ABC9C' : 'none', cursor: 'pointer', transition: 'color 0.2s' }}>Sign Up</button>
          <button onClick={() => { setShowSignUp(false); setError(''); }} style={{ flex: 1, background: 'none', border: 'none', fontWeight: !showSignUp ? 700 : 500, color: !showSignUp ? '#1ABC9C' : '#888', fontSize: '1.1em', padding: '8px 0', borderBottom: !showSignUp ? '2.5px solid #1ABC9C' : 'none', cursor: 'pointer', transition: 'color 0.2s' }}>Sign In</button>
        </div>
        {error && (
          <div className="error-message" style={{ marginBottom: 12 }}>
            <span className="icon"><MdHealthAndSafety /></span> {error}
          </div>
        )}
        <form onSubmit={showSignUp ? handleSignUp : handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%' }}>
          <label style={{ display: 'block', width: '100%' }}>
            <span className="icon"><MdPerson /></span> Full Name
            <input name="name" type="text" required value={form.name} onChange={handleInputChange} placeholder="Your name" style={{ width: '100%', padding: 12, marginTop: 8, borderRadius: 6, border: '1.5px solid #e0e0e0', background: '#f8f8f8' }} />
          </label>
          <label style={{ display: 'block', width: '100%' }}>
            <span className="icon"><MdEmail /></span> Email
            <input name="email" type="email" required value={form.email} onChange={handleInputChange} placeholder="you@email.com" style={{ width: '100%', padding: 12, marginTop: 8, borderRadius: 6, border: '1.5px solid #e0e0e0', background: '#f8f8f8' }} />
          </label>
          <label style={{ display: 'block', width: '100%' }}>
            <span className="icon"><MdLock /></span> Password
            <input name="password" type="password" required value={form.password} onChange={handleInputChange} placeholder="Password" style={{ width: '100%', padding: 12, marginTop: 8, borderRadius: 6, border: '1.5px solid #e0e0e0', background: '#f8f8f8' }} />
          </label>
          <button type="submit" disabled={loading} style={{ width: '100%', padding: 12, borderRadius: 6, marginTop: 8, background: '#1ABC9C', color: '#fff', fontWeight: 700, fontSize: '1.1em', border: 'none', boxShadow: '0 2px 8px #1abc9c22', cursor: loading ? 'not-allowed' : 'pointer', transition: 'background 0.2s' }}>
            {loading ? 'Loading...' : (showSignUp ? 'Sign Up' : 'Sign In')}
        </button>
        </form>
        <div style={{ marginTop: 18, color: '#888', fontSize: '0.98em', width: '100%', textAlign: 'center' }}>
          {showSignUp ? (
            <span>Already have an account?{' '}
              <button onClick={() => { setShowSignUp(false); setError(''); }} style={{ color: '#1ABC9C', background: 'none', border: 'none', textDecoration: 'underline', cursor: 'pointer', fontWeight: 600 }}>Sign In</button>
            </span>
          ) : (
            <span>Don't have an account?{' '}
              <button onClick={() => { setShowSignUp(true); setError(''); }} style={{ color: '#1ABC9C', background: 'none', border: 'none', textDecoration: 'underline', cursor: 'pointer', fontWeight: 600 }}>Sign Up</button>
            </span>
          )}
        </div>
        <div style={{ marginTop: 24, color: '#bbb', fontSize: '1.1em', width: '100%', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <div>
            <span style={{ margin: '0 8px' }}><i className="fa fa-linkedin"></i></span>
            <span style={{ margin: '0 8px' }}><i className="fa fa-instagram"></i></span>
            <span style={{ margin: '0 8px' }}><i className="fa fa-twitter"></i></span>
            <span style={{ margin: '0 8px' }}><i className="fa fa-facebook"></i></span>
          </div>
          <div style={{ fontSize: '0.95em' }}>
            <span style={{ marginRight: 8 }}>info@medicare.com</span>
            <span>+1 234 567 890</span>
          </div>
        </div>
      </div>
      <div className="login-bg-image" style={{ background: `url(${import.meta.env.BASE_URL}login-bg.jpg) no-repeat center center/cover` }} />
    </div>
  );
}

function DashboardPage({ user, handleLogout, fileInputRef, handleFileChange, filePreview, uploads, darkMode, toggleDarkMode }) {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--background)', position: 'relative' }}>
      <AnimatedSVGBackground />
      <div className="app-bg-interactive" />
      <div className="site-watermark-bg" />
      <Header darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      {/* Split Hero Section */}
      <section className="split-hero" style={{ background: 'var(--white)', borderRadius: 16, margin: '32px auto 0 auto', boxShadow: '0 2px 12px rgba(0,0,0,0.07)', maxWidth: '1200px', alignItems: 'center', minHeight: 340 }}>
        <div className="split-hero-content" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: 260 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <UserAvatar name={user.name} size={64} />
            <div>
              <h1 style={{ fontSize: '2.2em', margin: '8px 0 0 0', letterSpacing: 1, fontWeight: 700, color: 'var(--primary-color)' }}>Welcome, {user.name}!</h1>
              <p style={{ fontSize: '1.1em', margin: '16px 0 24px 0', color: 'var(--text-color)', opacity: 0.95 }}>Your health dashboard gives you access to your records, uploads, and more.</p>
            </div>
          </div>
          <RippleButton className="modern-btn" style={{ background: '#ff4f4f', color: '#fff', border: 'none', borderRadius: 6, padding: '10px 28px', fontWeight: 600, fontSize: '1em', marginTop: 8, width: 'fit-content' }} onClick={handleLogout}>
            Logout
          </RippleButton>
        </div>
        <div className="split-hero-image">
          <img src={`${import.meta.env.BASE_URL}hero-bg.jpg`} alt="Hero BG" style={{ background: '#e0e0e0' }} />
          <MedicalHeroSVG />
        </div>
      </section>
      <main className="dashboard-main" style={{ maxWidth: 900, margin: '0 auto', padding: '32px 0 0 0' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 32, marginTop: 32 }}>
          <section style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.07)', padding: 24, minHeight: 180 }}>
            <h2 style={{ marginTop: 0, color: '#1ABC9C' }}><span className="icon has-tooltip"><MdPerson /><span className="tooltip">User Info</span></span> User Info</h2>
            <p><span className="icon"><MdPerson /></span> {user.name}</p>
            <p><span className="icon"><MdEmail /></span> {user.email}</p>
          </section>
          <section style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.07)', padding: 24, minHeight: 180 }}>
            <h3 style={{ color: '#1ABC9C' }}><span className="icon has-tooltip"><MdUploadFile /><span className="tooltip">Upload Health Record</span></span> Upload Health Record (PDF)</h3>
            <input ref={fileInputRef} type="file" accept="application/pdf" onChange={handleFileChange} style={{ marginBottom: 12 }} />
            {filePreview && (
              <div style={{ marginTop: 12 }}>
                <p><span className="icon"><MdPreview /></span> PDF Preview:</p>
                <iframe src={filePreview} title="PDF Preview" width="100%" height="120" style={{ border: '1px solid #DDDDDD', borderRadius: 6 }}></iframe>
              </div>
            )}
          </section>
          <section style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(0,0,0,0.07)', padding: 24, minHeight: 180 }}>
            <h3 style={{ color: '#1ABC9C' }}><span className="icon has-tooltip"><MdHistory /><span className="tooltip">Upload History</span></span> Upload History</h3>
            {uploads.length === 0 ? (
              <p>No uploads yet.</p>
            ) : (
              <ul style={{ paddingLeft: 0, listStyle: 'none' }}>
                {uploads.map((u, i) => (
                  <li key={i} style={{ marginBottom: 8, opacity: 0, transform: 'translateY(16px)', animation: `fadeSlideIn 0.6s ${0.1 * i}s forwards` }}>
                    <span className="icon"><MdUploadFile /></span> {u.name} <span style={{ fontSize: '0.9em', color: '#666' }}>({u.date})</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>
      </main>
      <Footer />
      <div className="watermark">MediCare</div>
    </div>
  );
}

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [user, setUser] = useState(null);
  const [uploads, setUploads] = useState([]);
  const [filePreview, setFilePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showLoginModal, setShowLoginModal] = useState(false);
  const fileInputRef = useRef();

  // Form state
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  // Helper to get uploads key for a user
  const getUploadsKey = (email) => `healthDashboardUploads_${email}`;

  // Check for existing session on load
  useEffect(() => {
    const savedUser = localStorage.getItem('healthDashboardUser');
    const savedDarkMode = localStorage.getItem('healthDashboardDarkMode');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      setUser(parsedUser);
      setIsLoggedIn(true);
      // Load uploads for this user
      const userUploads = localStorage.getItem(getUploadsKey(parsedUser.email));
      setUploads(userUploads ? JSON.parse(userUploads) : []);
    }
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(''); // Clear error when user types
  };

  const validateForm = () => {
    if (!form.name.trim()) return 'Name is required';
    if (!form.email.trim()) return 'Email is required';
    if (!form.email.includes('@')) return 'Please enter a valid email';
    if (form.password.length < 6) return 'Password must be at least 6 characters';
    return null;
  };

  // On login, load uploads for that user
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const existingUsers = JSON.parse(localStorage.getItem('healthDashboardUsers') || '[]');
      const existingUser = existingUsers.find(u => u.email === form.email);
      if (!existingUser) {
        setError('User not found. Please sign up first.');
        setLoading(false);
        return;
      }
      if (existingUser.password !== form.password) {
        setError('Incorrect password.');
        setLoading(false);
        return;
      }
      const userData = { name: existingUser.name, email: existingUser.email };
      setUser(userData);
      setIsLoggedIn(true);
      localStorage.setItem('healthDashboardUser', JSON.stringify(userData));
      setForm({ name: '', email: '', password: '' });
      // Load uploads for this user
      const userUploads = localStorage.getItem(getUploadsKey(existingUser.email));
      setUploads(userUploads ? JSON.parse(userUploads) : []);
    } catch (err) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // On sign up, start with empty uploads for new user
  const handleSignUp = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      setLoading(false);
      return;
    }
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      const existingUsers = JSON.parse(localStorage.getItem('healthDashboardUsers') || '[]');
      const existingUser = existingUsers.find(u => u.email === form.email);
      if (existingUser) {
        setError('User already exists. Please login instead.');
        setLoading(false);
        return;
      }
      const newUser = {
        name: form.name,
        email: form.email,
        password: form.password,
        createdAt: new Date().toISOString()
      };
      existingUsers.push(newUser);
      localStorage.setItem('healthDashboardUsers', JSON.stringify(existingUsers));
      const userData = { name: newUser.name, email: newUser.email };
      setUser(userData);
      setIsLoggedIn(true);
      localStorage.setItem('healthDashboardUser', JSON.stringify(userData));
      setForm({ name: '', email: '', password: '' });
      // Start with empty uploads for new user
      setUploads([]);
      localStorage.setItem(getUploadsKey(newUser.email), JSON.stringify([]));
    } catch (err) {
      setError('Sign up failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // On logout, clear uploads from state (not from storage)
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setUploads([]);
    localStorage.removeItem('healthDashboardUser');
  };

  // On file upload, update only this user's uploads
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      const url = URL.createObjectURL(file);
      setFilePreview(url);
      const newUpload = { name: file.name, date: new Date().toLocaleString() };
      const updatedUploads = [...uploads, newUpload];
      setUploads(updatedUploads);
      if (user && user.email) {
        localStorage.setItem(getUploadsKey(user.email), JSON.stringify(updatedUploads));
      }
    } else {
      setFilePreview(null);
    }
  };

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('healthDashboardDarkMode', JSON.stringify(newDarkMode));
  };

  // Persist dark mode preference
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('healthDashboardDarkMode');
    if (savedDarkMode !== null) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('healthDashboardDarkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [darkMode]);

  if (!isLoggedIn) {
    return (
      <>
        <LandingPage onLogin={() => setShowLoginModal(true)} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        {showLoginModal && (
          <LoginModal
            showSignUp={showSignUp}
            setShowSignUp={setShowSignUp}
            error={error}
            loading={loading}
            handleSignUp={handleSignUp}
            handleLogin={handleLogin}
            handleInputChange={handleInputChange}
            form={form}
            setError={setError}
            onClose={() => setShowLoginModal(false)}
          />
        )}
      </>
    );
  }

  return (
    <DashboardPage
      user={user}
      handleLogout={handleLogout}
      fileInputRef={fileInputRef}
      handleFileChange={handleFileChange}
      filePreview={filePreview}
      uploads={uploads}
      darkMode={darkMode}
      toggleDarkMode={toggleDarkMode}
    />
  );
}

export default App;