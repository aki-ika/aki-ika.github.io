import ReactMarkdown from "react-markdown";

type Props = {
  content: string;
};
export const Blog: React.FC<Props> = (props) => {
  return <ReactMarkdown>{props.content}</ReactMarkdown>;
};
