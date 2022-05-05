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
            allowNull: false,
            unique: 'compositeIndex'
        },
        type: {
            type: DataTypes.ENUM("BRONZE", "SILVER", "GOLD"),
            allowNull: false,
            unique: 'compositeIndex'
        },
        awarded_on: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: "badge",
        timestamps: false
    });

    Badge.associate = models => {
        Badge.belongsTo(models.User, {
            foreignKey: {
                allowNull: false,
                name: "user_id",
                unique: 'compositeIndex'
            }
        });
    };

    return Badge;
}