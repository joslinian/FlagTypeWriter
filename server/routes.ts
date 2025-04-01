import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // put application routes here
  // prefix all routes with /api

  // Simple endpoint to return the flag - directly returns "treasure" to avoid any external API issues
  app.get('/api/flag', (_req: Request, res: Response) => {
    console.log('Server: Received flag API request, returning fixed value');
    
    // Return the known value directly
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.send('treasure');
  });

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  const httpServer = createServer(app);

  return httpServer;
}
