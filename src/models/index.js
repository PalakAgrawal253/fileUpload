import { Sequelize, DataTypes } from 'sequelize';
import { config } from 'dotenv';

config();

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: false,
});

const User = sequelize.define('User', {
  email: { type: DataTypes.STRING, unique: true, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
});

const File = sequelize.define('File', {
  user_id: DataTypes.INTEGER,
  original_filename: DataTypes.STRING,
  storage_path: DataTypes.STRING,
  title: DataTypes.STRING,
  description: DataTypes.TEXT,
  status: {
    type: DataTypes.ENUM('uploaded', 'processing', 'processed', 'failed'),
    defaultValue: 'uploaded',
  },
  extracted_data: DataTypes.TEXT,
});

User.hasMany(File, { foreignKey: 'user_id' });
File.belongsTo(User, { foreignKey: 'user_id' });

export { sequelize, User, File };
