module.exports = (sequelize,DataTypes)  =>{
    const Post = sequelize.define("Post",{
        Post_Type :{
            type : DataTypes.INTEGER,
            allowNull : false
        },
        Title : {
            type : DataTypes.STRING,
            allowNull : false
        },
        Content : {
            type : DataTypes.STRING,
            allowNull : false
        },
        Upvotes_Count : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        Downvotes_Count : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        Img_Url : {
            type : DataTypes.STRING,
            allowNull : false
        },
        Views : {
            type : DataTypes.STRING,
            allowNull : false
        },
        Bookmark_Status : {
            type : DataTypes.BOOLEAN,
            allowNull : false
        },
        Approved : {
            type : DataTypes.BOOLEAN,
            allowNull : false
        },

    },{
        updatedAt:false
    });
    Post.associate = models => {
        Post.belongsToMany(models.Tag,{
            through: models.PostTag,
            foreignKey : 'TagID',
            timestamps: false
        }),
        Post.belongsTo(models.Post,{
            foreignKey : {
                allowNull: false,
                name : "ParentID"
            }
        })
    }
    return Post;
}