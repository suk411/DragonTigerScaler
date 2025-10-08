import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  app.post('/api/round/result', async (req, res) => {
    try {
      const currentRound = await storage.getCurrentRound();

      if (!currentRound) {
        return res.status(404).json({ error: 'No active round' });
      }

      const { dragonTotal = 0, tigerTotal = 0, tieTotal = 0 } = req.body;

      // Determine winner based on lowest bet amount
      let winner: string;
      if (tieTotal > 0 && tieTotal <= dragonTotal && tieTotal <= tigerTotal) {
        winner = 'tie';
      } else if (dragonTotal <= tigerTotal && dragonTotal < tieTotal) {
        winner = 'dragon';
      } else {
        winner = 'tiger';
      }

      // Generate cards based on winner
      const cards = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
      const suits = ['hearts', 'diamonds', 'clubs', 'spades'];

      let dragonCard: string;
      let tigerCard: string;

      if (winner === 'tie') {
        // Same value for tie
        const value = cards[Math.floor(Math.random() * cards.length)];
        dragonCard = `${value}_${suits[Math.floor(Math.random() * suits.length)]}`;
        tigerCard = `${value}_${suits[Math.floor(Math.random() * suits.length)]}`;
      } else if (winner === 'dragon') {
        // Dragon higher value
        const dragonIdx = Math.floor(Math.random() * cards.length);
        const tigerIdx = Math.floor(Math.random() * dragonIdx);
        dragonCard = `${cards[dragonIdx]}_${suits[Math.floor(Math.random() * suits.length)]}`;
        tigerCard = `${cards[tigerIdx]}_${suits[Math.floor(Math.random() * suits.length)]}`;
      } else {
        // Tiger higher value
        const tigerIdx = Math.floor(Math.random() * cards.length);
        const dragonIdx = Math.floor(Math.random() * tigerIdx);
        dragonCard = `${cards[dragonIdx]}_${suits[Math.floor(Math.random() * suits.length)]}`;
        tigerCard = `${cards[tigerIdx]}_${suits[Math.floor(Math.random() * suits.length)]}`;
      }

      const round = await storage.endRound(currentRound.id, dragonCard, tigerCard, winner);

      res.json({ round });
    } catch (error) {
      res.status(500).json({ error: 'Failed to get round result' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}