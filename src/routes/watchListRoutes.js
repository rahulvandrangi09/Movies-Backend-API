import express from 'express';
import { addToWatchList, deleteWatchList, updateWatchlistItem } from '../controllers/watchListController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';
import { validateRequest } from '../middleware/validateRequest.js';
import { addToWatchListSchma } from '../validators/watchlistValidator.js';

const router = express.Router();

router.use(authMiddleware)
router.post('/', validateRequest(addToWatchListSchma),addToWatchList);
router.delete('/:id', deleteWatchList)
router.put('/:id', updateWatchlistItem)
// router.post('/logout', logout)
export default router;