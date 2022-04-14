module.exports = (sequelize,DataTypes)  =>{
    const Tag = sequelize.define("Tag",{
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
        }   
    },{
        updatedAt:false
    });
    Tag.associate = models => {
        Tag.belongsToMany(models.Post,{
            through: models.PostTag,
            foreignKey : 'PostID',
            timestamps: false
        })
    }
    return Tag;
}