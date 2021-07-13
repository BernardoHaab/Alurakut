import MainGrid from "../src/components/MainGrid";
import Box from "../src/components/Box";
import { ProfileRelationsBoxWrapper } from "../src/components/ProfileRelations";

import { AlurakutMenu, OrkutNostalgicIconSet } from "../src/lib/OrkutCommons";

function ProfileSideBar(props) {
  return (
    <Box>
      <img src={`https://github.com/${props.githubUser}.png`} alt="" />
    </Box>
  );
}

export default function Home() {
  const githubUser = "BernardoHaab";
  const pessoasFavoritas = [
    "juunegreiros",
    "omariosouto",
    "peas",
    "rafaballerini",
  ];

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: "profileArea" }}>
          <ProfileSideBar githubUser={githubUser} />
        </div>

        <div className="welcomeArea" style={{ gridArea: "welcomeArea" }}>
          <Box>
            <h1>Bem Vindo(a) {githubUser}</h1>

            <OrkutNostalgicIconSet />
          </Box>
        </div>

        <div
          className="profileRelationsArea"
          style={{ gridArea: "profileRelationsArea" }}
        >
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">
              Pessoas da comunidade ({pessoasFavoritas.length})
            </h2>
            <ul>
              {pessoasFavoritas.map((pessoaFavorita) => (
                <li>
                  <a href={`/users/${pessoaFavorita}`} key={pessoaFavorita}>
                    <img
                      src={`https://github.com/${pessoaFavorita}.png`}
                      alt={pessoaFavorita}
                    />
                    <span>{pessoaFavorita}</span>
                  </a>
                </li>
              ))}
            </ul>
          </ProfileRelationsBoxWrapper>
          <Box>Minhas Comunidades</Box>
        </div>
      </MainGrid>
    </>
  );
}
