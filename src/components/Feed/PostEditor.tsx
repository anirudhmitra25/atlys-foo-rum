import React, { useState } from "react";
import {
  RiParagraph,
  RiBold,
  RiItalic,
  RiUnderline,
  RiListOrdered,
  RiListUnordered,
  RiCodeBlock,
  RiDoubleQuotesL,
  RiAddLine,
  RiMore2Fill,
} from "react-icons/ri";
import { BsChevronDown } from "react-icons/bs";
import Button from "../common/Button";
import { Dropdown } from "../common";
import type { DropdownOption } from "../common/Dropdown";
import publishIcon from "../../assets/publish.svg";
import deleteIcon from "../../assets/delete.svg";
import videoCamIcon from "../../assets/video_cam.svg";
import recordIcon from "../../assets/record_black.svg";

const PostEditor = ({
  onPublish,
}: {
  onPublish: (content: string) => void;
}) => {
  const [postContent, setPostContent] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("paragraph");

  const handlePublish = () => {
    if (postContent.trim()) {
      onPublish(postContent);
      setPostContent("");
    } else {
      alert("Please write something before publishing!");
    }
  };

  const handleNotImplemented = (feature: string) => {
    alert(`${feature} function not implemented`);
  };

  // Paragraph format options
  const paragraphOptions: DropdownOption[] = [
    { value: "paragraph", label: "Paragraph", icon: RiParagraph },
    { value: "heading1", label: "Heading 1" },
    { value: "heading2", label: "Heading 2" },
    { value: "heading3", label: "Heading 3" },
  ];

  // Formatting options for mobile dropdown
  const formatOptions: DropdownOption[] = [
    {
      value: "bold",
      label: "Bold",
      icon: RiBold,
      onClick: () => handleNotImplemented("Bold"),
    },
    {
      value: "italic",
      label: "Italic",
      icon: RiItalic,
      onClick: () => handleNotImplemented("Italic"),
    },
    {
      value: "underline",
      label: "Underline",
      icon: RiUnderline,
      onClick: () => handleNotImplemented("Underline"),
    },
    {
      value: "bulleted",
      label: "Bulleted list",
      icon: RiListUnordered,
      onClick: () => handleNotImplemented("Bulleted list"),
    },
    {
      value: "numbered",
      label: "Numbered list",
      icon: RiListOrdered,
      onClick: () => handleNotImplemented("Numbered list"),
    },
    {
      value: "quote",
      label: "Quote",
      icon: RiDoubleQuotesL,
      onClick: () => handleNotImplemented("Quote"),
    },
    {
      value: "code",
      label: "Code block",
      icon: RiCodeBlock,
      onClick: () => handleNotImplemented("Code block"),
    },
  ];

  return (
    <div className="rounded-3xl p-2 bg-[#00000008]">
      <div className="rounded-3xl border border-gray-200 bg-white shadow-sm w-full mx-auto">
        {/* Toolbar */}
        <div className="flex items-center gap-2 p-2">
          {/* Paragraph dropdown */}
          <Dropdown
            options={paragraphOptions}
            selectedValue={selectedFormat}
            onSelect={(option) => setSelectedFormat(option.value)}
            triggerClassName="bg-[#00000008] border-none text-xs"
            dropdownClassName="min-w-[150px]"
          />

          {/* Desktop formatting buttons (hidden on mobile) */}
          <div className="hidden min-[600px]:flex items-center gap-2 p-1 bg-[#00000008] rounded-xl">
            {/* Formatting buttons */}
            <Button
              type="TERTIARY"
              onClick={() => handleNotImplemented("Bold")}
              className="p-2 !py-2 !px-2 hover:!bg-white hover:shadow-sm transition-all duration-200 ease-in-out transform hover:scale-105 rounded-lg"
            >
              <RiBold className="text-gray-600" />
            </Button>
            <Button
              type="TERTIARY"
              onClick={() => handleNotImplemented("Italic")}
              className="p-2 !py-2 !px-2 hover:!bg-white hover:shadow-sm transition-all duration-200 ease-in-out transform hover:scale-105 rounded-lg"
            >
              <RiItalic className="text-gray-600" />
            </Button>
            <Button
              type="TERTIARY"
              onClick={() => handleNotImplemented("Underline")}
              className="p-2 !py-2 !px-2 hover:!bg-white hover:shadow-sm transition-all duration-200 ease-in-out transform hover:scale-105 rounded-lg"
            >
              <RiUnderline className="text-gray-600" />
            </Button>

            {/* Separator */}
            <div className="w-px h-6 bg-gray-300 mx-1"></div>

            {/* List buttons */}
            <Button
              type="TERTIARY"
              onClick={() => handleNotImplemented("Bulleted list")}
              className="p-2 !py-2 !px-2 hover:!bg-white hover:shadow-sm transition-all duration-200 ease-in-out transform hover:scale-105 rounded-lg"
            >
              <RiListUnordered className="text-gray-600" />
            </Button>
            <Button
              type="TERTIARY"
              onClick={() => handleNotImplemented("Numbered list")}
              className="p-2 !py-2 !px-2 hover:!bg-white hover:shadow-sm transition-all duration-200 ease-in-out transform hover:scale-105 rounded-lg"
            >
              <RiListOrdered className="text-gray-600" />
            </Button>

            {/* Separator */}
            <div className="w-px h-6 bg-gray-300 mx-1"></div>

            {/* Quote and code buttons */}
            <Button
              type="TERTIARY"
              onClick={() => handleNotImplemented("Quote")}
              className="p-2 !py-2 !px-2 hover:!bg-white hover:shadow-sm transition-all duration-200 ease-in-out transform hover:scale-105 rounded-lg"
            >
              <RiDoubleQuotesL className="text-gray-600" />
            </Button>
            <Button
              type="TERTIARY"
              onClick={() => handleNotImplemented("Code block")}
              className="p-2 !py-2 !px-2 hover:!bg-white hover:shadow-sm transition-all duration-200 ease-in-out transform hover:scale-105 rounded-lg"
            >
              <RiCodeBlock className="text-gray-600" />
            </Button>
          </div>

          {/* Mobile formatting dropdown (visible only on mobile) */}
          <Dropdown
            className="min-[600px]:hidden"
            options={formatOptions}
            placeholder="Format"
            triggerClassName="bg-[#00000008] border-none !p-2"
            dropdownClassName="min-w-[180px]"
            showChevron={false}
            renderTrigger={() => <RiMore2Fill className="text-gray-600" />}
          />

          {/* Spacer */}
          <div className="flex-1"></div>

          {/* Delete button */}
          <Button
            type="TERTIARY"
            onClick={() => handleNotImplemented("Delete")}
            className="p-2 !py-2 !px-2 hover:!bg-red-50 !text-red-500"
          >
            <img src={deleteIcon} alt="Delete" className="w-5 h-5" />
          </Button>
        </div>

        {/* Text Input Area */}
        <div className="p-2">
          <div className="flex items-start gap-3">
            {/* <span className="text-2xl">😊</span> */}
            <textarea
              value={postContent}
              onChange={(e) => setPostContent(e.target.value)}
              placeholder="How are you feeling today?"
              className="flex-1 min-h-[120px] p-3 text-gray-700 placeholder-gray-400 border-none outline-none resize-none text-lg"
              style={{ fontFamily: "system-ui, sans-serif" }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <Button
              type="TERTIARY"
              onClick={() => handleNotImplemented("Add attachment")}
              className="p-2 !py-2 !px-2 rounded-full"
            >
              <RiAddLine className="text-gray-600 text-xl" />
            </Button>
            <Button
              type="TERTIARY"
              onClick={() => handleNotImplemented("Record audio")}
              className="p-2 !py-2 !px-2 rounded-full"
            >
              <img src={recordIcon} alt="Record" className="w-5 h-5" />
            </Button>
            <Button
              type="TERTIARY"
              onClick={() => handleNotImplemented("Record video")}
              className="p-2 !py-2 !px-2 rounded-full"
            >
              <img src={videoCamIcon} alt="Video" className="w-5 h-5" />
            </Button>
          </div>

          {/* Publish Button */}
          <Button
            type="TERTIARY"
            onClick={handlePublish}
            className="flex items-center justify-center w-10 h-10 !p-0 rounded-full"
          >
            <img src={publishIcon} alt="Publish" className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PostEditor;
