const { DataTypes } = require('sequelize');
const sequelize = require('../../config/sequelize');

const Post = sequelize.define('Post', {
    postid: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        field: 'post_id',
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    category: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    decription: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    detail: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    timestamps: true,
    tableName: 'Posts',
});

module.exports = Post;