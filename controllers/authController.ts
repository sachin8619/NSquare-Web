import { Request, Response } from 'express';
import { getAuth } from '../utils/firebase.js';

export const createSession = async (req: Request, res: Response) => {
  try {
    const { idToken } = req.body;
    if (!idToken) {
      return res.status(400).json({ error: 'ID Token is required' });
    }

    const auth = getAuth();
    
    // Set session expiration to 5 days.
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    
    const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });
    
    res.cookie('token', sessionCookie, {
      maxAge: expiresIn,
      httpOnly: true,
      secure: true,
      sameSite: 'none'
    });

    res.json({ status: 'success' });
  } catch (err: any) {
    console.error('Session Creation Error:', err);
    res.status(401).json({ error: err.message || 'UNAUTHORIZED REQUEST!' });
  }
};

export const logout = async (req: Request, res: Response) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: true,
    sameSite: 'none'
  });
  res.json({ message: 'Logged out successfully' });
};

export const getMe = async (req: Request, res: Response) => {
  try {
    const sessionCookie = req.cookies.token;
    if (!sessionCookie) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const auth = getAuth();
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);
    
    res.json({
      user: {
        id: decodedClaims.uid,
        name: decodedClaims.name || decodedClaims.email?.split('@')[0],
        email: decodedClaims.email,
        role: decodedClaims.role || 'user'
      }
    });
  } catch (err: any) {
    res.status(401).json({ error: 'Invalid token' });
  }
};
