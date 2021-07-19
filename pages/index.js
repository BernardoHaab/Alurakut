import { useState } from "react";
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

export default function Home() {
  const githubUser = "BernardoHaab";
  const [myCommunities, setMyCommunities] = useState([
    {
      id: "32423423",
      title: "Eu odeio acordar cedo",
      image: "http://alurakut.vercel.app/capa-comunidade-01.jpg",
    },
  ]);
  const friends = ["juunegreiros", "omariosouto", "peas", "rafaballerini"];

  function handleCreateComunity(e) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const newComunity = {
      id: new Date().toISOString,
      title: formData.get("title"),
      image: formData.get("image"),
    };

    setMyCommunities([...myCommunities, newComunity]);
  }

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
                  name="image"
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
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Minhas comunidades ({myCommunities.length})
            </h2>
            <ul>
              {myCommunities.map((community) => (
                <li key={community.id}>
                  <a href={`/users/${community.title}`}>
                    <img src={community.image} alt={community.title} />
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
