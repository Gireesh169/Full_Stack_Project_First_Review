import React, { useState, useEffect } from 'react';
import './CityNews.css';

const CityNews = () => {
  const [news, setNews] = useState(() => {
    try {
      const stored = localStorage.getItem("cityNews");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("General");
  const [showForm, setShowForm] = useState(false);

  const categories = ["General", "Event", "Alert", "Update", "Award"];
  const categoryIcons = {
    "General": "📰",
    "Event": "🎉",
    "Alert": "⚠️",
    "Update": "🔄",
    "Award": "🏆"
  };

  useEffect(() => {
    localStorage.setItem("cityNews", JSON.stringify(news));
  }, [news]);

  const addNews = (e) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;

    const newItem = {
      id: Date.now(),
      title: title.trim(),
      description: description.trim(),
      category,
      icon: categoryIcons[category],
      createdAt: new Date().toISOString(),
      likes: 0
    };

    setNews([newItem, ...news]);
    setTitle("");
    setDescription("");
    setCategory("General");
    setShowForm(false);
  };

  const deleteNews = (id) => {
    setNews(news.filter(item => item.id !== id));
  };

  const toggleLike = (id) => {
    setNews(news.map(item =>
      item.id === id ? { ...item, likes: (item.likes || 0) + 1 } : item
    ));
  };

  return (
    <div className="cn-container">
      <div className="cn-page">
        {/* Header */}
        <div className="cn-header">
          <h1>📰 City News & Announcements</h1>
          <p>Stay updated with the latest news and announcements from your city</p>
          <button
            className="cn-btn-primary"
            onClick={() => setShowForm(!showForm)}
          >
            {showForm ? "✕ Close" : "+ New Announcement"}
          </button>
        </div>

        {/* Form Section */}
        {showForm && (
          <div className="cn-form-container">
            <h2>Create New Announcement</h2>
            <form onSubmit={addNews} className="cn-form">
              <label>
                Title
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter announcement title"
                  required
                />
              </label>

              <label>
                Category
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {categoryIcons[cat]} {cat}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Description
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter full details of the announcement"
                  rows={4}
                  required
                />
              </label>

              <button type="submit" className="cn-btn-submit">
                📤 Publish
              </button>
            </form>
          </div>
        )}

        {/* News Feed */}
        <div className="cn-feed">
          {news.length === 0 ? (
            <div className="cn-empty">
              <div className="cn-empty-icon">📭</div>
              <p>No announcements yet</p>
              <small>Check back later for city updates</small>
            </div>
          ) : (
            news.map((item) => (
              <div key={item.id} className="cn-card">
                <div className="cn-card-header">
                  <div className="cn-badge">{item.icon} {item.category}</div>
                  <span className="cn-date">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </span>
                </div>

                <h3 className="cn-title">{item.title}</h3>
                <p className="cn-description">{item.description}</p>

                <div className="cn-card-footer">
                  <button
                    className="cn-like-btn"
                    onClick={() => toggleLike(item.id)}
                  >
                    👍 {item.likes || 0}
                  </button>
                  <button
                    className="cn-delete-btn"
                    onClick={() => deleteNews(item.id)}
                    title="Delete announcement"
                  >
                    🗑️
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default CityNews;
