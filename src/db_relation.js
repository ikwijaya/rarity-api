function relation(db){
    const {
        attr, project, token,
    } = db.models;

    project.hasMany(token, { foreignKey: { name: 'project_id', allowNull: false } })
    token.belongsTo(project, { foreignKey: { name: 'project_id', allowNull: false } })

    token.hasMany(attr, { foreignKey: { name: 'token_id', allowNull: false } })
    attr.belongsTo(token, { foreignKey: { name: 'token_id', allowNull: false } })
}

module.exports = { relation }