import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { PrismaClient } from '@prisma/client';
import { financeStateSchema } from './types.js';
import { requireAuth, signUser, verifyGoogleToken } from './auth.js';

const app = express();
const prisma = new PrismaClient();
app.use(helmet());
app.use(cors({ origin: process.env.WEB_ORIGIN?.split(',') ?? true }));
app.use(express.json({ limit: '2mb' }));
app.get('/api/health', (_req, res) => res.json({ ok: true }));

app.post('/api/auth/google', async (req, res) => {
  try {
    const { credential } = req.body as { credential?: string };
    if (!credential) return res.status(400).json({ error: 'credential requerida' });
    const profile = await verifyGoogleToken(credential);
    const user = await prisma.user.upsert({ where: { email: profile.email }, update: { name: profile.name, googleId: profile.googleId }, create: profile });
    return res.json({ token: signUser(user.id), user: { id: user.id, email: user.email, name: user.name } });
  } catch { return res.status(401).json({ error: 'No se pudo validar Google' }); }
});

app.get('/api/finances', requireAuth, async (req, res) => {
  const finance = await prisma.finance.findUnique({ where: { userId: req.userId } });
  return res.json(finance ?? null);
});
app.put('/api/finances', requireAuth, async (req, res) => {
  const parsed = financeStateSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Estado financiero inválido', details: parsed.error.flatten() });
  const data = parsed.data;
  const finance = await prisma.finance.upsert({ where: { userId: req.userId }, update: data, create: { ...data, userId: req.userId } });
  return res.json(finance);
});
app.post('/api/migrate', requireAuth, async (req, res) => {
  const parsed = financeStateSchema.safeParse(req.body);
  if (!parsed.success) return res.status(400).json({ error: 'Exportación local inválida' });
  const data = parsed.data;
  const finance = await prisma.finance.upsert({ where: { userId: req.userId }, update: data, create: { ...data, userId: req.userId } });
  return res.status(201).json({ id: finance.id, migrated: true });
});

const port = Number(process.env.PORT ?? 3000);
app.listen(port, () => console.log(`Finanzas API escuchando en ${port}`));
