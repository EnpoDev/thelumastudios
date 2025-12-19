# Database Migration & Seeding Guide

## Available Commands

### 1. Initialize Database
Creates all database tables from scratch.

```bash
npm run db:init
```

This command creates the following tables:
- `projects` - Portfolio projects
- `testimonials` - Client testimonials
- `statistics` - Homepage statistics
- `admin_users` - Admin panel users
- `price_features` - Price calculator features
- `settings` - Site settings
- `contacts` - Contact form submissions

### 2. Seed Database
Populates the database with sample data.

```bash
npm run db:seed
```

This command adds:
- 4 sample projects
- 5 testimonials
- 4 statistics (can be modified via SQL)
- 1 admin user (username: `admin`, password: `admin123`)
- 8 price features

### 3. Reset Database
⚠️ **DANGER**: Deletes the entire database file.

```bash
npm run db:reset
```

Use this command to start fresh. After running this:
1. Run `npm run db:init` to recreate tables
2. Run `npm run db:seed` to add sample data

## Fresh Installation

For a complete fresh start:

```bash
# 1. Reset database (deletes everything)
npm run db:reset

# 2. Initialize tables
npm run db:init

# 3. Seed sample data
npm run db:seed

# 4. Start development server
npm run dev
```

## Manual Database Operations

### View Tables
```bash
sqlite3 database.sqlite ".tables"
```

### View Table Schema
```bash
sqlite3 database.sqlite ".schema projects"
```

### View All Data
```bash
sqlite3 database.sqlite "SELECT * FROM projects;"
sqlite3 database.sqlite "SELECT * FROM contacts;"
sqlite3 database.sqlite "SELECT * FROM statistics;"
```

### Add Data Manually
```bash
sqlite3 database.sqlite "INSERT INTO statistics (label_en, label_tr, value, icon, order_index) VALUES ('Awards Won', 'Kazanılan Ödüller', 25, '🏆', 4);"
```

### Update Data
```bash
sqlite3 database.sqlite "UPDATE statistics SET value = 300 WHERE id = 1;"
```

### Delete Data
```bash
sqlite3 database.sqlite "DELETE FROM contacts WHERE id = 1;"
```

## Database Location

The database file is located at:
```
/database.sqlite
```

**Note**: This file is gitignored and should NOT be committed to version control.

## Admin Access

Default admin credentials:
- **Username**: `admin`
- **Password**: `admin123`

⚠️ **IMPORTANT**: Change the admin password in production!

To change the password, you can:
1. Use the admin panel (when implemented)
2. Or manually update via SQL:

```bash
# First, generate a hash for your new password using bcrypt
# Then update the database
sqlite3 database.sqlite "UPDATE admin_users SET password_hash = 'your_bcrypt_hash' WHERE username = 'admin';"
```

## Troubleshooting

### Database Locked Error
If you get a "database is locked" error:
1. Stop the development server
2. Close any open database connections
3. Try the command again

### Table Already Exists
If you get "table already exists" errors:
- Run `npm run db:reset` to start fresh
- Or manually drop tables: `sqlite3 database.sqlite "DROP TABLE table_name;"`

### Missing Dependencies
If better-sqlite3 is not installed:
```bash
npm install better-sqlite3
```

## Production Deployment

For production environments:

1. **Do NOT** include `database.sqlite` in your repository
2. **Do** run `npm run db:init` on the production server
3. **Do** change the admin password immediately
4. Consider using a more robust database like PostgreSQL for production
5. Set up regular database backups

## Backup Database

To backup your database:
```bash
cp database.sqlite database.backup.sqlite
```

To restore from backup:
```bash
cp database.backup.sqlite database.sqlite
```
