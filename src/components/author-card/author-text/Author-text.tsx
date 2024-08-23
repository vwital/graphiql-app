interface AuthorInfo {
  nickname: string;
  name: string;
  role: string;
  bio: string;
  github: string;
}

const AuthorText = ({
  authorInfo,
}: {
  authorInfo: AuthorInfo;
}): React.ReactNode => {
  return (
    <pre className="author-text">
      {`const ${authorInfo.nickname} = {
    name: ${authorInfo.name},
    role: ${authorInfo.role},
    bio: ${authorInfo.bio},
    `}
      github:
      <a
        href={authorInfo.github}
        target="_blank"
      >
        {authorInfo.github}
      </a>
    </pre>
  );
};

export default AuthorText;
