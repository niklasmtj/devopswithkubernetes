import {Response, Request, Router} from 'express'
import { checkForTodaysImage } from '../services/images';

const router: Router = Router();

router.get("/image", async (req: Request, res: Response) => {
  const image = await checkForTodaysImage();
  if (image) {
    res.status(200).json({image: true})
  }
  res.status(404).json({image: false})
});

export default router;