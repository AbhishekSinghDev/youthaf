import NoteContent from "./note-content";

interface NoteDetailPageProps {
  params: Promise<{ slug: string }>;
}

const NoteDetailPage = async ({ params }: NoteDetailPageProps) => {
  const slug = (await params).slug;

  return (
    <div>
      <NoteContent slug={slug} />
    </div>
  );
};

export default NoteDetailPage;
