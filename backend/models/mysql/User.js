module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        photo: {
            type: DataTypes.STRING
        },
        about: {
            type: DataTypes.STRING
        },
        is_admin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        reputation: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 1
        },
        location: {
            type: DataTypes.STRING
        },
        registered_on: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        last_login_time: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },
        gold_badges_count: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0
        },
        silver_badges_count: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0
        },
        bronze_badges_count: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0
        }
    }, {
        tableName: "user",
        timestamps: false
    });
    
    User.associate = models => {
        User.hasMany(models.Badge, {
            foreignKey: {
                allowNull: false,
                name: "user_id"
            }
        }),
            User.hasMany(models.Post, {
                foreignKey: {
                    allowNull: false,
                    name: "owner_id"
                }
            }),
            User.hasMany(models.Bookmark, {
                foreignKey: {
                    allowNull: false,
                    name: "user_id"
                }
            });
    };

    return User;
}