import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, BookOpen, GraduationCap, CheckCircle, Users, Briefcase, FileText, Target } from 'lucide-react';
import './index.css';

// Detailed data for all courses
const detailedCourseData = {
  "B.Sc. Computer Science": {
    description: "Dive into the world of computing. This program covers software engineering, algorithms, database management, and modern programming languages to prepare you for the tech industry.",
    eligibility: "10+2 with Mathematics or Computer Science, minimum 55% aggregate.",
    syllabus: ["Data Structures & Algorithms", "Object-Oriented Programming", "Operating Systems", "Web Development", "Artificial Intelligence Basics"],
    careers: ["Software Developer", "Systems Analyst", "Database Administrator", "Web Engineer"]
  },
  "B.Sc. Data Science": {
    description: "Learn to extract meaningful insights from vast amounts of data. This cutting-edge program blends mathematics, statistics, and computer science.",
    eligibility: "10+2 with Mathematics/Statistics, minimum 60% aggregate.",
    syllabus: ["Statistical Methods", "Machine Learning", "Data Visualization", "Big Data Analytics", "Python & R Programming"],
    careers: ["Data Scientist", "Data Analyst", "Machine Learning Engineer", "Business Intelligence Analyst"]
  },
  "B.Sc. Botany": {
    description: "Explore the fascinating science of plant life. This program offers in-depth knowledge of plant biology, genetics, ecology, and conservation.",
    eligibility: "10+2 with Biology (BPC), minimum 50% aggregate.",
    syllabus: ["Plant Physiology", "Genetics & Plant Breeding", "Ecology", "Microbiology", "Plant Anatomy"],
    careers: ["Botanist", "Environmental Consultant", "Agricultural Researcher", "Conservationist"]
  },
  "B.Sc. Chemistry": {
    description: "Delve into the composition, structure, and properties of matter. A comprehensive program covering organic, inorganic, and physical chemistry.",
    eligibility: "10+2 with Chemistry (MPC/BPC), minimum 50% aggregate.",
    syllabus: ["Organic Chemistry", "Inorganic Chemistry", "Physical Chemistry", "Analytical Techniques", "Biochemistry"],
    careers: ["Chemical Analyst", "Research Scientist", "Quality Control Inspector", "Pharmacologist"]
  },
  "B.Com. General": {
    description: "A foundational commerce program designed to build strong skills in accounting, finance, taxation, and business management.",
    eligibility: "10+2 in any stream (Commerce preferred), minimum 50% aggregate.",
    syllabus: ["Financial Accounting", "Business Economics", "Corporate Law", "Taxation", "Cost Accounting"],
    careers: ["Accountant", "Financial Advisor", "Tax Consultant", "Banking Operations"]
  },
  "B.Com. Computer Applications": {
    description: "Bridge the gap between business and technology. This unique program integrates core commerce subjects with practical computer applications.",
    eligibility: "10+2 in any stream, minimum 50% aggregate.",
    syllabus: ["Accounting with Tally", "E-Commerce", "DBMS", "Business Statistics", "Web Designing"],
    careers: ["IT Business Analyst", "E-Commerce Manager", "Financial Systems Analyst", "ERP Consultant"]
  }
};

