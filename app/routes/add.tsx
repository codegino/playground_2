import { Form, redirect } from "remix";
import type { ActionFunction } from "remix";
import { supabase } from "~/libs/supabase-client";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();

  const newWord = {
    name: formData.get("name"),
    type: formData.get("type"),
    sentences: [formData.get("sentence")],
    definitions: [formData.get("definition")],
  };

  await supabase.from("words").insert([newWord]);

  return redirect("/");
};

export default function AddWord() {
  return (
    <Form method="post">
      <div>
        <label htmlFor="name">Word</label>
        <input name="name" type="text" placeholder="Word" />
      </div>
      <div>
        <label htmlFor="type">Type</label>
        <input name="type" type="text" placeholder="Type" />
      </div>
      <div>
        <label htmlFor="sentence">Sentence</label>
        <input name="sentence" type="text" placeholder="Sentence" />
      </div>
      <div>
        <label htmlFor="definition">Definition</label>
        <input name="definition" type="text" placeholder="Definition" />
      </div>
      <button type="submit">Submit</button>
    </Form>
  );
}
