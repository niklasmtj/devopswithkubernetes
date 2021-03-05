import { readFile, writeFile, stat } from "fs/promises"
import { join } from "path"
import fetch from 'node-fetch'
import { BASE_PATH } from ".."

const checkForTodaysImage = async () => {
  const d = new Date();
  const currentDate = `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`
  try {
    const fileFound = await stat(join(BASE_PATH, "public", "images", `${currentDate}.jpg`))
    if (fileFound) {
      const todaysImage = readTodaysImage(currentDate);
      return todaysImage
    } else {
      await fetchTodaysImage(currentDate)
      return await readTodaysImage(currentDate);
    }
  } catch (error) {
    await fetchTodaysImage(currentDate);
    return await readTodaysImage(currentDate);
  }
}

const readTodaysImage = async (currentDate: string) => {
  try {
    return await readFile(join(BASE_PATH, "public", "images", `${currentDate}.jpg`));
  } catch (error) {
    throw new Error(error);
  }
}

const writeTodaysImage = async (imageBuffer: Buffer, currentDate: string) => {
  try {
    return await writeFile(join(BASE_PATH, "public", "images", `${currentDate}.jpg`), imageBuffer)
  } catch (error) {
    throw new Error(error);
  }
}

const fetchTodaysImage = async (currentDate: string) => {
  const data = await fetch("https://picsum.photos/1200").then((res) => res.buffer())
  await writeTodaysImage(data, currentDate);
}

export { checkForTodaysImage }