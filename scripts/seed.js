/**
 * Database Seeding Script
 *
 * Populates the database with initial data.
 * Admin credentials are loaded from environment variables.
 *
 * Usage: npm run db:seed
 *
 * IMPORTANT: Set ADMIN_USERNAME and ADMIN_PASSWORD in .env.local before running!
 */

require('dotenv').config({ path: '.env.local' });

const { dbHelpers, getDatabase } = require('../lib/db');
const bcrypt = require('bcryptjs');

// Load admin credentials from environment
const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

console.log('Starting database seeding...\n');

// Validate environment variables
if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
  console.error('ERROR: Admin credentials not found in environment variables!');
  console.error('');
  console.error('Please create a .env.local file with:');
  console.error('  ADMIN_USERNAME=your-admin-email@example.com');
  console.error('  ADMIN_PASSWORD=your-secure-password');
  console.error('');
  console.error('You can copy .env.example to .env.local and fill in the values.');
  process.exit(1);
}

// Validate password strength
if (ADMIN_PASSWORD.length < 8) {
  console.error('ERROR: Admin password must be at least 8 characters long!');
  process.exit(1);
}

try {
  // ===========================================
  // SEED PROJECTS
  // ===========================================
  const existingProjects = dbHelpers.getAllProjects();

  if (existingProjects.length === 0) {
    console.log('Adding sample projects...');

    const projects = [
      {
        title_en: 'E-commerce Platform for Fashion Brand',
        title_tr: 'Moda Markasi icin E-ticaret Platformu',
        description_en: 'A modern, responsive e-commerce platform built for a luxury fashion brand. Features include product filtering, shopping cart, payment integration, and user accounts.',
        description_tr: 'Luks bir moda markasi icin tasarlanmis modern, responsive e-ticaret platformu. Urun filtreleme, alisveris sepeti, odeme entegrasyonu ve kullanici hesaplari icerir.',
        slug: 'fashion-ecommerce-platform',
        hero_image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop',
        gallery_images: [
          'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
        ],
        technologies: ['Next.js', 'React', 'Stripe', 'TailwindCSS', 'Node.js'],
        client_name: 'Luxury Fashion Co.',
        client_info: 'Leading fashion brand in Europe',
        timeline: '3 months',
        featured: 1,
      },
      {
        title_en: 'Restaurant Booking System',
        title_tr: 'Restoran Rezervasyon Sistemi',
        description_en: 'A comprehensive booking and menu management system for restaurants. Features real-time table availability and online reservations.',
        description_tr: 'Restoranlar icin kapsamli rezervasyon ve menu yonetim sistemi. Gercek zamanli masa musaitligi ve online rezervasyonlar icerir.',
        slug: 'restaurant-booking-system',
        hero_image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=600&fit=crop',
        gallery_images: [
          'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop',
        ],
        technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io'],
        client_name: 'Gourmet Bistro Chain',
        client_info: 'Premium restaurant group',
        timeline: '4 months',
        featured: 1,
      },
      {
        title_en: 'Real Estate Listing Platform',
        title_tr: 'Emlak Ilan Platformu',
        description_en: 'A powerful real estate platform with advanced search filters, virtual tours, and agent dashboard.',
        description_tr: 'Gelismis arama filtreleri, sanal turlar ve danisman paneli iceren guclu bir emlak platformu.',
        slug: 'real-estate-platform',
        hero_image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=600&fit=crop',
        gallery_images: [
          'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop',
        ],
        technologies: ['Next.js', 'PostgreSQL', 'Mapbox', 'AWS S3'],
        client_name: 'Prime Properties Group',
        client_info: 'International real estate company',
        timeline: '5 months',
        featured: 1,
      },
    ];

    projects.forEach((project) => {
      dbHelpers.createProject(project);
      console.log(`  + Added project: ${project.title_en}`);
    });
  } else {
    console.log(`Skipping projects (${existingProjects.length} already exist)`);
  }

  // ===========================================
  // SEED TESTIMONIALS
  // ===========================================
  const existingTestimonials = dbHelpers.getAllTestimonials();

  if (existingTestimonials.length === 0) {
    console.log('\nAdding sample testimonials...');

    const testimonials = [
      {
        name: 'Sarah J.',
        company: 'Luxury Fashion Co.',
        position: 'CEO',
        content_en: 'Working with Luma Studios was an absolute pleasure. They transformed our vision into a stunning e-commerce platform.',
        content_tr: 'Luma Studios ile calismak mutlak bir zevkti. Vizyonumuzu muhtesem bir e-ticaret platformuna donusturduler.',
        image_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
        rating: 5,
        featured: 1,
      },
      {
        name: 'Michael C.',
        company: 'Gourmet Bistro Chain',
        position: 'Operations Director',
        content_en: 'The restaurant booking system they built for us is incredible. Intuitive, reliable, and our customers love it.',
        content_tr: 'Bizim icin olusturduklar\u0131 restoran rezervasyon sistemi inanilmaz. Sezgisel, guvenilir ve musterilerimiz bunu cok seviyor.',
        image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
        rating: 5,
        featured: 1,
      },
      {
        name: 'Emily R.',
        company: 'Prime Properties Group',
        position: 'Marketing Manager',
        content_en: 'Our new real estate platform is a game-changer. Highly recommend Luma Studios!',
        content_tr: 'Yeni emlak platformumuz oyunu degistirdi. Luma Studios\'u siddetle tavsiye ediyorum!',
        image_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
        rating: 5,
        featured: 1,
      },
    ];

    testimonials.forEach((testimonial) => {
      dbHelpers.createTestimonial(testimonial);
      console.log(`  + Added testimonial from: ${testimonial.name}`);
    });
  } else {
    console.log(`Skipping testimonials (${existingTestimonials.length} already exist)`);
  }

  // ===========================================
  // SEED STATISTICS
  // ===========================================
  const existingStatistics = dbHelpers.getAllStatistics();

  if (existingStatistics.length < 4) {
    console.log('\nUpdating statistics...');

    const db = getDatabase();
    db.prepare('DELETE FROM statistics').run();

    const insertStat = db.prepare(`
      INSERT INTO statistics (label_en, label_tr, value, icon, order_index)
      VALUES (?, ?, ?, ?, ?)
    `);

    const stats = [
      ['Happy Clients', 'Mutlu Musteri', 150, null, 0],
      ['Projects Completed', 'Tamamlanan Proje', 200, null, 1],
      ['Years of Experience', 'Yillik Deneyim', 5, null, 2],
      ['Team Members', 'Ekip Uyesi', 15, null, 3],
    ];

    stats.forEach(([labelEn, labelTr, value, icon, order]) => {
      insertStat.run(labelEn, labelTr, value, icon, order);
      console.log(`  + Added statistic: ${labelEn}`);
    });
  } else {
    console.log(`Skipping statistics (${existingStatistics.length} already exist)`);
  }

  // ===========================================
  // SETUP ADMIN USER
  // ===========================================
  console.log('\nSetting up admin user...');

  const db = getDatabase();

  // Check if admin already exists
  const existingAdmin = db.prepare('SELECT * FROM admin_users WHERE username = ?').get(ADMIN_USERNAME);

  if (existingAdmin) {
    console.log(`  Admin user already exists: ${ADMIN_USERNAME}`);
    console.log('  To update password, delete the user manually first.');
  } else {
    // Delete any old admin users
    db.prepare('DELETE FROM admin_users').run();

    // Create new admin user with secure password
    const passwordHash = bcrypt.hashSync(ADMIN_PASSWORD, 12); // Higher cost factor
    db.prepare('INSERT INTO admin_users (username, password_hash) VALUES (?, ?)').run(
      ADMIN_USERNAME,
      passwordHash
    );

    console.log(`  + Admin user created: ${ADMIN_USERNAME}`);
    console.log('  + Password: [HIDDEN - check your .env.local file]');
  }

  // ===========================================
  // SUCCESS
  // ===========================================
  console.log('\n========================================');
  console.log('Database seeding completed successfully!');
  console.log('========================================');
  console.log('\nNext steps:');
  console.log('  1. Run: npm run dev');
  console.log('  2. Visit: http://localhost:3000/admin');
  console.log(`  3. Login with: ${ADMIN_USERNAME}`);
  console.log('');
} catch (error) {
  console.error('\nERROR: Database seeding failed!');
  console.error(error.message);
  process.exit(1);
}
