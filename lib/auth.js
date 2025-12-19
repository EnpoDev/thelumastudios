const bcrypt = require('bcryptjs');
const { dbHelpers } = require('./db');

function verifyPassword(password, hash) {
  return bcrypt.compareSync(password, hash);
}

function hashPassword(password) {
  return bcrypt.hashSync(password, 10);
}

function authenticateAdmin(username, password) {
  const admin = dbHelpers.getAdminByUsername(username);
  if (!admin) {
    return null;
  }
  
  if (verifyPassword(password, admin.password_hash)) {
    return { id: admin.id, username: admin.username };
  }
  
  return null;
}

module.exports = {
  verifyPassword,
  hashPassword,
  authenticateAdmin
};

