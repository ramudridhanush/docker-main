import React, { useEffect, useState } from "react";

const AddBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    keyword: "",
    category: "",
    readTime: "",
    summary: "",
    isFavorite: false,
    content: [""],
    images: [],
  });

  const categories = [
    "Technology",
    "Travel",
    "Lifestyle",
    "Food",
    "Business",
    "Health",
  ];

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleContentChange = (index, value) => {
    const updatedContent = [...formData.content];
    updatedContent[index] = value;
    handleInputChange("content", updatedContent);
  };

  const handleImageUrlChange = (e) => {
    const newImageUrl = e.target.value;
    setFormData((prev) => ({
      ...prev,
      images: newImageUrl ? [newImageUrl] : [],
    }));
  };

  const handleSave = async () => {
    const requiredFields = [
      "title",
      "author",
      "keyword",
      "category",
      "readTime",
      "summary",
    ];
    const isValid =
      requiredFields.every((field) => formData[field]) &&
      formData.images.length > 0 &&
      formData.content.every((c) => c.trim() !== "");

    if (!isValid) {
      alert("Please fill in all fields and provide at least 1 image URL.");
      return;
    }

    const newBlog = {
      id: crypto.randomUUID(),
      ...formData,
      comments: [],
      likes: 0,
      uploadedDate: new Date().toISOString(),
      readCount: 0,
    };

    try {
      const response = await fetch("http://localhost:5000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newBlog),
      });

      if (response.ok) {
        console.log("Blog successfully added!");
        getBlogsFromBackend(); 
      } else {
        alert("Failed to add blog.");
      }
    } catch (error) {
      console.error("Failed to add blog to backend", error);
      alert("An error occurred while adding the blog.");
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        console.log("Blog deleted successfully!");
        setBlogs(blogs.filter((blog) => blog.id !== id)); 
      } else {
        alert("Failed to delete blog.");
      }
    } catch (error) {
      console.error("Failed to delete blog from backend", error);
      alert("An error occurred while deleting the blog.");
    }
  };

  useEffect(() => {
    getBlogsFromBackend();
  }, []);

  const getBlogsFromBackend = async () => {
    try {
      const data = await fetch("http://localhost:5000/getUsers");
      const jsonData = await data.json();
      console.log("Fetched blogs:", jsonData);
      setBlogs(jsonData);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  return (
    <div>
      <div className="min-h-screen bg-gray-900 text-white p-5 py-[150px]">
        <div className="max-w-2xl mx-auto bg-gray-800 p-6 rounded-lg shadow-xl">
          <h2 className="text-2xl font-bold mb-6">Create New Blog Post</h2>

          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Blog Title"
              className="col-span-2 p-3 rounded bg-gray-700 border border-gray-600"
              value={formData.title}
              onChange={(e) => handleInputChange("title", e.target.value)}
            />

            <input
              type="text"
              placeholder="Author Name"
              className="p-3 rounded bg-gray-700 border border-gray-600"
              value={formData.author}
              onChange={(e) => handleInputChange("author", e.target.value)}
            />

            <select
              className="p-3 rounded bg-gray-700 border border-gray-600"
              value={formData.category}
              onChange={(e) => handleInputChange("category", e.target.value)}
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Keywords (comma separated)"
              className="p-3 rounded bg-gray-700 border border-gray-600"
              value={formData.keyword}
              onChange={(e) => handleInputChange("keyword", e.target.value)}
            />

            <input
              type="text"
              placeholder="Read Time (e.g., 5 min)"
              className="p-3 rounded bg-gray-700 border border-gray-600"
              value={formData.readTime}
              onChange={(e) => handleInputChange("readTime", e.target.value)}
            />
          </div>

          <textarea
            placeholder="Blog Summary"
            className="w-full p-3 mt-4 rounded bg-gray-700 border border-gray-600"
            rows={3}
            value={formData.summary}
            onChange={(e) => handleInputChange("summary", e.target.value)}
          />

          {formData.content.map((c, index) => (
            <div key={index} className="flex gap-2 items-start mt-4">
              <textarea
                className="flex-1 p-3 rounded bg-gray-700 border border-gray-600"
                rows={5}
                placeholder="Content"
                value={c}
                onChange={(e) => handleContentChange(index, e.target.value)}
              />
              {index === formData.content.length - 1 && (
                <button
                  onClick={() =>
                    handleInputChange("content", [...formData.content, ""])
                  }
                  className="p-2 bg-blue-500 rounded-full hover:bg-blue-600"
                >
                  +
                </button>
              )}
            </div>
          ))}

          <div className="mt-4">
            <input
              type="text"
              placeholder="Paste Image URL"
              onChange={handleImageUrlChange}
              className="w-full p-3 rounded bg-gray-700 border border-gray-600"
            />
            {formData.images.length > 0 && (
              <div className="mt-2">
                <img
                  src={formData.images[0]}
                  alt="Preview"
                  className="w-full h-auto max-h-60 object-cover"
                />
              </div>
            )}
          </div>

          <button
            className="w-full mt-6 p-3 bg-blue-500 rounded font-semibold hover:bg-blue-600 transition"
            onClick={handleSave}
          >
            Publish Blog
          </button>
        </div>
      </div>

      <div className="mt-10">
        {blogs.map((blog) => (
          <div key={blog.id} className="bg-gray-800 p-5 mb-4 rounded-lg">
            <h3 className="text-xl font-semibold">{blog.title}</h3>
            <p className="text-gray-400">{blog.summary}</p>
            <button
              onClick={() => handleDelete(blog.id)}
              className="mt-3 bg-red-500 p-2 rounded text-white hover:bg-red-600"
            >
              Delete Blog
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddBlog;
