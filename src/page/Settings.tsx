import { useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

export default function Settings() {
  const [notifications, setNotifications] = useState(true);
  const [password, setPassword] = useState("");

  return (
    <div className="bg-gray-900 text-white h-[calc(100vh-114px)] flex items-center justify-center">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold text-center mb-6">Settings</h2>

        {/* Notification Toggle */}
        <div className="flex justify-between items-center mb-4">
          <span className="text-gray-300">Enable Notifications</span>
          <Button
            onClick={() => setNotifications(!notifications)}
            className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
              notifications ? "bg-green-500" : "bg-gray-600"
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full shadow-md transform transition ${
                notifications ? "translate-x-6" : "translate-x-0"
              }`}
            ></div>
          </Button>
        </div>

        {/* Change Password */}
        <div className="mb-4">
          <label className="block text-gray-300 mb-1">New Password</label>
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 rounded bg-gray-700 text-white border border-gray-600 focus:outline-none"
            placeholder="Enter new password"
          />
        </div>

        {/* Save Button */}
        <Button className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-500 transition cursor-pointer">
          Save Settings
        </Button>
      </div>
    </div>
  );
}
