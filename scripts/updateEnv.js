const os = require('os');
const fs = require('fs');
const path = require('path');

function getLocalIP() {
  const interfaces = os.networkInterfaces();
  for (const iface of Object.values(interfaces)) {
    for (const config of iface) {
      if (config.family === 'IPv4' && !config.internal) {
        return config.address;
      }
    }
  }
  throw new Error('IP local não encontrado');
}

function updateEnvFile(filePath, key, value) {
  let content = '';
  if (fs.existsSync(filePath)) {
    content = fs.readFileSync(filePath, 'utf8');
    const lines = content
      .split('\n')
      .filter(line => !line.startsWith(key + '='));
    lines.push(`${key}=${value}`);
    content = lines.join('\n');
  } else {
    content = `${key}=${value}`;
  }
  fs.writeFileSync(filePath, content.trim() + '\n', 'utf8');
  console.log(`✅ Atualizado ${key} em ${filePath}`);
}

try {
  const ip = getLocalIP();

  // Assume que o script está sendo executado dentro de frontend ou backend
  const projectRoot = path.resolve(process.cwd(), '..');

  // Caminhos absolutos
  const frontendEnv = path.join(projectRoot, 'frontend', '.env');
  const backendEnv = path.join(projectRoot, 'backend', '.env');

  // Atualiza .env do front-end (React Native / Expo)
  updateEnvFile(frontendEnv, 'EXPO_PUBLIC_API_URL', `http://${ip}:5000/api`);

  // Atualiza .env do back-end (Node.js)
  updateEnvFile(backendEnv, 'PORT', '5000');
  updateEnvFile(backendEnv, 'MONGO_URI', 'mongodb://127.0.0.1:27017/meuBanco'); // fixo

  console.log(`🌐 IP local atual: ${ip}`);
} catch (err) {
  console.error('Erro ao atualizar .env:', err.message);
}
