import { useRef, useState } from "react";
import { FaFilePdf, FaFileWord } from "react-icons/fa";
import { X, Loader2, Check, AlertCircle } from "lucide-react";
import { sendFiles } from "../utils/api";
import Chat from "../components/Chat";

function Notebook() {
  const fileInputRef = useRef(null);
  const [files, setFiles] = useState([]);
  

  const handleClick = () => {
    fileInputRef.current.click();
  };

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFiles((prev) => [
        ...prev,
        { file: selectedFile, status: "pending" }, // add status field
      ]);
      console.log("File selected:", selectedFile.name);
    }
  };

  const getFileIcon = (file) => {
    if (!file) return null;
    if (file.type === "application/pdf") {
      return <FaFilePdf className="text-red-500 text-lg" />;
    }
    if (
      file.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.type === "application/msword"
    ) {
      return <FaFileWord className="text-blue-500 text-lg" />;
    }
    return null;
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    // mark all files as uploading
    setFiles((prev) =>
      prev.map((f) => ({ ...f, status: "uploading" }))
    );

    const formData = new FormData();
    files.forEach((f) => formData.append("source", f.file));

    try {
      const res = await sendFiles(formData);
      console.log(res);

      // if backend returns success:true, mark files as success
      if (res?.data?.success === true) {
        setFiles((prev) => prev.map((f) => ({ ...f, status: "success" })));
      } else {
        setFiles((prev) => prev.map((f) => ({ ...f, status: "error" })));
      }

    //   console.log("Upload success:", res);
    } catch (err) {
      console.error("Upload failed:", err);
      setFiles((prev) => prev.map((f) => ({ ...f, status: "error" })));
    }
  };

  

  return (
    <div className="h-screen grid grid-cols-4 gap-2 px-2 overflow-x-hidden bg-zinc-700">
      {/* Left */}
      <div className="h-[93%] bg-zinc-800 rounded-lg col-span-1 mt-15 flex flex-col">
        <p className="text-xl font-semibold text-white p-4">Sources</p>

        <div className="p-4 flex flex-col gap-3">
          {/* File input */}
          <input
            type="file"
            className="hidden"
            accept=".pdf,.doc,.docx"
            onChange={handleChange}
            ref={fileInputRef}
          />
          <button
            onClick={handleClick}
            className="px-10 py-2 bg-zinc-800 text-white rounded-lg hover:bg-zinc-700 border border-zinc-600 hover:border-zinc-500"
          >
            + Add
          </button>

          {/* Upload button */}
          <button
            onClick={handleUpload}
            disabled={files.length === 0}
            className="px-10 py-2 flex items-center justify-center gap-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 disabled:opacity-50"
          >
            Upload
          </button>

          {/* File list */}
          <div className="mt-4 space-y-2">
            {files.map((f, ind) => (
              <div
                key={ind}
                className="flex items-center justify-between text-sm text-zinc-300 bg-zinc-900 px-3 py-2 rounded-lg"
              >
                <div className="flex items-center gap-2 truncate">
                  {getFileIcon(f.file)}
                  <span className="truncate">{f.file.name}</span>
                </div>

                {/* Status icons */}
                <div className="flex items-center gap-2">
                  {f.status === "uploading" && (
                    <Loader2 className="animate-spin w-4 h-4 text-blue-400" />
                  )}
                  {f.status === "success" && (
                    <Check className="w-4 h-4 text-green-500" />
                  )}
                  {f.status === "error" && (
                    <AlertCircle className="w-4 h-4 text-red-500" />
                  )}

                  <button
                    onClick={() =>
                      setFiles((prev) => prev.filter((_, i) => i !== ind))
                    }
                    className="text-zinc-400 hover:text-red-500 transition"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Middle */}
      <div className="h-[93%] bg-zinc-800 rounded-lg col-span-2 mt-15 relative">
        <Chat/>
      </div>

      {/* Right */}
      <div className="h-[93%] bg-zinc-800 rounded-lg col-span-1 mt-15"></div>
    </div>
  );
}

export default Notebook;
