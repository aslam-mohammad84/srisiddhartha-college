import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPin, Phone, Mail, BookOpen, Users, Award, Building, ArrowRight, ChevronLeft, ChevronRight, Coffee, Wifi, Bus, Home as HomeIcon, Dumbbell, Palette } from 'lucide-react';
import { Link } from 'react-router-dom';
import './index.css';

// Custom Hook for Auto-Scrolling Carousels
function useAutoScroll(data, speed = 3000, scrollAmount = 320) {
  const gridRef = useRef(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid || !data) return;
    
    let scrollInterval = setInterval(() => {
      if (grid.scrollLeft + grid.clientWidth >= grid.scrollWidth - 10) {
        grid.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        grid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }, speed);

    const pauseScroll = () => clearInterval(scrollInterval);
    const resumeScroll = () => {
      clearInterval(scrollInterval);
      scrollInterval = setInterval(() => {
        if (grid.scrollLeft + grid.clientWidth >= grid.scrollWidth - 10) {
          grid.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          grid.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      }, speed);
    };

    grid.addEventListener('mouseenter', pauseScroll);
    grid.addEventListener('mouseleave', resumeScroll);
    grid.addEventListener('touchstart', pauseScroll);
    grid.addEventListener('touchend', resumeScroll);

    // Desktop Drag-to-Scroll (Swipe) Logic
    let isDown = false;
    let startX;
    let scrollLeftStart;

    const onMouseDown = (e) => {
      isDown = true;
      grid.style.cursor = 'grabbing';
      grid.style.userSelect = 'none';
      startX = e.pageX - grid.offsetLeft;
      scrollLeftStart = grid.scrollLeft;
      pauseScroll();
    };

    const onMouseLeave = () => {
      if (isDown) {
        isDown = false;
        grid.style.cursor = 'default';
        grid.style.userSelect = 'auto';
      }
      resumeScroll();
    };

    const onMouseUp = () => {
      isDown = false;
      grid.style.cursor = 'default';
      grid.style.userSelect = 'auto';
      resumeScroll();
    };

    const onMouseMove = (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - grid.offsetLeft;
      const walk = (x - startX) * 2; // multiplier for drag speed
      grid.scrollLeft = scrollLeftStart - walk;
    };

    grid.addEventListener('mousedown', onMouseDown);
    grid.addEventListener('mouseleave', onMouseLeave);
    grid.addEventListener('mouseup', onMouseUp);
    grid.addEventListener('mousemove', onMouseMove);

    return () => {
      clearInterval(scrollInterval);
      grid.removeEventListener('mouseenter', pauseScroll);
      grid.removeEventListener('mouseleave', resumeScroll);
      grid.removeEventListener('touchstart', pauseScroll);
      grid.removeEventListener('touchend', resumeScroll);
      grid.removeEventListener('mousedown', onMouseDown);
      grid.removeEventListener('mouseleave', onMouseLeave);
      grid.removeEventListener('mouseup', onMouseUp);
      grid.removeEventListener('mousemove', onMouseMove);
    };
  }, [data, speed, scrollAmount]);

  return gridRef;
}

