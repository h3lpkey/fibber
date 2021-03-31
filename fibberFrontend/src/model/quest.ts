export default interface SceneInterface {
  id: number
  sceneId: string
  text: string
  person_name: string
  background: {
    publicURL: string
  }
  buttons: {
    link: string
    text: string
  }[]
  person: {
    publicURL: string
  }
}
