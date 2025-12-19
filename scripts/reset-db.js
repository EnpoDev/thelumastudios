const fs = require('fs');
const path = require('path');

console.log('⚠️  WARNING: This will delete all database data!\n');

const dbPath = path.join(process.cwd(), 'database.sqlite');

try {
  if (fs.existsSync(dbPath)) {
    fs.unlinkSync(dbPath);
    console.log('✅ Database file deleted\n');
    console.log('📝 Next steps:');
    console.log('  1. Run "npm run db:init" to create tables');
    console.log('  2. Run "npm run db:seed" to populate with sample data\n');
  } else {
    console.log('ℹ️  Database file does not exist\n');
  }
} catch (error) {
  console.error('❌ Error deleting database:', error);
  process.exit(1);
}
