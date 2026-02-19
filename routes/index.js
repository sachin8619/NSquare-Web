import express from 'express';
import * as pageController from '../controllers/pageController.js';

const router = express.Router();

router.get('/', pageController.getHome);
router.get('/about', pageController.getAbout);
router.get('/services', pageController.getServices);
router.get('/services/:slug', pageController.getServiceDetail);
router.get('/projects', pageController.getProjects);
router.get('/projects/:id', pageController.getProjectDetail);
router.get('/contact', pageController.getContact);
router.post('/contact', pageController.postContact);

export default router;
