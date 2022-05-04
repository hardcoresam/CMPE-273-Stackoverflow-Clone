module.exports = (sequelize, DataTypes) => {
    const PostTag = sequelize.define("PostTag", {
        created_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    }, {
        tableName: "post_tag",
        timestamps: false
    });

    return PostTag;
}