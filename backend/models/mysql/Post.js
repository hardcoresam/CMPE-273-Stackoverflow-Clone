module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define("Post", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        owner_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        type: {
            type: DataTypes.ENUM("QUESTION", "ANSWER"),
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM("ACTIVE", "PENDING"),
            allowNull: false
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        body: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tags: {
            type: DataTypes.STRING,
            allowNull: false,
            get() {
                return this.getDataValue('tags').split(',')
            },
            set(val) {
                this.setDataValue('tags', val.join(','));
            },
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        views_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        parent_id: {
            type: DataTypes.INTEGER
        },
        answers_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        accepted_answer_id: {
            type: DataTypes.INTEGER
        },
        created_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            get() {
                return this.getDataValue('created_date').toLocaleString('en-GB', { timeZone: 'UTC' });
            }
        },
        modified_date: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
            get() {
                return this.getDataValue('modified_date').toLocaleString('en-GB', { timeZone: 'UTC' });
            }
        }
    }, {
        tableName: "post",
        timestamps: false
    });
    Post.associate = models => {
        models.User.hasMany(models.Post, {
            foreignKey: {
                name: "USER_ID"
            }
        })
        models.Post.hasMany(models.Post, {
            foreignKey: {
                name: "ParentID"
            }
        })
    }
    return Post;
}