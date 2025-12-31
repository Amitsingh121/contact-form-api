const { projects } = require('./projects.config');

// Collect all allowed origins from project configs
const getAllowedOrigins = () => {
  const origins = new Set();
  
  // Add origins from each project
  Object.values(projects).forEach(project => {
    if (project.allowedOrigins) {
      project.allowedOrigins.forEach(origin => origins.add(origin));
    }
  });
  
  // Add any additional origins from environment
  if (process.env.ALLOWED_ORIGINS) {
    process.env.ALLOWED_ORIGINS.split(',').forEach(origin => {
      origins.add(origin.trim());
    });
  }
  
  // Allow localhost in development
  if (process.env.NODE_ENV !== 'production') {
    // origins.add('http://localhost:3000');
    // origins.add('http://localhost:5173');
    // origins.add('http://127.0.0.1:3000');
    // origins.add('http://127.0.0.1:5500');
  }
  
  return Array.from(origins);
};

const corsOptions = {
  origin: (origin, callback) => {
    const allowedOrigins = getAllowedOrigins();
    
 
    if (!origin) {
      return callback(null, true);
    }
    
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`🚫 CORS blocked request from: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: 200 
};

module.exports = { corsOptions, getAllowedOrigins };
