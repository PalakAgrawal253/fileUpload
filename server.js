import { config } from 'dotenv';
import app from './app.js';
import { sequelize } from './src/models/index.js';

config(); 

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
