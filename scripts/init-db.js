const Database = require('better-sqlite3');
const path = require('path');

console.log('🚀 Initializing database...\n');

try {
  const dbPath = path.join(process.cwd(), 'database.sqlite');
  const db = new Database(dbPath);

  // Enable foreign keys
  db.pragma('foreign_keys = ON');

  console.log('📦 Creating tables...\n');

  // Projects table
  db.exec(`
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
  console.log('✅ Projects table created');

  // Testimonials table
  db.exec(`
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
  console.log('✅ Testimonials table created');

  // Statistics table
  db.exec(`
    CREATE TABLE IF NOT EXISTS statistics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      label_en TEXT NOT NULL,
      label_tr TEXT NOT NULL,
      value INTEGER NOT NULL,
      icon TEXT,
      order_index INTEGER DEFAULT 0
    )
  `);
  console.log('✅ Statistics table created');

  // Admin users table
  db.exec(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
  console.log('✅ Admin users table created');

  // Price features table
  db.exec(`
    CREATE TABLE IF NOT EXISTS price_features (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name_en TEXT NOT NULL,
      name_tr TEXT NOT NULL,
      base_price REAL NOT NULL,
      category TEXT
    )
  `);
  console.log('✅ Price features table created');

  // Settings table
  db.exec(`
    CREATE TABLE IF NOT EXISTS settings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      key TEXT UNIQUE NOT NULL,
      value_en TEXT,
      value_tr TEXT
    )
  `);
  console.log('✅ Settings table created');

  // Contacts table
  db.exec(`
    CREATE TABLE IF NOT EXISTS contacts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      subject TEXT NOT NULL,
      message TEXT NOT NULL,
      created_at TEXT NOT NULL,
      status TEXT DEFAULT 'new'
    )
  `);
  console.log('✅ Contacts table created');

  db.close();

  console.log('\n✅ Database initialized successfully!');
  console.log('\n📝 Next step: Run "npm run db:seed" to populate the database with sample data\n');
} catch (error) {
  console.error('❌ Error initializing database:', error);
  process.exit(1);
}
