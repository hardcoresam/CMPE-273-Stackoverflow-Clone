module.exports = (sequelize,DataTypes)  =>{
    const User = sequelize.define("User",{
        Title :{
            type : DataTypes.STRING,
            allowNull : false
        },
        Email : {
            type : DataTypes.STRING,
            allowNull : false
        },
        Password : {
            type : DataTypes.STRING,
            allowNull : false
        },
        Content : {
            type : DataTypes.STRING,
            allowNull : false
        },
        First_Name : {
            type : DataTypes.STRING,
            allowNull : false
        },
        Last_Name : {
            type : DataTypes.STRING,
            allowNull : false
        },
        Profile_Img : {
            type : DataTypes.STRING,
            allowNull : false
        },
        Questions_Count  : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        Answers_Count : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        Reputation_Score  : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        Reach : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        Gold_Badges  : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        Silver_Badges : {
            type : DataTypes.INTEGER,
            allowNull : false
        },
        Bronze_Badges  : {
            type : DataTypes.INTEGER,
            allowNull : false
        }     
    },{
        updatedAt:false
    });
    return User;
}