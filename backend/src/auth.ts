import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';

const google = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
export async function verifyGoogleToken(token: string) {
  const ticket = await google.verifyIdToken({ idToken: token, audience: process.env.GOOGLE_CLIENT_ID });
  const p = ticket.getPayload();
  if (!p?.sub || !p.email) throw new Error('Token de Google inválido');
  return { googleId: p.sub, email: p.email, name: p.name ?? null };
}
export function signUser(userId: string) {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET no configurado');
  return jwt.sign({ sub: userId }, secret, { expiresIn: '7d' });
}
export function requireAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const secret = process.env.JWT_SECRET;
    const header = req.headers.authorization;
    if (!secret || !header?.startsWith('Bearer ')) return res.status(401).json({ error: 'Autenticación requerida' });
    const payload = jwt.verify(header.slice(7), secret) as jwt.JwtPayload;
    if (typeof payload.sub !== 'string') throw new Error('subject ausente');
    req.userId = payload.sub;
    next();
  } catch { res.status(401).json({ error: 'Sesión inválida o expirada' }); }
}
declare global { namespace Express { interface Request { userId?: string } } }
