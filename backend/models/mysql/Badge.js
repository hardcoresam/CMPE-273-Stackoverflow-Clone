module.exports = (sequelize, DataTypes) => {
    const Badge = sequelize.define("Badge", {
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
        type: {
            type: DataTypes.ENUM("BRONZE", "SILVER", "GOLD"),
            allowNull: false
        },
        awarded_on: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            get() {
                return this.getDataValue('awarded_on').toLocaleString('en-GB', { timeZone: 'UTC' });
            }
        }
    }, {
        tableName: "badge",
        timestamps: false
    });
    return Badge;
}