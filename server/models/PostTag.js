module.exports = (sequelize,DataTypes)  =>{
    const PostTag = sequelize.define("PostTag",{
        
    },{
        createdAt:false,
        updatedAt:false
    });

    PostTag.associate = models => {
        PostTag.belongsTo(models.Post,{
            foreignKey : {
                allowNull: false,
                name : "PostID"
            }
        }),
        PostTag.belongsTo(models.Tag,{
            foreignKey : {
                allowNull: false,
                name : "TagID"
            }
        })
    }
    return PostTag;
}