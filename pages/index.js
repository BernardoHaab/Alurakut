import { useEffect, useState } from "react";
import nookies from "nookies";
import jwt from "jsonwebtoken";

import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations";

import {
  AlurakutMenu,
  AlurakutProfileSidebarMenuDefault,
  OrkutNostalgicIconSet,
} from "../src/lib/OrkutCommons";

function ProfileSideBar(props) {
  return (
    <Box as="aside">
      <img src={`https://github.com/${props.githubUser}.png`} alt="" />
      <hr />

      <p>
        <a
          target="_blank"
          className="boxLink"
          href={`http://github.com/${props.githubUser}`}
        >
          @{props.githubUser}
        </a>
      </p>

      <hr />
      <AlurakutProfileSidebarMenuDefault />
    </Box>
  );
}

function ProfileRelationsBox({ title, items }) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">
        {title} ({items.length})
      </h2>
      {/* <ul>
        {items.map((item) => (
          <li key={item}>
            <a href={`/users/${item}`}>
              <img src={`https://github.com/${item}.png`} alt={item} />
              <span>{item}</span>
            </a>
          </li>
        ))}
      </ul> */}
    </ProfileRelationsBoxWrapper>
  );
}

export default function Home(props) {
  const githubUser = props.githubUser;
  const [myCommunities, setMyCommunities] = useState([]);
  const friends = ["juunegreiros", "omariosouto", "peas", "rafaballerini"];
  const [followers, setFollowers] = useState([]);

  function handleCreateComunity(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const newCommunity = {
      title: formData.get("title"),
      imageUrl: formData.get("imageUrl"),
      creatorSlug: githubUser,
    };

    fetch("/api/communities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCommunity),
    }).then(async (res) => {
      const data = await res.json();
      console.log(data);
      setMyCommunities([...myCommunities, data.record]);
    });
  }

  useEffect(() => {
    fetch(`https://api.github.com/users/${githubUser}/followers`)
      .then((res) => {
        return res.json();
      })
      .then((res) => {
        setFollowers(res);
      });

    fetch("https://graphql.datocms.com/", {
      method: "POST",
      headers: {
        Authorization: "58a492490fea3397e2e726beadad33",
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        query: ` query {
        allCommunities {
          id
          title
          imageUrl
          creatorSlug
        }
      }`,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        setMyCommunities(res.data.allCommunities);
      });
  }, []);

  return (
    <>
      <AlurakutMenu githubUser={githubUser} />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <ProfileSideBar githubUser={githubUser} />
        </div>

        <div className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
          <Box>
            <h1>Bem Vindo(a) {githubUser}</h1>

            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>

            <form
              onSubmit={(e) => {
                handleCreateComunity(e);
              }}
            >
              <div>
                <input
                  type="text"
                  placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  aria-label="Qual vai ser o nome da sua comunidade?"
                />
              </div>

              <div>
                <input
                  type="text"
                  placeholder="Coloque uma URL para usarmos de capa"
                  name="imageUrl"
                  aria-label="Coloque uma URL para usarmos de capa"
                />
              </div>

              <button>Criar comunidade</button>
            </form>
          </Box>
        </div>

        <div
          className="profileRelationsArea"
          style={{ gridArea: "profileRelationsArea" }}
        >
          <ProfileRelationsBox title="Seguidores" items={followers} />

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Minhas comunidades ({myCommunities.length})
            </h2>
            <ul>
              {myCommunities.map((community) => (
                <li key={community.id}>
                  <a href={`/users/${community.id}`}>
                    <img src={community.imageUrl} alt={community.title} />
                    <span>{community.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Meus amigos ({friends.length})</h2>
            <ul>
              {friends.map((friend) => (
                <li key={friend}>
                  <a href={`/users/${friend}`}>
                    <img
                      src={`https://github.com/${friend}.png`}
                      alt={friend}
                    />
                    <span>{friend}</span>
                  </a>
                </li>
              ))}
            </ul>
          </ProfileRelationsBoxWrapper>
        </div>
      </MainGrid>
    </>
  );
}

export async function getServerSideProps(context) {
  const token = nookies.get(context).USER_TOKEN;
  const githubUser = jwt.decode(token)?.githubUser;

  console.log(githubUser);

  if (!githubUser) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return {
    props: {
      githubUser,
    },
  };
}
