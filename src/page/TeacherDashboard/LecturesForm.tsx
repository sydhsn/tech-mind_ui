import React from "react";
import { Button } from "../../components/ui/button";
import CheckboxField from "../../components/ui/CheckboxField";
import InputField from "../../components/ui/InputField";
import { PlusCircle, Save } from "lucide-react"; // Import icons

// Define the Lecture type
type Lecture = {
  lectureTitle: string;
  videoUrl: string;
  publicId: string;
  isPreviewFree: boolean;
  duration: number;
};

const LecturesForm = ({
  lectures,
  errors,
  handleLectureChange,
  addLecture,
  handleSaveLectures,
}: {
  lectures: Lecture[];
  errors: { [key: string]: string };
  handleLectureChange: (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  addLecture: () => void;
  handleSaveLectures: () => void;
}) => (
  <div className="space-y-4">
    <h2 className="text-xl font-semibold">Lectures</h2>
    {lectures.map((lecture, index) => (
      <div key={index} className="space-y-4 border p-4 rounded-lg">
        <InputField
          label="Lecture Title"
          name="lectureTitle"
          value={lecture.lectureTitle}
          onChange={(e) => handleLectureChange(index, e)}
          error={errors[`lectures[${index}].lectureTitle`]}
        />
        <InputField
          label="Video URL"
          name="videoUrl"
          value={lecture.videoUrl}
          onChange={(e) => handleLectureChange(index, e)}
          error={errors[`lectures[${index}].videoUrl`]}
        />
        <InputField
          label="Public ID"
          name="publicId"
          value={lecture.publicId}
          onChange={(e) => handleLectureChange(index, e)}
          error={errors[`lectures[${index}].publicId`]}
        />
        <InputField
          label="Duration (in minutes)"
          name="duration"
          value={lecture.duration}
          onChange={(e) => handleLectureChange(index, e)}
          type="number"
          error={errors[`lectures[${index}].duration`]}
        />
        <CheckboxField
          label="Free Preview"
          name="isPreviewFree"
          checked={lecture.isPreviewFree}
          onChange={(e) => handleLectureChange(index, e)}
        />
      </div>
    ))}
    <div className="flex gap-4">
      <Button
        variant="outline"
        onClick={addLecture}
        className="border-white text-white hover:bg-gray-700 cursor-pointer flex items-center gap-2"
      >
        <PlusCircle className="w-5 h-5" /> {/* Add Lecture Icon */}
        Add Lecture
      </Button>
      <Button
        variant="outline"
        onClick={handleSaveLectures}
        className="border-white text-white hover:bg-gray-700 cursor-pointer flex items-center gap-2"
      >
        <Save className="w-5 h-5" /> {/* Save Lectures Icon */}
        Save Lectures
      </Button>
    </div>
  </div>
);

export default LecturesForm;
