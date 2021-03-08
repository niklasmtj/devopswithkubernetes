import axios from "axios"
import { useEffect, useState } from "react"
import { baseDir, baseURL } from "../pages"

export const Image = ({ date }: { date: string }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (!imageLoaded) {
      getImageStatus();
    }
  })
    
  const getImageStatus =  async () => {
    const {data} = await axios.get(`${baseURL}/helper/image`)
    const loaded = JSON.parse(data.image);
    setImageLoaded(loaded);
  }
 
  return (
    <>{
      imageLoaded && (
        <img src={`${baseURL}/public/images/${date}.jpg`} alt="Picture from Picsum" width="30%"></img>
      )
    }
    </>
  )
}