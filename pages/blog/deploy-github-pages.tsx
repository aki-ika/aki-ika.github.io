import { Blog } from "@/components/blog";

const markdownString = `
# GitHub PagesにNext.jsサイトをデプロイする手順(2023/11/23)


巷の記事をコピペしたらビルドが通らなかったので備忘録として書いた。(戒め)

## 1. GitHubリポジトリの作成

GitHubに <user-name>.github.io リポジトリを作成する。これはまあいい。

## 2. Next.js環境の構築

Next.jsプロジェクトを作成する。これもまあいい。

\`\`\`yml
# Next.jsプロジェクトの作成コマンド
npx create-next-app my-nextjs-site
cd my-nextjs-site
\`\`\`

ここで、静的サイトを出力するようにいろいろ設定する。これもまあいい。

\`next.config.js\` を編集する。

\`\`\`yaml
# next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // 以下を追加
  output: 'export',
}
\`\`\`

## 3. GitHub Pages の Build and Deploymentの設定
Settings > Pages から、GitHub Pagesの設定を行う。
source で、 Github Actions を選択すると、自動的にymlファイルが作成される。
ここで生成されるnextjs.ymlに問題がある(2023/11/23現在)。なんかよくわかってなくてpackage.jsonにnodeのバージョンを書いたりしてた。

まず、自動生成されるymlファイルのnodeのバージョンが16で古くてビルドが通らないので、20に変更する。
\`\`\`yaml
# ymlファイル
with:
+  node-version: "20"
-  node-version: "16"
\`\`\`

あと、ymlファイルの次の記述を削除する。next.config.jsに書くのがナウいらしい。
\`\`\`yaml
# nextjs.yml
-  - name: Static HTML export with Next.js
-  run: \${{ steps.detect-package-manager.outputs.runner }} next export
\`\`\`
## 4. Next.jsの設定
\`next.config.js\` を編集する。

\`\`\`yaml
# next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // 以下を追加
  output: 'export',
}

module.exports = nextConfig
\`\`\`

あとはコミットしてプッシュすれば、GitHub Actionsが走って、GitHub Pagesにデプロイされる。
`;

const DeployGithubPages = () => {
  return <Blog content={markdownString} />;
};

export default DeployGithubPages;
