module.exports = (sequelize, DataTypes) => {
    const PostTag = sequelize.define("PostTag", {
        created_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            get() {
                return this.getDataValue('created_date').toLocaleString('en-GB', { timeZone: 'UTC' });
            }
        }
    }, {
        tableName: "posttag",
        timestamps: false
    });
    return PostTag;
}