function CoursePage({ data }) {
  const { id } = useParams();
  
  // Find the course based on the slug in the URL
  const course = data.programmes.find(
    p => p.name.toLowerCase().replace(/[\.\s]+/g, '-').replace(/^-|-$/g, '') === id
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  if (!course) {
    return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Course Not Found</h2>
        <Link to="/" style={{ color: 'var(--accent-color)', textDecoration: 'none', fontWeight: 'bold' }}>&larr; Return Home</Link>
      </div>
    );
  }

  // Course Images Map
  const courseImages = {
    "B.Sc. Computer Science": "/courses/course_cs.png",
    "B.Sc. Data Science": "/courses/course_data.png",
    "B.Sc. Botany": "/courses/course_botany.png",
    "B.Sc. Chemistry": "/courses/course_chem.png",
    "B.Com. General": "/courses/course_bcom.png",
    "B.Com. Computer Applications": "/courses/course_bcom_ca.png"
  };
  
  // Custom Accents based on course
  const courseColors = {
    "B.Sc. Computer Science": "#3b82f6", // Blue
    "B.Sc. Data Science": "#06b6d4", // Cyan
    "B.Sc. Botany": "#10b981", // Green
    "B.Sc. Chemistry": "#ec4899", // Pink
    "B.Com. General": "#f59e0b", // Amber
    "B.Com. Computer Applications": "#8b5cf6" // Purple
  };

  const imagePath = courseImages[course.name] || "/hero_section_bg.png";
  const accentColor = courseColors[course.name] || "var(--accent-color)";
  const details = detailedCourseData[course.name] || detailedCourseData["B.Sc. Computer Science"];

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      style={{ minHeight: '100vh', background: 'var(--bg-primary)', position: 'relative', overflow: 'hidden', paddingBottom: '4rem' }}
    >
      
      {/* Background Animated Blobs matching Course Color */}
      <div style={{ position: 'absolute', top: '-10%', left: '-10%', width: '50vw', height: '50vw', background: accentColor, filter: 'blur(150px)', opacity: 0.08, zIndex: 0, borderRadius: '50%' }} />
      <div style={{ position: 'absolute', bottom: '10%', right: '-10%', width: '40vw', height: '40vw', background: accentColor, filter: 'blur(120px)', opacity: 0.05, zIndex: 0, borderRadius: '50%' }} />

      {/* Navigation */}
      <div className="container" style={{ position: 'relative', zIndex: 10, paddingTop: '6rem' }}>
        <Link to="/" style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '0.5rem', 
          color: 'var(--text-secondary)', 
          textDecoration: 'none',
          background: 'var(--bg-card)',
          padding: '0.6rem 1.2rem',
          borderRadius: '30px',
          boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
          border: '1px solid var(--glass-border)',
          fontWeight: 600,
          transition: 'all 0.3s ease'
        }}>
          <ArrowLeft size={18} /> Back to Campus
        </Link>
      </div>

      {/* Light Theme Hero Section */}
      <div className="container" style={{ position: 'relative', zIndex: 1, marginTop: '3rem', marginBottom: '5rem' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '4rem' }}>
          
          {/* Left: Text Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            style={{ flex: '1 1 500px' }}
          >
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              <span style={{ background: `${accentColor}15`, color: accentColor, padding: '0.5rem 1.2rem', borderRadius: '30px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <GraduationCap size={18} /> {course.type}
              </span>
              <span style={{ background: 'var(--bg-card)', border: '1px solid var(--glass-border)', color: 'var(--text-secondary)', padding: '0.5rem 1.2rem', borderRadius: '30px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Clock size={18} /> {course.duration}
              </span>
            </div>
            
            <h1 style={{ fontSize: '3.5rem', color: 'var(--text-primary)', marginBottom: '1.5rem', lineHeight: 1.1 }}>
              {course.name}
            </h1>
            
            <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: 1.7, marginBottom: '2.5rem' }}>
              {details.description}
            </p>
            
            <button style={{ 
              padding: '1rem 2.5rem', 
              background: accentColor, 
              color: 'white', 
              border: 'none', 
              borderRadius: '30px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: `0 10px 25px ${accentColor}40`,
              display: 'flex',
              alignItems: 'center',
              gap: '0.8rem',
              transition: 'transform 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.transform = 'translateY(-3px)'}
            onMouseOut={(e) => e.currentTarget.style.transform = 'translateY(0)'}>
              Apply for Admission <ArrowLeft size={18} style={{ transform: 'rotate(180deg)' }} />
            </button>
          </motion.div>

          {/* Right: Floating 3D Image */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, rotateY: 15 }} 
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            style={{ flex: '1 1 400px', display: 'flex', justifyContent: 'center' }}
          >
            <div style={{ 
              position: 'relative', 
              width: '100%', 
              maxWidth: '500px', 
              aspectRatio: '1/1', 
              borderRadius: '30px', 
              overflow: 'hidden',
              boxShadow: `0 30px 60px rgba(0,0,0,0.1), 0 0 0 10px rgba(255,255,255,0.5)`,
              border: '1px solid rgba(255,255,255,0.8)'
            }}>
              <img src={imagePath} alt={course.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to top right, ${accentColor}40, transparent)` }} />
            </div>
          </motion.div>
          
        </div>
      </div>

      {/* Details Grid */}
      <div className="container" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
          
          {/* Eligibility Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="glass-panel" 
            style={{ padding: '2.5rem', borderRadius: '24px', borderTop: `4px solid ${accentColor}` }}
          >
            <div style={{ width: '50px', height: '50px', background: `${accentColor}15`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: accentColor }}>
              <Target size={24} />
            </div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Eligibility</h3>
            <p style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{details.eligibility}</p>
          </motion.div>

          {/* Syllabus Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
            className="glass-panel" 
            style={{ padding: '2.5rem', borderRadius: '24px', borderTop: `4px solid ${accentColor}` }}
          >
            <div style={{ width: '50px', height: '50px', background: `${accentColor}15`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: accentColor }}>
              <FileText size={24} />
            </div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Core Syllabus</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {details.syllabus.map((item, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--text-secondary)' }}>
                  <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: accentColor }} /> {item}
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Career Opportunities Card */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}
            className="glass-panel" 
            style={{ padding: '2.5rem', borderRadius: '24px', borderTop: `4px solid ${accentColor}` }}
          >
            <div style={{ width: '50px', height: '50px', background: `${accentColor}15`, borderRadius: '12px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1.5rem', color: accentColor }}>
              <Briefcase size={24} />
            </div>
            <h3 style={{ fontSize: '1.4rem', marginBottom: '1rem', color: 'var(--text-primary)' }}>Career Prospects</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
              {details.careers.map((career, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', color: 'var(--text-secondary)' }}>
                  <CheckCircle color={accentColor} size={18} /> {career}
                </li>
              ))}
            </ul>
          </motion.div>
          
        </div>
      </div>
    </motion.div>
  );
}

export default CoursePage;
