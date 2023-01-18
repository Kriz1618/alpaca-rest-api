import { Router } from "express";

import { test } from '../controllers';
const router = Router();

router.get('/', test);

export default router;