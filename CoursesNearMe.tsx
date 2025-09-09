import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { api } from "../mock-api";

// Import Leaflet marker images
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

type Course = {
  id: string;
  name: string;
  address: string;
  latitude: number;
  longitude: number;
};

// Fix default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const CoursesNearMe: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
  if (!navigator.geolocation) {
    setError("Geolocation not supported");
    setLoading(false);
    return;
  }

  navigator.geolocation.getCurrentPosition(
    async (position) => {
      const { latitude, longitude } = position.coords;
      setUserLocation([latitude, longitude]);

      try {
        const nearby = await api.getCoursesNear(latitude, longitude);

        // Map API response to match Course type
        const mappedCourses: Course[] = nearby.map((c: any) => ({
          id: c.id,
          name: c.name,
          address: c.address,
          latitude: c.lat,   // map 'lat' to 'latitude'
          longitude: c.lng,  // map 'lng' to 'longitude'
        }));

        setCourses(mappedCourses);
      } catch {
        setError("Failed to load courses");
      } finally {
        setLoading(false);
      }
    },
    () => {
      setError("Location permission denied");
      setLoading(false);
    }
  );
}, []);


  if (loading) return <p>Loading courses...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="mt-6 p-0 bg-gray rounded-xl">

      {userLocation && (
        <MapContainer
          center={userLocation}
          zoom={13}
          scrollWheelZoom={true}
          className="w-full h-96 rounded-lg mb-4"
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />

          {/* User location marker */}
          <Marker position={userLocation}>
            <Popup>You are here</Popup>
          </Marker>

          {/* Nearby course markers */}
          {courses.map((course) => (
            <Marker key={course.id} position={[course.latitude, course.longitude]}>
              <Popup>
                <b>{course.name}</b>
                <br />
                {course.address}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}


      <ul className="space-y-2">
        {courses.map((c) => (
          <li
            key={c.id}
            className="p-2 border rounded hover:bg-gray-80 transition cursor-pointer"
          >
            <h4 className="font-medium">{c.name}</h4>
            <p className="text-sm text-gray-black">{c.address}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CoursesNearMe;
