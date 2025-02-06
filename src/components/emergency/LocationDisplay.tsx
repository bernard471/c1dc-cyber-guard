import { MapPin } from 'lucide-react';

interface LocationDisplayProps {
  location: {
    latitude: number;
    longitude: number;
  } | null;
}

export const LocationDisplay = ({ location }: LocationDisplayProps) => {
  if (!location) return null;

  return (
    <div className="flex items-center gap-2 text-sm text-gray-600">
      <MapPin className="h-4 w-4 text-blue-500" />
      <span>
        {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
      </span>
    </div>
  );
};
