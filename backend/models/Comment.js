module.exports = (sequelize,DataTypes)  =>{
    const Comment = sequelize.define("Comment",{
        Content :{
            type : DataTypes.STRING,
            allowNull : false
        }
    },{
        updatedAt:false
    });
    Comment.associate = models => {
        Comment.belongsTo(models.Post,{
            foreignKey : {
                allowNull: false,
                name : "PostID"
            }
        }),
        Comment.belongsTo(models.User,{
            foreignKey : {
                allowNull: false,
                name : "UserID"
            }
        })
    }
    return Comment;
}