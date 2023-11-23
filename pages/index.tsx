import Link from "next/link";

const IndexPage = () => {
  return (
    <>
      備忘録
      <br />
      <Link href="/blog/deploy-github-pages">
        NextJSで作った静的サイトをGithubPagesにデプロイした
      </Link>
      <br />
      <Link href="/blog/update-libreboot-on-thinkpad-x200">
        ThinkPad X200のLibrebootをアップデートした
      </Link>
    </>
  );
};

export default IndexPage;
