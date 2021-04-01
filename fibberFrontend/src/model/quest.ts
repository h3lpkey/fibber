export default interface SceneInterface {
  id: number
  sceneId: string
  text: string
  personName: string
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
