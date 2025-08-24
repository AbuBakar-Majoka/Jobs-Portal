export default function TagsFlter({ tags, setFilter, selectedTags }) {
  console.log(tags);

  const cleanTags = Array.from(
    new Set(
      tags.flatMap((tag) => {
        if (tag.startsWith("[")) {
          return tag
            .replace(/[\[\]]/g, "")
            .split(",")
            .map((t) => t.trim());
        }
        return tag.replace(/[\[\]]/g, "").trim();
      })
    )
  ).filter((tag) => tag.length > 0);

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
      {cleanTags.map((tag, index) => (
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
