module.exports = (sequelize, DataTypes) => {
    const Vote = sequelize.define("Vote", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        type: {
            type: DataTypes.ENUM("UPVOTE", "DOWNVOTE"),
            allowNull: false
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
        tableName: "vote",
        timestamps: false
    });
    return Vote;
}