export default function LocationFilter({
  setFilter,
  location,
  selectedLocation,
}) {
  return (
    <div className="location dropdown">
      <select
        value={selectedLocation}
        onChange={(e) =>
          setFilter((prev) => ({
            ...prev,
            location: e.target.value,
          }))
        }
      >
        <option value="">Select Location</option>
        {location.map((loc, index) => (
          <option key={index} value={loc}>
            {loc}
          </option>
        ))}
      </select>
    </div>
  );
}
