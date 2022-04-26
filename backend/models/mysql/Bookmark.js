module.exports = (sequelize, DataTypes) => {
    const Bookmark = sequelize.define("Bookmark", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        created_on: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            get() {
                return this.getDataValue('created_on').toLocaleString('en-GB', { timeZone: 'UTC' });
            }
        }
    }, {
        tableName: "bookmark",
        timestamps: false
    });

    Bookmark.associate = models => {
        Bookmark.belongsTo(models.Post, {
            foreignKey: {
                allowNull: false,
                name: "post_id"
            }
        }),
        Bookmark.belongsTo(models.User, {
            foreignKey: {
                allowNull: false,
                name: "user_id"
            }
        });
    };

    return Bookmark;
}