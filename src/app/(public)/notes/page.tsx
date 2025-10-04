import GoogleAd from "@/components/shared/google-ad";
import NotesContent from "./notes-content";

const NotesPage = () => {
  return (
    <div>
      <GoogleAd adSlot="1234567890" />
      <NotesContent />
      <GoogleAd adSlot="0987654321" />
    </div>
  );
};

export default NotesPage;
