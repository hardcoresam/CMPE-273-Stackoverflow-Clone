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
            unique: true,
            allowNull: false
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
            type: DataTypes.STRING,
            defaultValue: ''
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
            defaultValue: DataTypes.NOW,
            get() {
                return this.getDataValue('registered_on').toLocaleString('en-GB', { timeZone: 'UTC' });
            }
        },
        last_login_time: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            get() {
                return this.getDataValue('last_login_time').toLocaleString('en-GB', { timeZone: 'UTC' });
            }
        },
        gold_badges_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        silver_badges_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        bronze_badges_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        }
    }, {
        tableName: "user",
        timestamps: false
    });
    return User;
}