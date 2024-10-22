import React, { useState } from 'react';
import { collection, addDoc } from "firebase/firestore"; 
import { db, auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth'; 

const NoteForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [user] = useAuthState(auth); 

  const handleAddNote = async () => {
    try {
      if (user) { 
        await addDoc(collection(db, "notes"), {
          title,
          content,
          category,
          createdAt: new Date(),
          userId: user.uid, 
        });

        setTitle('');
        setContent('');
        setCategory('');
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4 bg-gradient-to-r from-blue-500 to-green-500">
      <h1 className="text-5xl font-bold text-white mb-4">Note</h1>
      <div className="flex items-center justify-center w-full">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border flex-1 mr-2 bg-white"
        />
        <input
          type="text"
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="p-2 border flex-1 mr-2 bg-white"
        />
        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="p-2 border flex-1 mr-2 bg-white"
        />
        <button
          onClick={handleAddNote}
          className="bg-blue-500 hover:bg-red-600 p-2 text-white rounded-lg shadow-lg transition duration-300 transform hover:scale-105"
        >
          Add Note
        </button>
      </div>
    </div>
  );
};

export default NoteForm;
