import React from "react";

const CreatePostModal = ({ onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl p-6 shadow-xl w-[400px] relative">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-black"
        >
          ✖
        </button>

        <h2 className="text-xl font-bold mb-4">Create Post</h2>
        <textarea
          className="w-full h-24 border p-2 rounded-md"
          placeholder="What's on your mind?"
        ></textarea>
        <button className="mt-4 w-full bg-blue-500 text-white py-2 rounded-lg">
          Post
        </button>
      </div>
    </div>
  );
};

export default CreatePostModal;
