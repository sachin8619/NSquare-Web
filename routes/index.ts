import express, { Router } from 'express';
import * as pageController from '../controllers/pageController.js';

const router: Router = express.Router();

router.get('/home-data', pageController.getHomeData);
router.get('/services', pageController.getServices);
router.get('/services/:slug', pageController.getServiceDetail);
router.get('/projects', pageController.getProjects);
router.get('/projects/:id', pageController.getProjectDetail);
router.post('/contact', pageController.postContact);

export default router;
