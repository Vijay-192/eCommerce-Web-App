import { useState } from "react";
import {
  FiUser,
  FiPhone,
  FiMapPin,
  FiShield,
  FiCreditCard,
  FiEdit2,
} from "react-icons/fi";
import { Button } from "../retroui/Button";

export default function DashboardProfile() {
  const [active, setActive] = useState("profile");
  const [edit, setEdit] = useState(false);

  const [profile, setProfile] = useState({
    name: "Vijay Rovo",
    phone: "9876543210",
    city: "Mumbai",
    state: "Maharashtra",
    image: null,
  });

  const handleChange = e => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImage = e => {
    const file = e.target.files[0];
    if (file) {
      setProfile({ ...profile, image: URL.createObjectURL(file) });
    }
  };

  return (

    <div className="absolute inset-0 -z-10 flex">

  
 <div className="flex relative  h-screen main-w-screen split-bg overflow-hidden">
      {/* ================= SIDEBAR ================= */}
      <div className="w-72  border-r-3 border-black flex flex-col py-5 px-5">
        {/* Profile Top */}
        <div className="flex flex-col items-center py-8 mt-18 border-black bg-white rounded-t-[20px]">
          <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-black bg-gray-200">
            {profile.image ? (
              <img
                src={profile.image}
                alt="profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center font-bold text-xl">
                VR
              </div>
            )}
          </div>

          <h2 className="mt-4 text-lg font-bold flex items-center gap-2">
            {profile.name}
          </h2>
          <p className="text-sm text-gray-500 flex items-center gap-2">
            <FiMapPin size={14} /> {profile.city}
          </p>
        </div>
        <div className="relative w-full h-[6px] bg-black mb-8">
          <div className="absolute top-[4px] left-[4px] w-full h-full bg-gray-400 -z-10"></div>
        </div>
        {/* Navigation */}
        <div className="flex flex-col p-6 gap-6 text-lg font-semibold">
          <Button
            onClick={() => setActive("profile")}
          variant="outline"
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              active === "profile" ? "bg-black text-white" : "hover:bg-gray-200"
            }`}
          >
            <FiUser />
            Profile
          </Button>

          <Button
            onClick={() => setActive("security")}
          variant="outline"
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              active === "security"
                ? "bg-black text-white"
                : "hover:bg-gray-200"
            }`}
          >
            <FiShield />
         Order
          </Button>

          <button
            onClick={() => setActive("billing")}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg transition ${
              active === "billing" ? "bg-black text-white" : "hover:bg-gray-200"
            }`}
          >
            <FiCreditCard />
            Billing
          </button>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="flex-1 flex items-center justify-center p-10">
        {active === "profile" && (
          <div className="w-full max-w-3xl bg-white p-10 rounded-2xl shadow-lg">
            {/* Header */}
            <div className="flex justify-between items-center mb-8">
              <h1 className="text-2xl font-bold flex items-center gap-3">
                <FiUser /> Profile Information
              </h1>

              <button
                onClick={() => setEdit(!edit)}
                className="bg-black text-white px-6 py-2 rounded-lg hover:opacity-80 transition"
              >
                {edit ? "Save" : "Edit"}
              </button>
            </div>

            {/* Form */}
            <div className="grid grid-cols-2 gap-8">
              {/* Image Upload */}
              <div className="relative w-32 h-32 group">
                {/* Profile Image */}
                <div className="w-full h-full rounded-full overflow-hidden border-4 border-black bg-gray-200">
                  {profile.image ? (
                    <img
                      src={profile.image}
                      alt="profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center font-bold text-xl">
                      VR
                    </div>
                  )}
                </div>

                {/* Hover Overlay */}
                {edit && (
                  <>
                    <label
                      htmlFor="profileUpload"
                      className="
          absolute inset-0
          rounded-full
          bg-black/40
          flex items-center justify-center
          opacity-0 group-hover:opacity-100
          transition
          cursor-pointer
        "
                    >
                      <FiEdit2 className="text-white text-2xl" />
                    </label>

                    <input
                      id="profileUpload"
                      type="file"
                      onChange={handleImage}
                      className="hidden"
                    />
                  </>
                )}
              </div>

              {/* Name */}
              <div>
                <label className="flex items-center gap-2 mb-2 font-semibold">
                  <FiUser /> Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  disabled={!edit}
                  className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="flex items-center gap-2 mb-2 font-semibold">
                  <FiPhone /> Phone
                </label>
                <input
                  type="text"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  disabled={!edit}
                  className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              {/* City */}
              <div>
                <label className="flex items-center gap-2 mb-2 font-semibold">
                  <FiMapPin /> City
                </label>
                <input
                  type="text"
                  name="city"
                  value={profile.city}
                  onChange={handleChange}
                  disabled={!edit}
                  className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              {/* State */}
              <div>
                <label className="flex items-center gap-2 mb-2 font-semibold">
                  <FiMapPin /> State
                </label>
                <input
                  type="text"
                  name="state"
                  value={profile.state}
                  onChange={handleChange}
                  disabled={!edit}
                  className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>
          </div>
        )}

        {active === "security" && (
          <div className="w-full max-w-3xl bg-white p-10 rounded-2xl shadow-lg">
            <h1 className="text-2xl font-bold flex items-center gap-3">
              <FiShield /> Security Settings
            </h1>
          </div>
        )}

        {active === "billing" && (
          <div className="w-full max-w-3xl bg-white p-10 rounded-2xl shadow-lg">
            <h1 className="text-2xl font-bold flex items-center gap-3">
              <FiCreditCard /> Billing
            </h1>
          </div>
        )}
      </div>
    </div>

  {/* Content Color */}
</div>
   

  );
}
