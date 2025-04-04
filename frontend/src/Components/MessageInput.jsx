import React, { useRef, useState } from 'react'
import { useChatStore } from '../store/useChatStore';
import { FileInput, Image, Send, X } from 'lucide-react';
import toast from 'react-hot-toast';

function MessageInput() {
    const [text, setText] = useState("");
    const [imagePrev, setImagePrev] = useState(null);
    const fileInputref = useRef(null);
    const { sendMessage } = useChatStore();

    const handleImageChange = (e) => {
        const file = e.target.files[0];

        if (!file.type.startsWith("image/")) {
            toast.error("Please select a image file");
            return;
      }
      console.log("File ->", file);
        const reader = new FileReader();
      reader.onload = () => {
        console.log("Reader", reader.result);
            setImagePrev(reader.result);

        }
        reader.readAsDataURL(file)
        
        
    }

    const removeImage = () => {
        setImagePrev(null);

        if (fileInputref.current) fileInputref.current.value = "";
        
    }
    const handleSendMessage = async (e) => {
      e.preventDefault();

      console.log("🔹 Sending Message Data:", {
        text: text.trim(),
        image: imagePrev, // ✅ Make sure it's lowercase "image"
      });

      if (!text.trim() && !imagePrev) {
        console.log("⚠️ No text or image to send.");
        return;
      }

      try {
        await sendMessage({
          text: text.trim(),
          image: imagePrev, // ✅ Change "Image" to "image"
        });

        console.log("✅ Message sent successfully!");
        setText("");
        setImagePrev(null);
        if (fileInputref.current) fileInputref.current.value = "";
      } catch (error) {
        console.log("❌ Error sending message:", error);
      }
    };
  return (
    <div className=" p-4  w-full">
      {imagePrev && (
        <div className=" mb-3 flex items-center gap-2">
          <div className=" relative">
            <img
              src={imagePrev}
              alt="Preview"
              className=" w-20 h-20 object-cover  rounded-lg border border-zinc-700"
            />
            <button
              onClick={removeImage}
              className=" absolute -top-1.5 -right-1.5  w-5 h-5 rounded-full bg-base-300 flex items-center justify-center "
            >
              <X className=" size-3" />
            </button>
          </div>
        </div>
      )}
      <form onSubmit={handleSendMessage} className=" flex items-center gap-2">
        <div className="  flex-1  flex gap-2">
          <input
            type="text"
                      value={text}
                      className=' w-full  input input-bordered rounded-lg input-sm sm:input-md'
            onChange={(e) => setText(e.target.value)} // 
            placeholder="Type something..."
                  />
                  
                  <input type="file" name="" id=""
                      accept='image/*'
                      className='hidden'
                      ref={fileInputref}
                      onChange={handleImageChange}
                  
                  />
                  <button type="button" className={`hidden  sm:flex btn btn-circle  ${imagePrev ? "text-emerald-500" : " text-zinc-400"}`}
                  onClick={()=>fileInputref.current?.click()}
                  >
                      <Image size={20}/>
                      
                  </button>
              </div>
              <button type="submit"
                  className=' flex items-center justify-center btn btn-sm btn-circle'
                  disabled={!text.trim() && !imagePrev}
              >
                  <Send size={22}/>
              </button>
      </form>
      Input
    </div>
  );
}

export default MessageInput