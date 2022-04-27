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
            allowNull: false,
            unique:true
        },
        description: {
            type: DataTypes.STRING
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

    Tag.associate = models => {
        Tag.belongsTo(models.User, {
            foreignKey: {
                allowNull: false,
                name: "admin_id"
            }
        }),
        Tag.belongsToMany(models.Post, {
            through: models.PostTag,
            foreignKey: 'tag_id',
            timestamps: false
        });
    };

    return Tag;
}