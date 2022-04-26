module.exports = (sequelize, DataTypes) => {
    const Tag = sequelize.define("Tag", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        admin_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        created_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            get() {
                return this.getDataValue('created_date').toLocaleString('en-GB', { timeZone: 'UTC' });
            }
        }
    }, {
        tableName: "tag",
        timestamps: false
    });
    return Tag;
}