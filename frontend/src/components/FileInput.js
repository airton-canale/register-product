import { useEffect, useRef, useState } from "react";
import { FaPlus, FaTimesCircle } from "react-icons/fa";

const FileInput = ({ onChange, limit }) => {
  const [files, setFiles] = useState([]);
  const fileRef = useRef();

  const handleFileChange = (e) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    file.preview = URL.createObjectURL(file);
    setFiles((prev) => [...prev, file]);

    fileRef.current.value = "";
  };

  const handleFileDelete = (idx) =>
    setFiles((prev) => prev.filter((_, i) => i !== idx));

  useEffect(() => {
    onChange?.(files);
  }, [files]);

  return (
    <div className="flex gap-2 w-full overflow-auto overflow-x-hidden">
      <input
        className="hidden"
        onChange={handleFileChange}
        type="file"
        ref={fileRef}
      />
      <div className="flex gap-4">
        {files?.map((f, i) => (
          <div className={"relative mt-2"} key={i}>
            <div className="absolute rounded-full bg-white right-0 top-0 cursor-pointer">
              <FaTimesCircle
                onClick={() => handleFileDelete(i)}
                className="text-xl text-red-500 -m-1"
              />
            </div>
            <img
              key={i}
              className="rounded-lg h-24 border-2 border-blue-500 w-24"
              src={f.preview}
            />
          </div>
        ))}
      </div>
      {files?.length < limit && (
        <div
          onClick={() => fileRef.current.click()}
          className="flex justify-center items-center mt-2
                    h-24 rounded-lg px-12 cursor-pointer
                    border-2 text-blue-500 border-blue-500"
        >
          <FaPlus />
        </div>
      )}
    </div>
  );
};

export default FileInput;
