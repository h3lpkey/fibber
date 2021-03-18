export default interface SceneInterface {
  id: number
  sceneId: string
  text: string
  person_name: string
  background: {
    childImageSharp: {
      original: {
        src: string
      }
    }
  }
  buttons: {
    link: string
    text: string
  }[]
  person: {
    childImageSharp: {
      original: {
        src: string
      }
    }
  }
}
