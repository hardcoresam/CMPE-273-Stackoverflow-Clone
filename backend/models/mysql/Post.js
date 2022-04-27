module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define("Post", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
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
            }
            // set(val) {
            //     this.setDataValue('tags', val.join(','));
            // },
        },
        score: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0
        },
        views_count: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: false,
            defaultValue: 0
        },
        parent_id: {
            type: DataTypes.INTEGER
        },
        answers_count: {
            type: DataTypes.INTEGER.UNSIGNED,
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
        Post.belongsTo(models.User, {
            foreignKey: {
                allowNull: false,
                name: "owner_id"
            }
        }),
        Post.belongsTo(models.Post, {
            foreignKey: "parent_id",
            as: "question"
        }),
        Post.hasMany(models.Post, {
            foreignKey: "parent_id",
            as: "answers"
        }),
        Post.belongsTo(models.Post, {
            foreignKey: "accepted_answer_id",
            as: "accepted_answer"
        }),
        Post.belongsToMany(models.Tag, {
            through: models.PostTag, 
            foreignKey: 'post_id',
            timestamps: false
        }),
        Post.hasMany(models.Comment, {
            foreignKey: {
                allowNull: false,
                name: "post_id"
            }
        });
    };

    return Post;
}