// Component: 3D Faculty Card
const FacultyCard = ({ faculty }) => {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const cardRef = useRef(null);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    // Calculate rotation limits (max 15 degrees)
    const rotX = ((y - centerY) / centerY) * -15;
    const rotY = ((x - centerX) / centerX) * 15;
    
    setRotateX(rotX);
    setRotateY(rotY);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      ref={cardRef}
      className="perspective-container"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ rotateX, rotateY }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      style={{
        display: 'flex',
        justifyContent: 'center',
        margin: '1rem',
      }}
    >
      <motion.div
        className="glass-panel"
        whileHover={{ scale: 1.05 }}
        style={{
          width: '280px',
          height: '420px',
          padding: '1.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div style={{ position: 'absolute', top: -30, right: -30, width: '100px', height: '100px', background: 'var(--accent-color)', borderRadius: '50%', filter: 'blur(40px)', opacity: 0.2 }} />
        
        <div style={{ width: '150px', height: '150px', borderRadius: '50%', overflow: 'hidden', border: '4px solid rgba(255,255,255,0.8)', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', marginBottom: '1.5rem', position: 'relative', zIndex: 1 }}>
          <img src={`/faculty/${faculty.image}`} alt={faculty.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
        
        <h3 style={{ fontSize: '1.3rem', marginBottom: '0.3rem', textAlign: 'center', color: 'var(--text-primary)' }}>{faculty.name}</h3>
        <p style={{ color: 'var(--accent-color)', fontWeight: '600', marginBottom: '0.8rem', fontSize: '0.9rem', textAlign: 'center' }}>{faculty.department}</p>
        <p style={{ color: 'var(--text-secondary)', textAlign: 'center', fontSize: '0.85rem' }}>{faculty.qualification}</p>
        
        <div style={{ marginTop: 'auto', display: 'flex', gap: '0.5rem', alignSelf: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ background: 'rgba(79, 70, 229, 0.1)', padding: '0.4rem 0.8rem', borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '0.3rem', color: 'var(--accent-color)', fontSize: '0.8rem' }}>
            <Award size={14} /> Expert
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Main Home Component
function Home({ data }) {
  const { scrollYProgress } = useScroll();
  const yHero = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const facultyGridRef = useAutoScroll(data, 3000, 320);
  const programmesGridRef = useAutoScroll(data, 3500, 340);
  const [facultyIndex, setFacultyIndex] = useState(0);
  const facultyIndexRef = useRef(0);
  const facultyScrollFrameRef = useRef(null);

  const scrollToFaculty = (index) => {
    const card = facultyGridRef.current?.children[index];
    if (!card) return;

    card.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'start' });
    facultyIndexRef.current = index;
    setFacultyIndex(index);
  };

  const handleFacultyScroll = () => {
    if (facultyScrollFrameRef.current) return;

    facultyScrollFrameRef.current = requestAnimationFrame(() => {
      facultyScrollFrameRef.current = null;

      const grid = facultyGridRef.current;
      const firstCard = grid?.children[0];
      if (!grid || !firstCard) return;

      const cardStep = firstCard.offsetWidth + 18;
      const index = Math.max(0, Math.min(
        Math.round(grid.scrollLeft / cardStep),
        faculty.length - 1
      ));

      if (index !== facultyIndexRef.current) {
        facultyIndexRef.current = index;
        setFacultyIndex(index);
      }
    });
  };

  const moveFaculty = (direction) => {
    const nextIndex = (facultyIndex + direction + faculty.length) % faculty.length;
    scrollToFaculty(nextIndex);
  };

  useEffect(() => () => {
    if (facultyScrollFrameRef.current) {
      cancelAnimationFrame(facultyScrollFrameRef.current);
    }
  }, []);

  if (!data) return <div style={{textAlign: 'center', padding: '50px'}}>Error loading data.</div>;

  const { college, programmes, faculty } = data;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      style={{ overflow: 'hidden' }}
    >
      {/* Hero Section */}
      <section className="hero-section" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', position: 'relative', overflow: 'hidden', paddingTop: '140px' }}>
        
        <motion.div 
          className="container hero-container"
          style={{ y: yHero, opacity: opacityHero, zIndex: 10, position: 'relative', display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4rem' }}
        >
          {/* Left Text Column */}
          <motion.div
            className="hero-text-col"
            style={{ flex: '1 1 500px' }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div style={{ display: 'inline-block', padding: '0.5rem 1rem', background: 'rgba(99, 102, 241, 0.1)', border: '1px solid var(--accent-color)', borderRadius: '30px', color: 'var(--accent-color)', fontWeight: 600, marginBottom: '1.5rem', fontSize: '0.9rem' }}>
              Established {college.established}
            </div>
            <h1 style={{ fontSize: 'clamp(3rem, 5vw, 4.5rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '1.5rem' }}>
              <span className="text-gradient">{college.name}</span>
            </h1>
            <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '600px', marginBottom: '2rem' }}>
              {college.vision}
            </p>
            <div className="hero-tags" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                <MapPin size={20} color="var(--accent-color)" /> {college.location}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)' }}>
                <Award size={20} color="var(--accent-color)" /> {college.affiliatedTo}
              </div>
            </div>
          </motion.div>

          {/* Right Image Column */}
          <motion.div
            style={{ flex: '1 1 400px', position: 'relative' }}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <div className="hero-image-col" style={{ position: 'relative', borderRadius: '30px', overflow: 'hidden', boxShadow: '0 25px 50px -12px rgba(79, 70, 229, 0.25)', height: '600px', width: '100%' }}>
              <img 
                src="/hero_section_bg.png" 
                alt="Campus" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center' }} 
              />
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to top, rgba(0,0,0,0.2), transparent)' }} />
            </div>
            
            {/* Decorative Floating Element */}
            <motion.div
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
              style={{ position: 'absolute', bottom: '-20px', left: '-20px', background: 'var(--bg-card)', padding: '1.5rem', borderRadius: '20px', boxShadow: 'var(--glass-shadow)', backdropFilter: 'var(--glass-blur)' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--accent-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>
                  <Users size={24} />
                </div>
                <div>
                  <h4 style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-primary)' }}>Premium Education</h4>
                  <p style={{ margin: 0, color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Join the community</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Message & Infrastructure */}
      <section className="section container">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
          <motion.div 
            className="glass-panel" 
            style={{ padding: '2.5rem' }}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Users size={40} color="var(--accent-color)" style={{ marginBottom: '1rem' }} />
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Principal's Message</h2>
            <p style={{ color: 'var(--text-secondary)', fontStyle: 'italic' }}>"{college.principalMessage}"</p>
          </motion.div>
          
          <motion.div 
            className="glass-panel" 
            style={{ padding: '2.5rem' }}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <Building size={40} color="var(--accent-color)" style={{ marginBottom: '1rem' }} />
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Infrastructure</h2>
            <ul style={{ color: 'var(--text-secondary)', paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {college.infrastructure.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </motion.div>
        </div>
      </section>

      {/* Programmes Section */}
      <section id="programmes" className="section container">
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Our <span className="text-gradient">Programmes</span></h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>Explore our diverse range of undergraduate courses designed to build a strong foundation for your career.</p>
        </div>
        
        <div className="carousel-grid" ref={programmesGridRef}>
          {programmes.map((prog, i) => {
            const cardColors = ['#4f46e5', '#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];
            const color = cardColors[i % cardColors.length];
            const courseImages = {
              "B.Sc. Computer Science": "/courses/course_cs.png",
              "B.Sc. Data Science": "/courses/course_data.png",
              "B.Sc. Botany": "/courses/course_botany.png",
              "B.Sc. Chemistry": "/courses/course_chem.png",
              "B.Com. General": "/courses/course_bcom.png",
              "B.Com. Computer Applications": "/courses/course_bcom_ca.png"
            };
            const imagePath = courseImages[prog.name] || "/hero_section_bg.png";

            const courseSlug = prog.name.toLowerCase().replace(/[\.\s]+/g, '-').replace(/^-|-$/g, '');

            return (
              <Link to={`/course/${courseSlug}`} key={prog.id} style={{ textDecoration: 'none', display: 'block' }}>
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ y: -12, scale: 1.03 }}
                  style={{ 
                    background: 'var(--bg-card)',
                    backdropFilter: 'var(--glass-blur)',
                    WebkitBackdropFilter: 'var(--glass-blur)',
                    borderRadius: '24px',
                    position: 'relative', 
                    overflow: 'hidden',
                    boxShadow: '0 15px 35px -10px rgba(0,0,0,0.05)',
                    border: '1px solid rgba(255,255,255,0.8)',
                    display: 'flex',
                    flexDirection: 'column',
                    minHeight: '340px',
                    cursor: 'pointer'
                  }}
                >
                  {/* Course Image Header */}
                  <div style={{ height: '160px', width: '100%', position: 'relative' }}>
                    <img src={imagePath} alt={prog.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: `linear-gradient(to bottom, transparent, rgba(0,0,0,0.1))` }} />
                  </div>
                  
                  {/* Top Accent Line */}
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '5px', background: `linear-gradient(90deg, ${color}, transparent)`, zIndex: 10 }} />
                  
                  {/* Decorative Background Blob inside text area */}
                  <div style={{ position: 'absolute', bottom: '-20%', right: '-20%', width: '150px', height: '150px', background: color, filter: 'blur(70px)', opacity: 0.1, zIndex: 0 }} />
                  
                  {/* Text Content */}
                  <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between', position: 'relative', zIndex: 2 }}>
                    <div>
                      <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'var(--text-primary)', fontWeight: 700, lineHeight: 1.3 }}>{prog.name}</h3>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '0.8rem', marginTop: '1rem', flexWrap: 'wrap' }}>
                      <span style={{ padding: '0.4rem 1rem', background: 'rgba(0,0,0,0.04)', color: 'var(--text-secondary)', borderRadius: '30px', fontSize: '0.85rem', fontWeight: 600 }}>{prog.type}</span>
                      <span style={{ padding: '0.4rem 1rem', background: `${color}15`, color: color, borderRadius: '30px', fontSize: '0.85rem', fontWeight: 600 }}>{prog.duration}</span>
                    </div>

                    <div style={{ marginTop: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: color, fontWeight: 'bold', fontSize: '0.95rem' }}>
                      Explore Course <ArrowRight size={18} />
                    </div>
                  </div>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </section>

 {/* ==================== FACULTY SECTION ==================== */}

<section id="faculty" className="faculty-section">

  <div className="faculty-container">

    {/* Header */}
    <div className="faculty-header">

      <div className="faculty-badge">
        <span className="faculty-badge-dot"></span>
        OUR FACULTY
      </div>

      <h2>
        Meet Our <span>Faculty</span>
      </h2>

      <p>
        Meet the dedicated educators and academic professionals
        who inspire, guide, and empower our students to achieve
        excellence.
      </p>

    </div>


    {/* Faculty Carousel */}
<div className="faculty-carousel-wrapper">
  <div className="faculty-carousel-controls" aria-label="Faculty carousel controls">
    <button
      type="button"
      className="faculty-arrow faculty-prev"
      onClick={() => moveFaculty(-1)}
      aria-label="Previous faculty member"
    >
      <ChevronLeft size={18} aria-hidden="true" />
    </button>

    <div className="faculty-counter" aria-live="polite">
      <strong>{String(facultyIndex + 1).padStart(2, '0')}</strong>
      <span>/</span>
      <span>{String(faculty.length).padStart(2, '0')}</span>
    </div>

    <button
      type="button"
      className="faculty-arrow faculty-next"
      onClick={() => moveFaculty(1)}
      aria-label="Next faculty member"
    >
      <ChevronRight size={18} aria-hidden="true" />
    </button>
  </div>

<div className="faculty-grid" ref={facultyGridRef} onScroll={handleFacultyScroll}>
  {faculty.map((member) => (
    <div
      key={member.id}
      className={`faculty-card ${
        member.department === "Administration"
          ? "administration-card"
          : ""
      }`}
    >
      <div className="faculty-image-container">
        <img
          src={`/faculty/${member.image}`}
          alt={member.name}
          className="faculty-image"
        />

        <div className="faculty-image-gradient" />

        <div className="faculty-designation">
          {member.designation}
        </div>
      </div>

      <div className="faculty-card-content">

        <h3 className="faculty-name">
          {member.name}
        </h3>

        <div className="faculty-department">

          <div className="faculty-department-icon">
            ▦
          </div>

          <span>
            {member.department}
          </span>

        </div>

        {/* Show experience ONLY for non-administration */}
        {member.department !== "Administration" &&
          member.experience && (
            <div className="faculty-bottom">

              <div className="faculty-experience">

                <div className="faculty-experience-icon">
                  ★
                </div>

                <div className="faculty-experience-text">

                  <span>Experience</span>

                  <strong>
                    {member.experience}
                  </strong>

                </div>

              </div>

            </div>
          )}

      </div>
    </div>
  ))}
</div>

  <div className="faculty-dots" aria-label="Select faculty member">
    {faculty.map((member, index) => (
      <button
        type="button"
        className={`faculty-dot ${index === facultyIndex ? 'active' : ''}`}
        onClick={() => scrollToFaculty(index)}
        aria-label={`Show ${member.name}`}
        aria-current={index === facultyIndex ? 'true' : undefined}
        key={member.id}
      />
    ))}
  </div>
</div>

  </div>

</section>


      {/* Student Life Section */}
      <section id="student-life" className="section" style={{ background: 'linear-gradient(to bottom, transparent, rgba(99, 102, 241, 0.03))' }}>
        <div className="container" style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <h2 style={{ fontSize: '3rem', marginBottom: '1rem' }}>Student <span className="text-gradient">Life</span></h2>
          <p style={{ color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>A vibrant community where learning extends beyond the classroom walls.</p>
        </div>
        
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {/* Student Life Cards */}
            {[
              { img: '/student_1_1783082163121.png', title: 'Campus Collaboration', desc: 'Collaborate with peers in our modern study spaces.' },
              { img: '/student_2_1783082174357.png', title: 'Library Resources', desc: 'Access an extensive collection of physical and digital resources.' },
              { img: '/student_3_1783082186940.png', title: 'Community Events', desc: 'Engage in lively campus discussions and networking events.' },
              { img: '/sports.png', title: 'Sports & Athletics', desc: 'State-of-the-art indoor and outdoor facilities to keep you active and competitive.' },
              { img: '/tech.png', title: 'Innovation Labs', desc: 'Join our tech societies, robotics clubs, and hackathons to build the future.' },
              { img: '/fest.png', title: 'Cultural Fests', desc: 'Experience massive annual music, art, and cultural festivals hosted on campus.' }
            ].map((item, i) => (
              <motion.div
                key={i}
                className="glass-panel"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column', padding: 0 }}
              >
                <div style={{ width: '100%', height: '250px', overflow: 'hidden' }}>
                  <motion.img 
                    src={item.img} 
                    alt={item.title} 
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                  />
                </div>
                <div style={{ padding: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{item.title}</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{item.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Campus Facilities Sub-Section */}
        <div className="container" style={{ marginTop: '5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h3 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Premium <span className="text-gradient">Facilities</span></h3>
            <p style={{ color: 'var(--text-secondary)' }}>Everything you need for a comfortable and productive campus life.</p>
          </div>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem' }}>
            {[
              { icon: <Coffee size={32} />, title: 'Modern Cafeteria', desc: 'Hygienic and diverse food courts.' },
              { icon: <Wifi size={32} />, title: 'High-Speed Wi-Fi', desc: '24/7 seamless campus-wide connectivity.' },
              { icon: <HomeIcon size={32} />, title: 'Luxury Hostels', desc: 'Comfortable living spaces for students.' },
              { icon: <Bus size={32} />, title: 'Transportation', desc: 'College buses covering all major routes.' },
              { icon: <Dumbbell size={32} />, title: 'Fitness Center', desc: 'Fully equipped modern gymnasium.' },
              { icon: <Palette size={32} />, title: 'Arts Studios', desc: 'Creative spaces for design and media.' }
            ].map((facility, idx) => (
              <motion.div 
                key={idx}
                className="glass-panel"
                whileHover={{ y: -10, borderColor: 'var(--accent-color)' }}
                style={{ padding: '2rem', textAlign: 'center', transition: 'border-color 0.3s' }}
              >
                <div style={{ display: 'inline-flex', padding: '1rem', background: 'rgba(99, 102, 241, 0.1)', borderRadius: '50%', color: 'var(--accent-color)', marginBottom: '1rem' }}>
                  {facility.icon}
                </div>
                <h4 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>{facility.title}</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{facility.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: '#0f172a', color: 'white', padding: '4rem 0 2rem 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
            <div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>{college.name}</h3>
              <p style={{ color: '#94a3b8', marginBottom: '1.5rem' }}>Empowering students with knowledge, skills, and values to excel in their chosen fields.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#94a3b8' }}>
                  <MapPin size={20} color="var(--accent-color)" />
                  <span>{college.location}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#94a3b8' }}>
                  <Phone size={20} color="var(--accent-color)" />
                  <span>{college.phone}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#94a3b8' }}>
                  <Mail size={20} color="var(--accent-color)" />
                  <span>{college.email}</span>
                </div>
              </div>
            </div>

            <div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Quick Links</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <a href="#programmes" style={{ color: '#94a3b8', textDecoration: 'none' }}>Our Programmes</a>
                <a href="#faculty" style={{ color: '#94a3b8', textDecoration: 'none' }}>Meet the Faculty</a>
                <a href="#student-life" style={{ color: '#94a3b8', textDecoration: 'none' }}>Student Life</a>
                <Link to="/course/bsc-computer-science" style={{ color: '#94a3b8', textDecoration: 'none' }}>B.Sc. Computer Science</Link>
                <Link to="/course/bcom-general" style={{ color: '#94a3b8', textDecoration: 'none' }}>B.Com. General</Link>
              </div>
            </div>
            
            <div>
              <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem' }}>Location</h3>
              <div style={{ width: '100%', height: '250px', borderRadius: '16px', overflow: 'hidden' }}>
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3819.7731714331717!2d80.84825217502075!3d16.787957084000585!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a3675cc56a415e3%3A0x6661f274a24e6196!2sSri%20Siddhartha%20Degree%20College%20Of%20Science%20%26%20Computers!5e0!3m2!1sen!2sin!4v1783092745109!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="College Location Map"
                ></iframe>
              </div>
            </div>
          </div>
          
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '2rem', textAlign: 'center', color: '#64748b', fontSize: '0.9rem' }}>
            &copy; {new Date().getFullYear()} {college.name}. All Rights Reserved.
          </div>
        </div>
      </footer>
    </motion.div>
  );
}

export default Home;
