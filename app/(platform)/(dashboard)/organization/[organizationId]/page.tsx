import { db } from "@/lib/db";

const OrganizationIdPage = () => {
  async function create(formData: FormData) {
    "use server";

    const title = formData.get("title") as string;
    await db.board.create({
      data: {
        title,
      },
    });
  }

  return (
    <div>
      <form action={create}>
        <input
          className="bprder border-black p-1"
          id="title"
          name="title"
          placeholder="Enter a title"
          required
        />
      </form>
    </div>
  );
};

export default OrganizationIdPage;
