// scripts/createUser.js

import { config } from 'dotenv';
config(); // Load env vars

import bcrypt from 'bcrypt';
import { sequelize } from '../src/models/index.js';
import { User } from '../src/models/index.js'; 

const createUser = async () => {
  const email = 'palak@example.com';
  const plainPassword = 'palak123';
  const hashedPassword = await bcrypt.hash(plainPassword, 10);

  try {
    await sequelize.authenticate();
    console.log('DB connected.');

    const existing = await User.findOne({ where: { email } });
    if (existing) {
      console.log('User already exists.');
      process.exit(0);
    }

    const user = await User.create({
      email,
      password: hashedPassword,
    });

    console.log('User created:', user.email);
  } catch (err) {
    console.error('Error creating user:', err);
  } finally {
    await sequelize.close();
    process.exit(0);
  }
};

createUser();
