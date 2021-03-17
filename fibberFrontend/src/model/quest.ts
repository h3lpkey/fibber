export default interface SpaceInterface {
  id: number
  sceneName: string
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
