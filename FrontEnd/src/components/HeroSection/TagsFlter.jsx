export default function TagsFlter({ tags, setFilter, selectedTags }) {
  const handleChange = (e) => {
    const { value, checked } = e.target;

    setFilter((prev) => {
      let newTags = prev.tags || [];

      if (checked) {
        newTags = [...newTags, value];
      } else {
        newTags = newTags.filter((t) => t !== value);
      }

      return { ...prev, tags: newTags };
    });
  };

  return (
    <div className="tags">
      {tags.map((tag, index) => (
        <div key={index} className="tags_container">
          <span>{tag}</span>
          <input
            type="checkbox"
            name="tags"
            value={tag}
            checked={selectedTags.includes(tag)}
            onChange={handleChange}
          />
        </div>
      ))}
    </div>
  );
}
