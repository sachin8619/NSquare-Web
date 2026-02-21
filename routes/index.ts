import express, { Router } from 'express';
import * as pageController from '../controllers/pageController.js';
import * as authController from '../controllers/authController.js';

const router: Router = express.Router();

// Page Data Routes
router.get('/home-data', pageController.getHomeData);
router.get('/services', pageController.getServices);
router.get('/services/:slug', pageController.getServiceDetail);
router.get('/projects', pageController.getProjects);
router.get('/projects/:id', pageController.getProjectDetail);
router.post('/contact', pageController.postContact);

// Auth Routes
router.post('/auth/session', authController.createSession);
router.post('/auth/logout', authController.logout);
router.get('/auth/me', authController.getMe);

export default router;
