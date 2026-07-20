"use client";

import Image from "next/image";

interface Photo {
  id: string;
  file_name: string;
  storage_path: string;
  content_type: string;
  file_size: number;
  created_at: string;
  url: string;
}

interface PhotoViewerProps {
  photo: Photo | null;

  onClose: () => void;
}

export default function PhotoViewer({
  photo,
  onClose,
}: PhotoViewerProps) {
  if (!photo) return null;

  return (
    <div
      className="
      fixed
      inset-0
      z-50
      flex
      items-center
      justify-center
      bg-black/80
      p-6
      "
    >
      <div
        className="
        w-full
        max-w-6xl
        rounded-2xl
        bg-white
        shadow-2xl
        overflow-hidden
        "
      >
        {/* Header */}

        <div className="flex items-center justify-between border-b px-6 py-4">

          <div>

            <h2 className="text-xl font-bold">
              {photo.file_name}
            </h2>

            <p className="text-sm text-slate-500">
              Uploaded{" "}
              {new Date(
                photo.created_at
              ).toLocaleString()}
            </p>

          </div>

          <button
            onClick={onClose}
            className="
              rounded-lg
              bg-slate-100
              px-4
              py-2
              hover:bg-slate-200
            "
          >
            ✕
          </button>

        </div>

        {/* Image */}

        <div className="relative h-[70vh] bg-slate-900">

          <Image
            src={photo.url}
            alt={photo.file_name}
            fill
            className="object-contain"
            sizes="100vw"
            priority
          />

        </div>

        {/* Footer */}

        <div className="flex flex-wrap items-center justify-between gap-4 border-t px-6 py-4">

          <div>

            <p className="text-sm text-slate-600">

              {(photo.file_size / 1024).toFixed(0)} KB

            </p>

            <p className="text-xs text-slate-500">

              {photo.content_type}

            </p>

          </div>

          <div className="flex gap-3">

            <a
              href={photo.url}
              download
              target="_blank"
              rel="noreferrer"
              className="
                rounded-lg
                bg-blue-600
                px-5
                py-2
                text-white
                hover:bg-blue-700
              "
            >
              ⬇ Download
            </a>

            <button
              className="
                rounded-lg
                bg-red-600
                px-5
                py-2
                text-white
                hover:bg-red-700
              "
            >
              🗑 Delete
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}