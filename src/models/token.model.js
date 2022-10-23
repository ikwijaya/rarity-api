const { DataTypes, Sequelize } = require('sequelize');
const { DB_SCHEMA } = process.env

module.exports = (sq) => {
  sq.define('token', {
    token_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    project_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    number: { type: DataTypes.STRING },
    name: { type: DataTypes.STRING },
    desc: { type: DataTypes.TEXT },
    image_url: { type: DataTypes.STRING },
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