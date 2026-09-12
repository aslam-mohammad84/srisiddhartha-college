import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ChevronDown, ArrowRight } from 'lucide-react';

function Navbar({ data }) {
  const location = useLocation();
  const isHome = location.pathname === '/';
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const scrollTo = (id) => {
    setIsMobileMenuOpen(false); // close mobile menu if open
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav 
        className="site-nav"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="container nav-main-row">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="brand-mark" aria-label="Sri Siddhartha Degree College home">
            <img src="/logo.png" alt="Sri Siddhartha Logo" />
            <div className="brand-text">
              <span className="brand-title">Sri Siddhartha Degree College</span>
              <span className="brand-meta">NUZVID | ESTD 2001</span>
            </div>
          </Link>

          <div className="desktop-nav">
            <div className="nav-menu">
              <button className="nav-link active">Home</button>

              <div className="courses-dropdown-container">
                <div className="nav-link nav-link-with-icon">
                  Courses <ChevronDown size={16} />
                </div>
                <div className="courses-dropdown-menu">
                  {data?.programmes?.map((prog) => {
                    const courseSlug = prog.name.toLowerCase().replace(/[\.\s]+/g, '-').replace(/^-|-$/g, '');
                    return (
                      <Link 
                        key={prog.id} 
                        to={`/course/${courseSlug}`}
                        className="dropdown-link"
                      >
                        {prog.name}
                        <ArrowRight size={14} opacity={0.5} />
                      </Link>
                    );
                  })}
                </div>
              </div>

              {isHome && <button onClick={() => scrollTo('faculty')} className="nav-link">Faculty</button>}
              {isHome && <button onClick={() => scrollTo('student-life')} className="nav-link">Student Life</button>}
              {isHome && <button className="nav-link">About</button>}
              {isHome && <button className="nav-link">Contact</button>}
              {!isHome && (
                <Link to="/" className="back-link">
                  <button className="nav-btn nav-btn-secondary">&larr; Back to Campus</button>
                </Link>
              )}
              <button className="nav-btn">Apply Now <span aria-hidden="true">→</span></button>
            </div>
          </div>

          <button className="mobile-menu-btn" onClick={() => setIsMobileMenuOpen(true)} aria-label="Open menu">
            <Menu size={28} />
          </button>
        </div>
      </motion.nav>

      {/* Full Screen Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(30px)',
              zIndex: 2000,
              display: 'flex',
              flexDirection: 'column',
              padding: '2rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4rem' }}>
              <Link to="/" onClick={() => setIsMobileMenuOpen(false)} style={{ textDecoration: 'none', color: 'var(--text-primary)', fontWeight: 'bold', fontSize: 'clamp(1rem, 3.5vw, 1.3rem)', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <img src="/logo.png" alt="Sri Siddhartha Logo" style={{ width: 55, height: 55, borderRadius: '50%', objectFit: 'cover' }} />
                Sri Siddhartha Degree College
              </Link>
              <button 
                onClick={() => setIsMobileMenuOpen(false)}
                style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}
              >
                <X size={32} />
              </button>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center', flexGrow: 1, justifyContent: 'center', pb: '10vh' }}>
              <div style={{ textAlign: 'center' }}>
                <p style={{ color: 'var(--text-primary)', fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem' }}>All Courses</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {data?.programmes?.map((prog) => {
                    const courseSlug = prog.name.toLowerCase().replace(/[\.\s]+/g, '-').replace(/^-|-$/g, '');
                    return (
                      <Link 
                        key={prog.id} 
                        to={`/course/${courseSlug}`}
                        onClick={() => setIsMobileMenuOpen(false)}
                        style={{ textDecoration: 'none', color: 'var(--text-secondary)', fontSize: '1.1rem' }}
                      >
                        {prog.name}
                      </Link>
                    );
                  })}
                </div>
              </div>

              {isHome && <button onClick={() => scrollTo('faculty')} className="mobile-nav-link">Faculty</button>}
              {isHome && <button onClick={() => scrollTo('student-life')} className="mobile-nav-link">Student Life</button>}
              
              {!isHome && (
                <Link to="/" onClick={() => setIsMobileMenuOpen(false)} style={{ textDecoration: 'none', marginTop: '1rem' }}>
                  <button className="mobile-nav-link">
                    &larr; Back to Campus
                  </button>
                </Link>
              )}
              
              <button onClick={() => setIsMobileMenuOpen(false)} className="nav-btn" style={{ padding: '1rem 2.5rem', fontSize: '1.1rem', marginTop: '1rem' }}>Apply Now</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
