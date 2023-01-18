import { Handler } from "express";

export const test: Handler = (req, res) => {
  res.json('Test route');
}