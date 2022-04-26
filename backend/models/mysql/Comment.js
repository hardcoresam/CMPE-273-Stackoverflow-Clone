module.exports = (sequelize, DataTypes) => {
    const Comment = sequelize.define("Comment", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        user_display_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        posted_on: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            get() {
                return this.getDataValue('posted_on').toLocaleString('en-GB', { timeZone: 'UTC' });
            }
        }
    }, {
        tableName: "comment",
        timestamps: false
    });
    return Comment;
}