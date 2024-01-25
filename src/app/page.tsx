import { auth, signOut } from "@/auth";

export default async function Home() {
  const session = await auth();
  return (
    <div>
      Hello
      <p>{JSON.stringify(session)}</p>
      <br />
      <br />
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">Sign Out</button>
      </form>
    </div>
  );
}
