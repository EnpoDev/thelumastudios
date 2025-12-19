const { dbHelpers } = require('../lib/db');

console.log('Starting database seeding...');

try {
  // Check if projects already exist
  const existingProjects = dbHelpers.getAllProjects();
  
  if (existingProjects.length === 0) {
    console.log('Adding sample projects...');
    
    // Add sample projects with placeholder images
    const projects = [
      {
        title_en: 'E-commerce Platform for Fashion Brand',
        title_tr: 'Moda Markası için E-ticaret Platformu',
        description_en: 'A modern, responsive e-commerce platform built for a luxury fashion brand. Features include product filtering, shopping cart, payment integration, and user accounts. The platform increased their online sales by 250% within the first 3 months.',
        description_tr: 'Lüks bir moda markası için tasarlanmış modern, responsive e-ticaret platformu. Ürün filtreleme, alışveriş sepeti, ödeme entegrasyonu ve kullanıcı hesapları içerir. Platform ilk 3 ayda online satışlarını %250 artırdı.',
        slug: 'fashion-ecommerce-platform',
        hero_image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop',
        gallery_images: [
          'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=800&h=600&fit=crop'
        ],
        technologies: ['Next.js', 'React', 'Stripe', 'TailwindCSS', 'Node.js'],
        client_name: 'Luxury Fashion Co.',
        client_info: 'Leading fashion brand in Europe',
        timeline: '3 months',
        featured: 1
      },
      {
        title_en: 'Restaurant Booking & Menu System',
        title_tr: 'Restoran Rezervasyon ve Menü Sistemi',
        description_en: 'A comprehensive booking and menu management system for a chain of high-end restaurants. Features real-time table availability, online reservations, digital menu with allergen information, and customer reviews. Reduced no-shows by 40% and improved customer satisfaction.',
        description_tr: 'Üst düzey bir restoran zinciri için kapsamlı rezervasyon ve menü yönetim sistemi. Gerçek zamanlı masa müsaitliği, online rezervasyonlar, alerjen bilgisi içeren dijital menü ve müşteri yorumları içerir. No-show oranını %40 azalttı ve müşteri memnuniyetini artırdı.',
        slug: 'restaurant-booking-system',
        hero_image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&h=600&fit=crop',
        gallery_images: [
          'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1559329007-40df8a9345d8?w=800&h=600&fit=crop'
        ],
        technologies: ['React', 'Node.js', 'MongoDB', 'Socket.io', 'Material-UI'],
        client_name: 'Gourmet Bistro Chain',
        client_info: 'Premium restaurant group',
        timeline: '4 months',
        featured: 1
      },
      {
        title_en: 'Real Estate Listing Platform',
        title_tr: 'Emlak İlan Platformu',
        description_en: 'A powerful real estate platform with advanced search filters, virtual tours, mortgage calculator, and agent dashboard. The platform connects buyers, sellers, and agents seamlessly. Increased lead generation by 180% for partner agencies.',
        description_tr: 'Gelişmiş arama filtreleri, sanal turlar, mortgage hesaplayıcı ve danışman paneli içeren güçlü bir emlak platformu. Platform alıcıları, satıcıları ve danışmanları sorunsuz bir şekilde birleştirir. Partner acenteler için potansiyel müşteri oluşturmayı %180 artırdı.',
        slug: 'real-estate-platform',
        hero_image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200&h=600&fit=crop',
        gallery_images: [
          'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop'
        ],
        technologies: ['Next.js', 'PostgreSQL', 'Mapbox', 'AWS S3', 'Redux'],
        client_name: 'Prime Properties Group',
        client_info: 'International real estate company',
        timeline: '5 months',
        featured: 1
      },
      {
        title_en: 'Healthcare Appointment System',
        title_tr: 'Sağlık Randevu Sistemi',
        description_en: 'A HIPAA-compliant healthcare appointment system for a medical center. Features include online booking, patient records, telemedicine integration, and automated reminders. Reduced administrative workload by 60% and improved patient experience.',
        description_tr: 'Bir tıp merkezi için HIPAA uyumlu sağlık randevu sistemi. Online rezervasyon, hasta kayıtları, teletıp entegrasyonu ve otomatik hatırlatmalar içerir. İdari iş yükünü %60 azalttı ve hasta deneyimini iyileştirdi.',
        slug: 'healthcare-appointment-system',
        hero_image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=600&fit=crop',
        gallery_images: [
          'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=800&h=600&fit=crop',
          'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=800&h=600&fit=crop'
        ],
        technologies: ['React', 'Node.js', 'MySQL', 'WebRTC', 'HIPAA Security'],
        client_name: 'HealthFirst Medical Center',
        client_info: 'Multi-specialty healthcare provider',
        timeline: '6 months',
        featured: 0
      }
    ];
    
    projects.forEach(project => {
      dbHelpers.createProject(project);
      console.log(`✓ Added project: ${project.title_en}`);
    });
  } else {
    console.log(`${existingProjects.length} projects already exist, skipping...`);
  }
  
  // Check if testimonials already exist
  const existingTestimonials = dbHelpers.getAllTestimonials();
  
  if (existingTestimonials.length === 0) {
    console.log('\nAdding sample testimonials...');
    
    const testimonials = [
      {
        name: 'Sarah Johnson',
        company: 'Luxury Fashion Co.',
        position: 'CEO',
        content_en: 'Working with Luma Studios was an absolute pleasure. They transformed our vision into a stunning e-commerce platform that exceeded all expectations. Our online sales have tripled since launch!',
        content_tr: 'Luma Studios ile çalışmak mutlak bir zevkti. Vizyonumuzu tüm beklentileri aşan muhteşem bir e-ticaret platformuna dönüştürdüler. Lansmanımızdan bu yana online satışlarımız üç katına çıktı!',
        image_url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
        rating: 5,
        featured: 1
      },
      {
        name: 'Michael Chen',
        company: 'Gourmet Bistro Chain',
        position: 'Operations Director',
        content_en: "The restaurant booking system they built for us is incredible. It's intuitive, reliable, and our customers love it. The team was professional and delivered on time.",
        content_tr: 'Bizim için oluşturdukları restoran rezervasyon sistemi inanılmaz. Sezgisel, güvenilir ve müşterilerimiz bunu çok seviyor. Ekip profesyoneldi ve zamanında teslim etti.',
        image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop',
        rating: 5,
        featured: 1
      },
      {
        name: 'Emily Rodriguez',
        company: 'Prime Properties Group',
        position: 'Marketing Manager',
        content_en: 'Our new real estate platform is a game-changer. The virtual tour feature and advanced search capabilities have significantly increased our lead generation. Highly recommend Luma Studios!',
        content_tr: 'Yeni emlak platformumuz oyunu değiştirdi. Sanal tur özelliği ve gelişmiş arama yetenekleri potansiyel müşteri oluşturmamızı önemli ölçüde artırdı. Luma Studios\'u şiddetle tavsiye ediyorum!',
        image_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
        rating: 5,
        featured: 1
      },
      {
        name: 'Dr. James Wilson',
        company: 'HealthFirst Medical Center',
        position: 'Chief Medical Officer',
        content_en: "The healthcare appointment system has revolutionized our patient management. It's secure, efficient, and our patients appreciate the convenience of online booking.",
        content_tr: 'Sağlık randevu sistemi hasta yönetimimizde devrim yarattı. Güvenli, verimli ve hastalarımız online rezervasyon kolaylığını takdir ediyor.',
        image_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
        rating: 5,
        featured: 1
      },
      {
        name: 'Lisa Anderson',
        company: 'TechStart Inc.',
        position: 'Founder',
        content_en: 'Luma Studios helped us launch our startup website quickly and professionally. Their attention to detail and creative approach made all the difference.',
        content_tr: 'Luma Studios, startup web sitemizi hızlı ve profesyonel bir şekilde başlatmamıza yardımcı oldu. Detaylara verdikleri önem ve yaratıcı yaklaşımları fark yarattı.',
        image_url: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop',
        rating: 5,
        featured: 0
      }
    ];
    
    testimonials.forEach(testimonial => {
      dbHelpers.createTestimonial(testimonial);
      console.log(`✓ Added testimonial from: ${testimonial.name}`);
    });
  } else {
    console.log(`${existingTestimonials.length} testimonials already exist, skipping...`);
  }
  
  console.log('\n✅ Database seeding completed successfully!');
  console.log('\nYou can now run: npm run dev');
  
} catch (error) {
  console.error('Error seeding database:', error);
  process.exit(1);
}
