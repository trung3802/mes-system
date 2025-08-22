
module.exports = {
  apps: [
    { name: 'auth-service', cwd: './auth-service', script: 'server.js' },
    { name: 'user-service', cwd: './user-service', script: 'server.js' },
    { name: 'mec-service', cwd: './mec-service', script: 'server.js' },
    { name: 'hr-service', cwd: './hr-service', script: 'server.js' },
    { name: 'qa-service', cwd: './qa-service', script: 'server.js' },
    { name: 'cut-service', cwd: './cut-service', script: 'server.js' },
    { name: 'ie-service', cwd: './ie-service', script: 'server.js' },
    { name: 'it-service', cwd: './it-service', script: 'server.js' },
    { name: 'cron-service', cwd: './cron-service', script: 'server.js' },
    { name: 'gateway', cwd: './gateway', script: 'index.js' }
  ]
};
