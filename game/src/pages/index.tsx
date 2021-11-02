import { graphql } from "gatsby";
import { StaticImage } from "gatsby-plugin-image";
import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Layout from "../components/Layout";
import Music from "../components/Music";
import Scene from "../components/Scene";

const IndexPage = ({ data }: { data: any }) => {
  const [loading, setLoading] = useState(true);
  const [showPreview, setShowPreview] = useState(true);
  const [scenes, setScenes] = useState([]);
  const [scene, setScene] = useState(null);

  useEffect(() => {
    setScenes(data.strapiQuest.Scenes);
    setScene(data.strapiQuest.Scenes[0]);
    setLoading(false);
  }, []);

  const setSceneById = (id: number) => {
    const fndScene = scenes.find((scene: any) => {
      return scene.id === id;
    });
    if (fndScene) {
      setScene(fndScene);
    }
  };

  if (showPreview) {
    return (
      <button
        onClick={() => setShowPreview(false)}
        onTouchStart={() => setShowPreview(false)}
        onKeyPress={() => setShowPreview(false)}>
        go quests
      </button>
    );
  }
  if (!loading) {
    return (
      <Layout>
        <Header />
        <Scene scene={scene} setSceneById={setSceneById} />
        <Music music={scene.Music} />
      </Layout>
    );
  } else {
    return (
      <Layout>
        <p>loading</p>
      </Layout>
    );
  }
};

export default IndexPage;

export const query = graphql`
  query {
    strapiQuest {
      Scenes {
        id
        Buttons {
          id
          Text
          Scene {
            id
          }
        }
        Music {
          id
          url
        }
        Person {
          id
          url
          localFile {
            childImageSharp {
              id
              gatsbyImageData
            }
          }
        }
        PersonName
        Text
        Background {
          id
          url
          localFile {
            childImageSharp {
              id
              gatsbyImageData
            }
          }
        }
      }
    }
  }
`;
