/* eslint-disable */

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useIsMobile } from "@/hooks/use-mobile";
import { Download } from "lucide-react";
import { useEffect, useState } from "react";
import Logo from "./logo";

interface PDFViewerProps {
  pdfUrl: string;
  width?: string | number;
  height?: string | number;
  fileName?: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({
  pdfUrl,
  width = "100%",
  height = 600,
  fileName = "document.pdf",
}) => {
  const [showAdDialog, setShowAdDialog] = useState(false);
  const [adTimer, setAdTimer] = useState(10);
  const [canDownload, setCanDownload] = useState(false);
  const isMobile = useIsMobile();

  // Enhanced PDF URL with page navigation
  const pdfViewerUrl = `${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`;

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (showAdDialog && adTimer > 0) {
      interval = setInterval(() => {
        setAdTimer((prev) => prev - 1);
      }, 1000);
    } else if (adTimer === 0) {
      setCanDownload(true);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [showAdDialog, adTimer]);

  const handleDownloadClick = () => {
    setShowAdDialog(true);
    setAdTimer(10);
    setCanDownload(false);
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.download = fileName;
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setShowAdDialog(false);
  };

  const handleCloseDialog = () => {
    setShowAdDialog(false);
    setAdTimer(10);
    setCanDownload(false);
  };

  return (
    <div className="w-full bg-background" style={{ width, height }}>
      {/* Minimal Toolbar */}
      <div className="flex justify-between items-center p-2 bg-muted/30 border-b">
        <Logo showBrandName />
        <Button
          onClick={handleDownloadClick}
          size="sm"
          variant="default"
          className="flex items-center space-x-1 "
        >
          <Download size={16} />
          {!isMobile && <span>Download</span>}
        </Button>
      </div>

      {/* PDF Viewer */}
      <div
        className="w-full"
        style={{
          height:
            typeof height === "number" ? height - 60 : `calc(${height} - 60px)`,
        }}
        onContextMenu={(e) => e.preventDefault()}
      >
        <iframe
          src={pdfViewerUrl}
          width="100%"
          height="100%"
          style={{ border: "none" }}
          title="PDF Viewer"
          onClick={(e) => e.stopPropagation()}
          onContextMenu={(e) => e.preventDefault()}
        />
      </div>

      {/* Advertisement Dialog */}
      <Dialog open={showAdDialog} onOpenChange={handleCloseDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Download Starting Soon...</DialogTitle>
            <DialogDescription>
              Please wait while we prepare your download.
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col items-center space-y-4 py-4">
            {/* Advertisement Space */}
            <div className="w-full h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
              <div className="text-center">
                <h3 className="font-bold text-lg">Your Ad Here</h3>
                <p className="text-sm opacity-90">Premium content awaits!</p>
              </div>
            </div>

            {/* Timer */}
            <div className="text-center">
              {adTimer > 0 ? (
                <>
                  <div className="text-2xl font-bold text-primary mb-2">
                    {adTimer}
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Download will start automatically...
                  </p>
                </>
              ) : (
                <p className="text-sm text-green-600 font-medium">
                  Ready to download!
                </p>
              )}
            </div>

            {/* Download Button */}
            <Button
              onClick={handleDownload}
              disabled={!canDownload}
              className="w-full"
              size="lg"
            >
              {canDownload ? (
                <>
                  <Download size={16} className="mr-2" />
                  Download Now
                </>
              ) : (
                `Please wait ${adTimer}s...`
              )}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PDFViewer;
