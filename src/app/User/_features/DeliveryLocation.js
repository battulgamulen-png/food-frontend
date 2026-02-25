"use client";

import ChevronRight from "@/app/admin/_icons/ChevronRightGray";
import MapPin from "@/app/admin/_icons/MapPin";
import { useEffect, useMemo, useState } from "react";
import { toast } from "react-toastify";

const DEFAULT_COORDS = { lat: 47.9184, lng: 106.9177 };

export default function DeliverLocation() {
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState("");
  const [coords, setCoords] = useState(DEFAULT_COORDS);
  const [manualAddress, setManualAddress] = useState("");
  const [isDetecting, setIsDetecting] = useState(false);

  const mapSrc = useMemo(() => {
    return `https://maps.google.com/maps?q=${coords.lat},${coords.lng}&z=16&output=embed`;
  }, [coords.lat, coords.lng]);

  const saveLocation = (nextLocation) => {
    const value = nextLocation.trim();
    if (!value) {
      toast.error("Delivery address is required");
      return;
    }

    setLocation(value);
    localStorage.setItem("deliveryLocation", value);
    localStorage.setItem("deliveryLocationCoords", JSON.stringify(coords));
    toast.success("Location saved");
    setOpen(false);
  };

  const detectCurrentLocation = () => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      toast.error("Geolocation is not supported in this browser");
      return;
    }

    setIsDetecting(true);

    navigator.geolocation.getCurrentPosition(
      async ({ coords: current }) => {
        const nextCoords = {
          lat: Number(current.latitude.toFixed(6)),
          lng: Number(current.longitude.toFixed(6)),
        };

        setCoords(nextCoords);

        try {
          const response = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${nextCoords.lat}&lon=${nextCoords.lng}&format=jsonv2`
          );
          const data = await response.json();
          const detectedAddress = data?.display_name || "";

          if (detectedAddress) {
            setManualAddress(detectedAddress);
          }
        } catch {
          toast.info("Coordinates updated, but address could not be resolved");
        } finally {
          setIsDetecting(false);
        }
      },
      () => {
        setIsDetecting(false);
        toast.error("Could not read your current location");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  useEffect(() => {
    const savedLocation = localStorage.getItem("deliveryLocation");
    const savedCoords = localStorage.getItem("deliveryLocationCoords");

    if (savedLocation) {
      setLocation(savedLocation);
      setManualAddress(savedLocation);
    }

    if (savedCoords) {
      try {
        const parsed = JSON.parse(savedCoords);
        if (parsed?.lat && parsed?.lng) {
          setCoords({ lat: parsed.lat, lng: parsed.lng });
        }
      } catch {
        localStorage.removeItem("deliveryLocationCoords");
      }
    }
  }, []);

  return (
    <>
      <div className="cursor-pointer py-2 px-3 min-w-[200px] h-9 bg-white rounded-full flex items-center gap-2 justify-center">
        <div className="flex gap-px">
          <div className="w-5 h-5">
            <MapPin />
          </div>
          <span className="text-red-500 text-[12px]">Delivery address:</span>
        </div>

        <button
          type="button"
          onClick={() => setOpen(true)}
          className="flex gap-px items-center"
        >
          <span className="text-[12px] text-[#71717A] max-w-[120px] truncate text-left">
            {location || "Add Location"}
          </span>
          <ChevronRight />
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4"
          onClick={() => setOpen(false)}
        >
          <div
            className="w-full max-w-[560px] bg-white rounded-xl shadow-xl p-5 space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <h2 className="text-lg font-semibold">Select delivery location</h2>
              <p className="text-sm text-[#71717A]">
                Choose from map or use your current location.
              </p>
            </div>

            <div className="w-full h-[280px] rounded-lg border overflow-hidden bg-[#F4F4F5]">
              <iframe
                title="Delivery map"
                src={mapSrc}
                className="w-full h-full"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="flex gap-2">
              <button
                type="button"
                onClick={detectCurrentLocation}
                disabled={isDetecting}
                className="h-10 px-3 rounded-md border border-[#E4E4E7] text-sm"
              >
                {isDetecting ? "Detecting..." : "Use current location"}
              </button>
              <a
                href={`https://www.google.com/maps?q=${coords.lat},${coords.lng}`}
                target="_blank"
                rel="noreferrer"
                className="h-10 px-3 rounded-md border border-[#E4E4E7] text-sm flex items-center"
              >
                Open in Google Maps
              </a>
            </div>

            <input
              value={manualAddress}
              onChange={(e) => setManualAddress(e.target.value)}
              placeholder="Enter or edit your exact address"
              className="w-full border rounded-md h-10 px-3"
            />

            <div className="flex gap-3 justify-end">
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="h-10 px-4 rounded-md border border-[#E4E4E7] text-sm"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => saveLocation(manualAddress)}
                className="h-10 px-4 rounded-md bg-black text-white text-sm"
              >
                Deliver Here
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
