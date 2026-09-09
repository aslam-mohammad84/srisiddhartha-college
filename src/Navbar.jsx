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
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          background: 'rgba(7, 17, 31, 0.78)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.18)',
          padding: 0
        }}
      >
        <div className="container nav-main-row" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          
          {/* Logo */}
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} style={{ textDecoration: 'none', color: '#ffffff', fontWeight: 'bold', fontSize: 'clamp(1rem, 3.5vw, 1.3rem)', display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
            <img src="/logo.png" alt="Sri Siddhartha Logo" style={{ width: 50, height: 50, borderRadius: '50%', objectFit: 'cover' }} />
            Sri Siddhartha Degree College
          </Link>

          {/* Desktop Links */}
          <div className="desktop-nav">
            <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
              {/* Courses Dropdown */}
              <div className="courses-dropdown-container">
                <div 
                  className="nav-link" 
                  style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}
                >
                  Courses <ChevronDown size={16} />
                </div>
                <div className="courses-dropdown-menu">
                  {data?.programmes?.map((prog) => {
                    const courseSlug = prog.name.toLowerCase().replace(/[\.\s]+/g, '-').replace(/^-|-$/g, '');
                    return (
                      <Link 
                        key={prog.id} 
                        to={`/course/${courseSlug}`}
                        style={{ 
                          textDecoration: 'none', 
                          color: 'var(--text-secondary)', 
                          padding: '0.8rem 1rem', 
                          borderRadius: '10px',
                          fontSize: '0.9rem',
                          fontWeight: 500,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = 'var(--bg-secondary)';
                          e.currentTarget.style.color = 'var(--text-primary)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = 'transparent';
                          e.currentTarget.style.color = 'var(--text-secondary)';
                        }}
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
              
              {!isHome && (
                <Link to="/" style={{ textDecoration: 'none' }}>
                  <button className="nav-btn" style={{ background: 'transparent', border: '1px solid var(--accent-color)', color: 'var(--text-primary)' }}>
                    &larr; Back to Campus
                  </button>
                </Link>
              )}
              
              <button className="nav-btn">Apply Now</button>
            </div>
          </div>

          {/* Mobile Hamburger Button */}
          <button 
            className="mobile-menu-btn" 
            onClick={() => setIsMobileMenuOpen(true)}
            style={{ background: 'transparent', border: 'none', color: 'var(--text-primary)', cursor: 'pointer' }}
          >
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
