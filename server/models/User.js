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
            allowNull : true,
            defaultValue: ''
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
            defaultValue: ''
        },
        Questions_Count  : {
            type : DataTypes.INTEGER,
            defaultValue: 0
        },
        Answers_Count : {
            type : DataTypes.INTEGER,
            defaultValue: 0
        },
        Reputation_Score  : {
            type : DataTypes.INTEGER,
            defaultValue: 0
        },
        Reach : {
            type : DataTypes.INTEGER,
            defaultValue: 0
        },
        Gold_Badges  : {
            type : DataTypes.INTEGER,
            defaultValue: 0
        },
        Silver_Badges : {
            type : DataTypes.INTEGER,
            defaultValue: 0
        },
        Bronze_Badges  : {
            type : DataTypes.INTEGER,
            defaultValue: 0
        }     
    },{
        updatedAt:false
    });
    return User;
}