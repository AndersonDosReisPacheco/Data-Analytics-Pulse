const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'info', 'warn', 'error'] : ['error']
});

const connectDB = async () => {
  try {
    await prisma.$connect();
    console.log(' Prisma connected to PostgreSQL database');

    // Testar conexão com uma query simples
    await prisma.$queryRaw`SELECT 1`;
    console.log(' Database connection test successful');

  } catch (error) {
    console.error(' Prisma connection error:', error.message);
    console.error('Dica: Verifique se:');
    console.error('1. PostgreSQL está rodando (sudo service postgresql start)');
    console.error('2. Banco de dados existe');
    console.error('3. Usuário/senha estão corretos no .env');
    process.exit(1);
  }
};

module.exports = { prisma, connectDB };
