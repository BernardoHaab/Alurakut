import jwt from "jsonwebtoken";

export default async function githubAuthorization(req, res) {
  const { authorization } = req.headers;
  const decodedToken = jwt.decode(authorization);
  let isAuthorized = false;

  const githubResponse = await fetch(
    `https://api.github.com/users/${decodedToken.githubUser}`
  );
  const { message: hasError } = await githubResponse.json();

  if (!hasError) {
    isAuthorized = true;
  }

  res.json({
    isAuthorized,
  });
}
