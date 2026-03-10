const express = require('express');
const router = express.Router();
const Post = require('../models/Post');
const User = require('../models/User');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const adminLayout = '../views/layouts/admin';
const jwtSecret = process.env.JWT_SECRET;


/* 
   AUTH MIDDLEWARE
*/

const authMiddleware = (req, res, next) => {

  const token = req.cookies.token;

  if (!token) {
    return res.redirect('/admin');
  }

  try {

    const decoded = jwt.verify(token, jwtSecret);
    req.userId = decoded.userId;

    next();

  } catch (error) {

    return res.redirect('/admin');

  }
};


/* 
   ADMIN LOGIN PAGE
*/

router.get('/admin', (req, res) => {

  const locals = {
    title: "Admin Login",
    description: "Simple Blog created with NodeJS, Express & MongoDB"
  };

  res.render('admin/index', { locals, layout: adminLayout });

});


/*
   ADMIN LOGIN
*/

router.post('/admin', async (req, res) => {

  try {

    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(401).send("Invalid username or password");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).send("Invalid username or password");
    }

    const token = jwt.sign(
      { userId: user._id },
      jwtSecret,
      { expiresIn: '1d' }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false
    });

    res.redirect('/dashboard');

  } catch (error) {

    console.log(error);
    res.status(500).send("Server Error");

  }

});


/*
   ADMIN DASHBOARD
*/

router.get('/dashboard', authMiddleware, async (req, res) => {

  try {

    const posts = await Post.find().sort({ createdAt: -1 });

    const locals = {
      title: "Dashboard",
      description: "Admin Dashboard"
    };

    res.render('admin/dashboard', {
      locals,
      data: posts,
      layout: adminLayout
    });

  } catch (error) {

    console.log(error);

  }

});


/*
   ADD POST PAGE
*/

router.get('/add-post', authMiddleware, (req, res) => {

  const locals = {
    title: "Add Post",
    description: "Create New Blog Post"
  };

  res.render('admin/add-post', {
    locals,
    layout: adminLayout
  });

});


/*
   CREATE POST
*/

router.post('/add-post', authMiddleware, async (req, res) => {

  try {

    const newPost = new Post({
      title: req.body.title,
      body: req.body.body
    });

    await Post.create(newPost);

    res.redirect('/dashboard');

  } catch (error) {

    console.log(error);

  }

});


/*
   EDIT POST PAGE
*/

router.get('/edit-post/:id', authMiddleware, async (req, res) => {

  try {

    const post = await Post.findById(req.params.id);

    const locals = {
      title: "Edit Post",
      description: "Edit Blog Post"
    };

    res.render('admin/edit-post', {
      locals,
      data: post,
      layout: adminLayout
    });

  } catch (error) {

    console.log(error);

  }

});


/*
   UPDATE POST
========================= */

router.post('/edit-post/:id', authMiddleware, async (req, res) => {

  try {

    await Post.findByIdAndUpdate(req.params.id, {
      title: req.body.title,
      body: req.body.body,
      updatedAt: Date.now()
    });

    res.redirect('/dashboard');

  } catch (error) {

    console.log(error);

  }

});


/* =========================
   DELETE POST
========================= */

router.post('/delete-post/:id', authMiddleware, async (req, res) => {

  try {

    await Post.deleteOne({ _id: req.params.id });

    res.redirect('/dashboard');

  } catch (error) {

    console.log(error);

  }

});


/* =========================
   REGISTER USER
========================= */

router.post('/register', async (req, res) => {

  try {

    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      password: hashedPassword
    });

    res.status(201).json({
      message: "User created",
      user
    });

  } catch (error) {

    if (error.code === 11000) {
      return res.status(409).json({
        message: "Username already exists"
      });
    }

    res.status(500).json({
      message: "Server error"
    });

  }

});


/* =========================
   LOGOUT
========================= */

router.get('/logout', (req, res) => {

  res.clearCookie('token');

  res.redirect('/');

});


module.exports = router;