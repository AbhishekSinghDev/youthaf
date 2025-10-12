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
import { Download, FileText } from "lucide-react";
import { useEffect, useState } from "react";
import GoogleAd from "./google-ad";
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
  const [adTimer, setAdTimer] = useState(20);
  const [canDownload, setCanDownload] = useState(false);
  const [supportsPDFViewing, setSupportsPDFViewing] = useState(true);
  const isMobile = useIsMobile();

  // Enhanced PDF URL with page navigation
  const pdfViewerUrl = `${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`;

  // Check if browser supports PDF viewing
  useEffect(() => {
    // Most mobile browsers don't support inline PDF viewing
    // Check for PDF plugin support
    const checkPDFSupport = () => {
      if (isMobile) {
        // On mobile, check if it's iOS Safari or Android Chrome which have limited PDF support
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        const isAndroid = /Android/.test(navigator.userAgent);

        if (isIOS || isAndroid) {
          setSupportsPDFViewing(false);
          return;
        }
      }

      // Check for PDF plugin in navigator
      const hasPDFPlugin = Array.from(navigator.plugins).some((plugin) =>
        plugin.name.toLowerCase().includes("pdf")
      );

      // Additional check for PDF MIME type support
      const supportsPDFMime = navigator.mimeTypes["application/pdf"];

      setSupportsPDFViewing(hasPDFPlugin || !!supportsPDFMime);
    };

    checkPDFSupport();
  }, [isMobile]);

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

  // If PDF viewing is not supported, show download-only interface
  if (!supportsPDFViewing) {
    return (
      <div
        className="w-full bg-background border rounded-lg select-none"
        style={{ width, height }}
        onContextMenu={(e) => e.preventDefault()}
        onDragStart={(e) => e.preventDefault()}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b">
          <Logo showBrandName />
          <Button
            onClick={handleDownloadClick}
            size="sm"
            variant="default"
            className="flex items-center space-x-2"
          >
            <Download size={16} />
            <span>Download</span>
          </Button>
        </div>

        {/* PDF Preview Not Available Message */}
        <div
          className="flex flex-col items-center justify-center p-8 text-center"
          style={{
            height:
              typeof height === "number"
                ? height - 80
                : `calc(${height} - 80px)`,
          }}
        >
          <FileText size={64} className="text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">
            PDF Preview Not Available
          </h3>
          <p className="text-muted-foreground mb-4 max-w-sm">
            PDF preview is not supported on this device. Please download the
            file to view it.
          </p>
          <Button
            onClick={handleDownloadClick}
            className="flex items-center space-x-2"
          >
            <Download size={16} />
            <span>Download PDF</span>
          </Button>
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
              {/* <div className="w-full h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
                <div className="text-center">
                  <h3 className="font-bold text-lg">Your Ad Here</h3>
                  <p className="text-sm opacity-90">Premium content awaits!</p>
                </div>
              </div> */}

              <GoogleAd adSlot="7504029699" />

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
  }

  // Original PDF viewer for supported browsers
  return (
    <div
      className="w-full bg-background select-none"
      style={{ width, height }}
      onContextMenu={(e) => e.preventDefault()}
      onDragStart={(e) => e.preventDefault()}
    >
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

      {/* PDF Viewer Container with Overlay */}
      <div
        className="w-full relative"
        style={{
          height:
            typeof height === "number" ? height - 60 : `calc(${height} - 60px)`,
        }}
      >
        {/* PDF Iframe */}
        <iframe
          src={pdfViewerUrl}
          width="100%"
          height="100%"
          style={{
            border: "none",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 1,
          }}
          title="PDF Viewer"
        />

        {/* Transparent Overlay to Block Right-Click */}
        <div
          className="absolute inset-0 bg-transparent select-none"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 2,
            cursor: "default",
            userSelect: "none",
            pointerEvents: "auto",
          }}
          onContextMenu={(e) => {
            e.preventDefault();
            e.stopPropagation();
            return false;
          }}
          onMouseDown={(e) => {
            if (e.button === 2) {
              // Right click
              e.preventDefault();
              e.stopPropagation();
              return false;
            }
            // Allow left clicks to pass through for scrolling
            if (e.button === 0) {
              e.target.style.pointerEvents = "none";
              setTimeout(() => {
                e.target.style.pointerEvents = "auto";
              }, 100);
            }
          }}
          onSelectStart={(e) => {
            e.preventDefault();
            return false;
          }}
          onDragStart={(e) => {
            e.preventDefault();
            return false;
          }}
          onTouchStart={(e) => {
            // Allow touch interactions for mobile scrolling
            if (e.touches.length === 1) {
              e.target.style.pointerEvents = "none";
              setTimeout(() => {
                e.target.style.pointerEvents = "auto";
              }, 100);
            }
          }}
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
            {/* <div className="w-full h-32 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white">
              <div className="text-center">
                <h3 className="font-bold text-lg">Your Ad Here</h3>
                <p className="text-sm opacity-90">Premium content awaits!</p>
              </div>
            </div> */}

            <GoogleAd adSlot="7504029699" />

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
