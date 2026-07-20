"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import PhotoViewer from "./PhotoViewer";

interface Photo {
  id: string;
  file_name: string;
  storage_path: string;
  content_type: string;
  file_size: number;
  created_at: string;
  url: string;
}

interface PhotoGalleryProps {
  customerId?: string;
  propertyId?: string;
  opportunityId?: string;
  quoteId?: string;

  title?: string;
}

export default function PhotoGallery({
  customerId,
  propertyId,
  opportunityId,
  quoteId,
  title = "Photos",
}: PhotoGalleryProps) {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [selectedPhoto, setSelectedPhoto] =
    useState<Photo | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function loadPhotos() {
    try {
      setLoading(true);
      setError("");

      const params = new URLSearchParams();

      if (customerId)
        params.append("customerId", customerId);

      if (propertyId)
        params.append("propertyId", propertyId);

      if (opportunityId)
        params.append("opportunityId", opportunityId);

      if (quoteId)
        params.append("quoteId", quoteId);

      const response = await fetch(
        `/api/photos?${params.toString()}`
      );

      if (!response.ok) {
        throw new Error("Unable to load photos.");
      }

      const data = await response.json();

      setPhotos(data);
    } catch (err) {
      console.error(err);
      setError("Unable to load photos.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadPhotos();
  }, [
    customerId,
    propertyId,
    opportunityId,
    quoteId,
  ]);

  return (
    <>
      <div className="rounded-2xl border bg-white shadow-sm">

        {/* Header */}

        <div className="flex items-center justify-between border-b px-6 py-4">

          <div>

            <h2 className="text-xl font-bold text-slate-800">
              📷 {title}
            </h2>

            {!loading && !error && (
              <p className="mt-1 text-sm text-slate-500">
                {photos.length} photo
                {photos.length !== 1 ? "s" : ""}
              </p>
            )}

          </div>

          <button
            type="button"
            onClick={loadPhotos}
            className="rounded-lg border px-4 py-2 text-sm hover:bg-slate-50"
          >
            Refresh
          </button>

        </div>

        <div className="p-6">

          {/* Loading */}

          {loading && (
            <div className="py-12 text-center text-slate-500">
              Loading photos...
            </div>
          )}

          {/* Error */}

          {!loading && error && (
            <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-red-700">
              {error}
            </div>
          )}

          {/* Empty */}

          {!loading &&
            !error &&
            photos.length === 0 && (
              <div className="rounded-xl border-2 border-dashed border-slate-300 py-12 text-center text-slate-500">
                <div className="mb-4 text-5xl">
                  📷
                </div>

                <p className="font-semibold">
                  No photos uploaded yet.
                </p>

                <p className="mt-2 text-sm text-slate-400">
                  Photos uploaded from the website or ToolBox
                  will appear here.
                </p>
              </div>
            )}

          {/* Gallery */}

          {!loading &&
            !error &&
            photos.length > 0 && (

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                {photos.map((photo) => (

                  <button
                    key={photo.id}
                    type="button"
                    onClick={() =>
                      setSelectedPhoto(photo)
                    }
                    className="
                      overflow-hidden
                      rounded-xl
                      border
                      bg-white
                      shadow
                      transition
                      hover:-translate-y-1
                      hover:shadow-xl
                      text-left
                    "
                  >

                    <div className="relative aspect-square bg-slate-100">

                      <Image
                        src={photo.url}
                        alt={photo.file_name}
                        fill
                        sizes="300px"
                        className="object-cover"
                      />

                    </div>

                    <div className="space-y-2 p-4">

                      <h3 className="truncate font-semibold text-slate-800">
                        {photo.file_name}
                      </h3>

                      <div className="flex justify-between text-xs text-slate-500">

                        <span>
                          {(photo.file_size / 1024).toFixed(0)} KB
                        </span>

                        <span>
                          {new Date(
                            photo.created_at
                          ).toLocaleDateString()}
                        </span>

                      </div>

                    </div>

                  </button>

                ))}

              </div>

            )}

        </div>

      </div>

      {/* Full Screen Viewer */}

      <PhotoViewer
        photo={selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />
    </>
  );
}