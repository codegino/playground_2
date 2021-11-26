import { useLoaderData, useNavigate } from "remix";
import { supabase } from "~/libs/supabase-client";
import type { LoaderFunction } from "remix";

type Word = {
  id: number;
  name: string;
  sentences: string[];
  definitions: string[];
  type: "noun" | "verb" | "adjective";
};

export const loader: LoaderFunction = async () => {
  const { data } = await supabase.from<Word>("words").select("*");

  return data;
};

export default function Index() {
  const words = useLoaderData<Word[]>();
  const navigate = useNavigate();

  return (
    <div>
      <h1>New words I learned</h1>
      <ul>
        {words.map((word) => (
          <li key={word.id}>
            <div>
              <h3>
                {word.name} | {word.type}
              </h3>
              {word.definitions.map((definition, i) => (
                <p key={i}>
                  <i>{definition}</i>
                </p>
              ))}
              {word.sentences.map((sentence, i) => (
                <p key={i}>{sentence}</p>
              ))}
            </div>
          </li>
        ))}
      </ul>
      <button onClick={() => navigate("/add")}>Add new word</button>
    </div>
  );
}
