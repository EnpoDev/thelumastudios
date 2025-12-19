const Database = require('better-sqlite3');
const path = require('path');
const fs = require('fs');
const bcrypt = require('bcryptjs');

let db;
let dbInitialized = false;

// Initialize database connection
function getDatabase() {
  if (!db) {
    try {
      const dbPath = path.join(process.cwd(), 'database.sqlite');
      db = new Database(dbPath);
      // Enable foreign keys
      db.pragma('foreign_keys = ON');
    } catch (error) {
      console.error('Error initializing database:', error);
      throw error;
    }
  }
  return db;
}

// Initialize database schema
function initDatabase() {
  try {
    const database = getDatabase();
    // Projects table
    database.exec(`
    CREATE TABLE IF NOT EXISTS projects (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title_en TEXT NOT NULL,
      title_tr TEXT NOT NULL,
      description_en TEXT,
      description_tr TEXT,
      slug TEXT UNIQUE NOT NULL,
      hero_image TEXT,
      gallery_images TEXT,
      technologies TEXT,
      client_name TEXT,
      client_info TEXT,
      timeline TEXT,
      featured INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Testimonials table
  database.exec(`
    CREATE TABLE IF NOT EXISTS testimonials (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      company TEXT,
      position TEXT,
      content_en TEXT NOT NULL,
      content_tr TEXT NOT NULL,
      image_url TEXT,
      rating INTEGER DEFAULT 5,
      featured INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Statistics table
  database.exec(`
    CREATE TABLE IF NOT EXISTS statistics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      label_en TEXT NOT NULL,
      label_tr TEXT NOT NULL,
      value INTEGER NOT NULL,
      icon TEXT,
      order_index INTEGER DEFAULT 0
    )
  `);

  // Admin users table
  database.exec(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // Price features table
  database.exec(`
    CREATE TABLE IF NOT EXISTS price_features (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name_en TEXT NOT NULL,
      name_tr TEXT NOT NULL,
      base_price REAL NOT NULL,
      category TEXT
    )
  `);

  // Settings table
  database.exec(`
    CREATE TABLE IF NOT EXISTS settings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      key TEXT UNIQUE NOT NULL,
      value_en TEXT,
      value_tr TEXT
    )
  `);

  // Seed initial data if tables are empty
  const statsCount = database.prepare('SELECT COUNT(*) as count FROM statistics').get();
  if (statsCount.count === 0) {
    const insertStat = database.prepare(`
      INSERT INTO statistics (label_en, label_tr, value, icon, order_index) 
      VALUES (?, ?, ?, ?, ?)
    `);
    
    insertStat.run('Happy Clients', 'Mutlu Müşteri', 150, '👥', 0);
    insertStat.run('Projects Completed', 'Tamamlanan Proje', 200, '🎨', 1);
    insertStat.run('Years of Experience', 'Yıllık Deneyim', 5, '⭐', 2);
  }

  // Seed default admin user (password: admin123 - should be changed in production)
  const adminCount = database.prepare('SELECT COUNT(*) as count FROM admin_users').get();
  if (adminCount.count === 0) {
    const passwordHash = bcrypt.hashSync('admin123', 10);
    database.prepare('INSERT INTO admin_users (username, password_hash) VALUES (?, ?)')
      .run('admin', passwordHash);
  }

  // Seed price features
  const featuresCount = database.prepare('SELECT COUNT(*) as count FROM price_features').get();
  if (featuresCount.count === 0) {
    const insertFeature = database.prepare(`
      INSERT INTO price_features (name_en, name_tr, base_price, category) 
      VALUES (?, ?, ?, ?)
    `);
    
    insertFeature.run('Responsive Design', 'Responsive Tasarım', 500, 'design');
    insertFeature.run('E-commerce Integration', 'E-ticaret Entegrasyonu', 800, 'features');
    insertFeature.run('CMS Integration', 'CMS Entegrasyonu', 600, 'features');
    insertFeature.run('SEO Optimization', 'SEO Optimizasyonu', 400, 'features');
    insertFeature.run('Social Media Integration', 'Sosyal Medya Entegrasyonu', 300, 'features');
    insertFeature.run('Payment Gateway', 'Ödeme Gateway', 700, 'features');
    insertFeature.run('Multi-language Support', 'Çoklu Dil Desteği', 500, 'features');
    insertFeature.run('Custom Animations', 'Özel Animasyonlar', 400, 'design');
  }
  
  dbInitialized = true;
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

// Lazy initialization - will be called on first use
function ensureInitialized() {
  if (!dbInitialized) {
    initDatabase();
  }
}

// Helper functions
const dbHelpers = {
  // Projects
  getAllProjects: (featured = null) => {
    ensureInitialized();
    const database = getDatabase();
    if (featured !== null) {
      return database.prepare('SELECT * FROM projects WHERE featured = ? ORDER BY created_at DESC').all(featured ? 1 : 0);
    }
    return database.prepare('SELECT * FROM projects ORDER BY created_at DESC').all();
  },
  
  getProjectBySlug: (slug) => {
    ensureInitialized();
    const database = getDatabase();
    return database.prepare('SELECT * FROM projects WHERE slug = ?').get(slug);
  },
  
  createProject: (data) => {
    ensureInitialized();
    const database = getDatabase();
    const stmt = database.prepare(`
      INSERT INTO projects (
        title_en, title_tr, description_en, description_tr, slug, 
        hero_image, gallery_images, technologies, client_name, 
        client_info, timeline, featured
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);
    return stmt.run(
      data.title_en, data.title_tr, data.description_en, data.description_tr,
      data.slug, data.hero_image || null, 
      JSON.stringify(data.gallery_images || []),
      JSON.stringify(data.technologies || []),
      data.client_name || null, data.client_info || null,
      data.timeline || null, data.featured ? 1 : 0
    );
  },
  
  updateProject: (id, data) => {
    ensureInitialized();
    const database = getDatabase();
    const stmt = database.prepare(`
      UPDATE projects SET
        title_en = ?, title_tr = ?, description_en = ?, description_tr = ?,
        slug = ?, hero_image = ?, gallery_images = ?, technologies = ?,
        client_name = ?, client_info = ?, timeline = ?, featured = ?,
        updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `);
    return stmt.run(
      data.title_en, data.title_tr, data.description_en, data.description_tr,
      data.slug, data.hero_image || null,
      JSON.stringify(data.gallery_images || []),
      JSON.stringify(data.technologies || []),
      data.client_name || null, data.client_info || null,
      data.timeline || null, data.featured ? 1 : 0, id
    );
  },
  
  deleteProject: (id) => {
    ensureInitialized();
    const database = getDatabase();
    return database.prepare('DELETE FROM projects WHERE id = ?').run(id);
  },
  
  // Testimonials
  getAllTestimonials: (featured = null) => {
    ensureInitialized();
    const database = getDatabase();
    if (featured !== null) {
      return database.prepare('SELECT * FROM testimonials WHERE featured = ? ORDER BY created_at DESC').all(featured ? 1 : 0);
    }
    return database.prepare('SELECT * FROM testimonials ORDER BY created_at DESC').all();
  },
  
  createTestimonial: (data) => {
    ensureInitialized();
    const database = getDatabase();
    const stmt = database.prepare(`
      INSERT INTO testimonials (name, company, position, content_en, content_tr, image_url, rating, featured)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `);
    return stmt.run(
      data.name, data.company || null, data.position || null,
      data.content_en, data.content_tr, data.image_url || null,
      data.rating || 5, data.featured ? 1 : 0
    );
  },
  
  updateTestimonial: (id, data) => {
    ensureInitialized();
    const database = getDatabase();
    const stmt = database.prepare(`
      UPDATE testimonials SET
        name = ?, company = ?, position = ?, content_en = ?, content_tr = ?,
        image_url = ?, rating = ?, featured = ?
      WHERE id = ?
    `);
    return stmt.run(
      data.name, data.company || null, data.position || null,
      data.content_en, data.content_tr, data.image_url || null,
      data.rating || 5, data.featured ? 1 : 0, id
    );
  },
  
  deleteTestimonial: (id) => {
    ensureInitialized();
    const database = getDatabase();
    return database.prepare('DELETE FROM testimonials WHERE id = ?').run(id);
  },
  
  // Statistics
  getAllStatistics: () => {
    ensureInitialized();
    const database = getDatabase();
    return database.prepare('SELECT * FROM statistics ORDER BY order_index ASC').all();
  },
  
  updateStatistic: (id, data) => {
    ensureInitialized();
    const database = getDatabase();
    const stmt = database.prepare(`
      UPDATE statistics SET
        label_en = ?, label_tr = ?, value = ?, icon = ?, order_index = ?
      WHERE id = ?
    `);
    return stmt.run(
      data.label_en, data.label_tr, data.value, data.icon || null,
      data.order_index || 0, id
    );
  },
  
  // Admin
  getAdminByUsername: (username) => {
    ensureInitialized();
    const database = getDatabase();
    return database.prepare('SELECT * FROM admin_users WHERE username = ?').get(username);
  },
  
  // Price features
  getAllPriceFeatures: () => {
    ensureInitialized();
    const database = getDatabase();
    return database.prepare('SELECT * FROM price_features ORDER BY category, id').all();
  },
  
  calculatePrice: (featureIds) => {
    if (!featureIds || featureIds.length === 0) return { min: 0, max: 0 };
    
    ensureInitialized();
    const database = getDatabase();
    const placeholders = featureIds.map(() => '?').join(',');
    const features = database.prepare(`SELECT base_price FROM price_features WHERE id IN (${placeholders})`).all(...featureIds);
    
    const basePrice = features.reduce((sum, f) => sum + f.base_price, 0);
    // Add 20% margin for min, 50% for max
    return {
      min: Math.round(basePrice * 1.2),
      max: Math.round(basePrice * 1.5)
    };
  },

  // Contacts
  createContact: (data) => {
    ensureInitialized();
    const database = getDatabase();
    const stmt = database.prepare(`
      INSERT INTO contacts (name, email, phone, subject, message, created_at, status)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `);
    const result = stmt.run(
      data.name,
      data.email,
      data.phone || null,
      data.subject,
      data.message,
      data.created_at,
      data.status || 'new'
    );
    return result.lastInsertRowid;
  },

  getAllContacts: () => {
    ensureInitialized();
    const database = getDatabase();
    return database.prepare('SELECT * FROM contacts ORDER BY created_at DESC').all();
  },

  getContactById: (id) => {
    ensureInitialized();
    const database = getDatabase();
    return database.prepare('SELECT * FROM contacts WHERE id = ?').get(id);
  },

  updateContactStatus: (id, status) => {
    ensureInitialized();
    const database = getDatabase();
    return database.prepare('UPDATE contacts SET status = ? WHERE id = ?').run(status, id);
  },

  deleteContact: (id) => {
    ensureInitialized();
    const database = getDatabase();
    return database.prepare('DELETE FROM contacts WHERE id = ?').run(id);
  }
};

// Export getDatabase function and helpers
module.exports = { 
  getDatabase,
  dbHelpers 
};

