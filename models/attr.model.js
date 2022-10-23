const { DataTypes, Sequelize } = require('sequelize');
const { DB_SCHEMA } = process.env

module.exports = (sq) => {
  sq.define('attr', {
    attr_id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    token_id: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    key: { type: DataTypes.STRING },
    value: { type: DataTypes.STRING },
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