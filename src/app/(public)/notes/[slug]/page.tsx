import GoogleAd from "@/components/shared/google-ad";
import NoteContent from "./note-content";

interface NoteDetailPageProps {
  params: Promise<{ slug: string }>;
}

const NoteDetailPage = async ({ params }: NoteDetailPageProps) => {
  const slug = (await params).slug;

  return (
    <div>
      <GoogleAd adSlot="1234567890" />
      <NoteContent slug={slug} />
      <GoogleAd adSlot="0987654321" />
    </div>
  );
};

export default NoteDetailPage;
