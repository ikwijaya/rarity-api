const { DataTypes, Sequelize } = require('sequelize');
const { DB_SCHEMA } = process.env

module.exports = (sq) => {
  sq.define('project', {
    project_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    base_image_url: { type: DataTypes.STRING },
    base_crypto: { type: DataTypes.STRING },
    address: { type: DataTypes.STRING },
    public_address: { type: DataTypes.STRING },
    name: { type: DataTypes.STRING },
    desc: { type: DataTypes.TEXT },
    launch_date: { type: DataTypes.TEXT },
    dcreate: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW
    },
    ucreate: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: -1
    },
    dmodified: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    umodified: {
      type: DataTypes.BIGINT,
    },
    record_status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'A'
    }
  }, {
    schema: DB_SCHEMA,
    freezeTableName: true,
    timestamps: false,
  });
}