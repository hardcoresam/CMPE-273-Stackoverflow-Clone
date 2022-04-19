module.exports = (sequelize,DataTypes)  =>{
    const Post = sequelize.define("BookMark",{
        USER_ID: {
            type: DataTypes.INTEGER,
            allowNull : false
        },
        Post_Type :{
            type : DataTypes.STRING,
            allowNull : false,
            defaultValue: "QUESTION"
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
            allowNull : false,
            defaultValue: 0
        },
        Downvotes_Count : {
            type : DataTypes.INTEGER,
            allowNull : false,
            defaultValue: 0
        },
        Img_Url : {
            type : DataTypes.STRING,
            allowNull : false
        },
        Views : {
            type : DataTypes.INTEGER,
            allowNull : false,
            defaultValue: 0
        },
        Bookmark_Status : {
            type : DataTypes.BOOLEAN,
            allowNull : false,
            defaultValue: false
        },
        Approved : {
            type : DataTypes.BOOLEAN,
            allowNull : false,
            defaultValue: false
        },
        ParentID : {
            type: DataTypes.INTEGER
        }      
    });
    Post.associate = models => {
        models.User.hasMany(models.Post, {
            foreignKey : {
                name : "USER_ID"
            }
        })
        models.Post.hasMany(models.Post, {
            foreignKey : {
                name : "ParentID"
            }
        })
    }
    return Post;
}