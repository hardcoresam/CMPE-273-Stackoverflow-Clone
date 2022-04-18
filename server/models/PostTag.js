module.exports = (sequelize)  =>{
    const PostTag = sequelize.define("PostTag",{
        
    },{
        createdAt:false,
        updatedAt:false
    });

    PostTag.associate = models => {
        models.Post.belongsToMany(models.Tag,{
            through: models.PostTag
        }),
        models.Tag.belongsToMany(models.Post,{
            through: models.PostTag
        })
    }
    return PostTag;
}