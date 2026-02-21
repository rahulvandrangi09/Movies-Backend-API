import express from 'express';

const router = express.Router();


router.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the Movie API!'
  });
} );

router.get('/hello', (req, res) => {
  res.json({
    message: 'Hello, World!'
  });
});

export default router;