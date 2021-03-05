import { baseDir } from "../pages"

export default ({ date }: { date: string }) => {
  return (
    <>
      <img src={`${baseDir}/files/${date}.jpg`} alt="Picture from Picsum" width="30%"></img>
    </>
  )
}