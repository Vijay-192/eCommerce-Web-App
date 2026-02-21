import { useState, useEffect } from "react";
import {
  FiUser,
  FiPhone,
  FiMapPin,
  FiShield,
  FiCreditCard,
  FiEdit2,
  FiMail,
  FiTrash2,
  FiChevronDown,
} from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import animation from "../../assets/user.lottie";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { toast } from "sonner";
import axios from "axios";
import { setUser } from "@/redux/userSlice";
import { Input } from "../retroui/Input";

function Profile() {
  const API_BASE_URL = import.meta.env.VITE_API_URL;
  const [active, setActive] = useState("profile");
  const [edit, setEdit] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector(store => store.user);

  const getProfilePic = u => u?.profilePic || u?.profilepic || null;

  const [updateUser, setUpdateUser] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    phoneNo: user?.phoneNo || "",
    address: user?.address || "",
    city: user?.city || "",
    zipCode: user?.zipCode || "",
    profilepic: getProfilePic(user),
    role: user?.role || "user",
  });

  const [file, setFile] = useState(null);
  const [isImage, setIsImage] = useState(false);

  const isImageUrl = url => {
    if (!url) return false;
    if (url.startsWith("blob:")) return true;
    const imageExts = [".jpg", ".jpeg", ".png", ".webp", ".gif", ".svg"];
    return imageExts.some(ext => url.toLowerCase().includes(ext));
  };

  useEffect(() => {
    if (user) {
      const pic = getProfilePic(user);
      setUpdateUser({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
        phoneNo: user.phoneNo || "",
        address: user.address || "",
        city: user.city || "",
        zipCode: user.zipCode || "",
        profilepic: pic,
        role: user.role || "user",
      });
      setFile(null);
      setIsImage(isImageUrl(pic));
    }
  }, [user]);

  const handleChange = e => {
    setUpdateUser({ ...updateUser, [e.target.name]: e.target.value });
  };

  const handleFileChange = e => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    const isImageFile = selectedFile.type.startsWith("image/");
    setIsImage(isImageFile);
    const fileURL = URL.createObjectURL(selectedFile);
    setUpdateUser({ ...updateUser, profilepic: fileURL });
  };

  const handleRemoveImage = () => {
    if (updateUser.profilepic?.startsWith("blob:")) {
      URL.revokeObjectURL(updateUser.profilepic);
    }
    setFile(null);
    setIsImage(false);
    setUpdateUser({ ...updateUser, profilepic: null });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    if (!user?._id) {
      toast.error("User not authenticated");
      return;
    }
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      toast.error("Please login again");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("firstName", updateUser.firstName);
      formData.append("lastName", updateUser.lastName);
      formData.append("email", updateUser.email);
      formData.append("phoneNo", updateUser.phoneNo);
      formData.append("address", updateUser.address);
      formData.append("city", updateUser.city);
      formData.append("zipCode", updateUser.zipCode);
      formData.append("role", updateUser.role);
      if (file) formData.append("file", file);

      const res = await axios.put(
        `${API_BASE_URL}/update/${user._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setUser(res.data.user));
        setEdit(false);
      }
    } catch (error) {
      console.error("Full error:", error);
      toast.error(error.response?.data?.message || "Failed to update profile");
    }
  };

  const currentPic = getProfilePic(user);

  return (
    <div className="min-h-screen w-full flex bg-gray-100">
      {/* ================= SIDEBAR ================= */}
      <div className="w-72 border-r-4 border-black flex flex-col py-6 px-5 bg-white">
        <div className="flex flex-col items-center py-8 gap-3">
          <div className="w-24 h-24 rounded-full border-4 border-black bg-gray-200 overflow-hidden flex items-center justify-center">
            {isImageUrl(currentPic) ? (
              <img
                src={currentPic}
                alt="Profile"
                className="w-full h-full object-cover"
              />
            ) : (
              <DotLottieReact
                src={currentPic || animation}
                loop
                autoplay
                className="w-full h-full"
                style={{
                  transform: "scale(1.25)",
                  transformOrigin: "center center",
                }}
              />
            )}
          </div>
          <p className="text-lg font-bold text-black text-center">
            {user?.firstName || "First"} {user?.lastName || "Last"}
          </p>
          {user?.city && (
            <p className="text-sm text-gray-500 flex items-center gap-1">
              <FiMapPin size={13} /> {user.city}
            </p>
          )}
        </div>

        <div className="w-full h-[4px] bg-black my-2"></div>

        <div className="flex flex-col gap-5 text-lg font-semibold mt-4">
          <button
            onClick={() => setActive("profile")}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg ${active === "profile" ? "bg-black text-white" : "hover:bg-gray-200"}`}
          >
            <FiUser /> Profile
          </button>
          <button
            onClick={() => setActive("security")}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg ${active === "security" ? "bg-black text-white" : "hover:bg-gray-200"}`}
          >
            <FiShield /> Orders
          </button>
          <button
            onClick={() => setActive("billing")}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg ${active === "billing" ? "bg-black text-white" : "hover:bg-gray-200"}`}
          >
            <FiCreditCard /> Billing
          </button>
        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="flex-1 flex justify-center items-start p-10">
        {active === "profile" && (
          <div className="w-full max-w-3xl flex flex-col gap-5">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              {/* Header */}
              <button
                onClick={() => setFormOpen(!formOpen)}
                className="w-full flex items-center justify-between px-8 py-5 hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex items-center gap-4 w-full">
                  {/* Avatar */}
                  <div className="w-14 h-14 rounded-full border-2 border-black bg-gray-100 overflow-hidden flex-shrink-0 flex items-center justify-center">
                    {isImageUrl(currentPic) ? (
                      <img
                        src={currentPic}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <DotLottieReact
                        src={currentPic || animation}
                        loop
                        autoplay
                        className="w-full h-full"
                        style={{
                          transform: "scale(1.25)",
                          transformOrigin: "center center",
                        }}
                      />
                    )}
                  </div>

                  <div className="flex flex-col gap-1 text-left flex-1">
                    <div className="flex items-center gap-3">
                      <h2 className="text-base font-bold text-black">
                        Profile Management
                      </h2>
                      <span
                        className={`text-xs font-semibold px-2.5 py-0.5 rounded-full ${
                          edit
                            ? "bg-yellow-100 text-yellow-700 border border-yellow-300"
                            : "bg-green-100 text-green-700 border border-green-300"
                        }`}
                      >
                        {edit ? "Editing..." : "Up to date"}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm text-gray-500">
                      <span className="flex items-center gap-1.5">
                        <FiUser size={12} className="text-gray-400" />
                        <span className="font-medium text-gray-700">
                          {user?.firstName || "—"} {user?.lastName || ""}
                        </span>
                      </span>
                      {user?.email && (
                        <span className="flex items-center gap-1.5">
                          <FiMail size={12} className="text-gray-400" />
                          {user.email}
                        </span>
                      )}
                      {user?.phoneNo && (
                        <span className="flex items-center gap-1.5">
                          <FiPhone size={12} className="text-gray-400" />
                          {user.phoneNo}
                        </span>
                      )}
                      {(user?.address || user?.city) && (
                        <span className="flex items-center gap-1.5">
                          <FiMapPin size={12} className="text-gray-400" />
                          {[user?.address, user?.city, user?.zipCode]
                            .filter(Boolean)
                            .join(", ")}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div
                  className={`cursor-pointer w-8 h-8 rounded-full flex items-center justify-center border-2 border-black transition-transform duration-300 flex-shrink-0 ml-4 ${formOpen ? "rotate-180" : "rotate-0"}`}
                >
                  <FiChevronDown className="text-black text-sm " />
                </div>
              </button>

              {formOpen && <div className="w-full h-[2px] bg-black" />}

              <div
                className={`transition-all duration-500 ease-in-out overflow-hidden ${formOpen ? "max-h-[2000px] opacity-100" : "max-h-0 opacity-0"}`}
              >
                <div className="p-8 pt-6">
                  {/* Inner Header */}
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-base font-semibold text-gray-500 flex items-center gap-2">
                      <FiUser /> Personal Information
                    </h3>
                    <button
                      type="button"
                      onClick={async () => {
                        if (edit) {
                          await handleSubmit({ preventDefault: () => {} });
                        } else {
                          setEdit(true);
                        }
                      }}
                      className="cursor-pointer bg-black text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-gray-800 transition-colors text-sm"
                    >
                      <FiEdit2 size={14} />
                      {edit ? "Save Changes" : "Edit Profile"}
                    </button>
                  </div>

                  {/* Profile Image */}
                  <div className="relative w-36 h-36 mx-auto mb-10">
                    <div className="relative w-full h-full group">
                      <div className="w-full h-full rounded-full overflow-hidden border-4 border-gray-200 shadow-xl bg-white">
                        {isImage &&
                        updateUser?.profilepic?.startsWith("blob:") ? (
                          <img
                            src={updateUser.profilepic}
                            alt="Profile"
                            className="w-full h-full object-cover"
                            style={{
                              transform: "scale(1.1)",
                              transformOrigin: "center center",
                            }}
                          />
                        ) : isImageUrl(currentPic) ? (
                          <img
                            src={currentPic}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <DotLottieReact
                            src={currentPic || animation}
                            loop
                            autoplay
                            className="w-full h-full"
                            style={{
                              transform: "scale(1.25)",
                              transformOrigin: "center center",
                            }}
                          />
                        )}
                        {edit && (
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-full" />
                        )}
                      </div>

                      {edit && (
                        <>
                          {file ? (
                            <button
                              type="button"
                              onClick={handleRemoveImage}
                              className="absolute bottom-1 right-1 bg-red-600 hover:bg-red-700 text-white rounded-full p-2.5 cursor-pointer transition-all shadow-lg hover:scale-110 border-2 border-white z-10"
                            >
                              <FiTrash2 className="text-sm" />
                            </button>
                          ) : (
                            <label
                              htmlFor="profileUpload"
                              className="absolute bottom-1 right-1 bg-black hover:bg-gray-700 text-white rounded-full p-2.5 cursor-pointer transition-all shadow-lg hover:scale-110 border-2 border-white z-10"
                            >
                              <FiEdit2 className="text-sm" />
                            </label>
                          )}
                          <input
                            id="profileUpload"
                            type="file"
                            accept="image/*,.lottie,.json"
                            className="hidden"
                            onChange={handleFileChange}
                          />
                        </>
                      )}
                    </div>
                  </div>

                  {/* Form Fields */}
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-2 gap-6">
                      {[
                        {
                          label: "First Name",
                          icon: <FiUser />,
                          name: "firstName",
                        },
                        {
                          label: "Last Name",
                          icon: <FiUser />,
                          name: "lastName",
                        },
                        { label: "Email", icon: <FiMail />, name: "email" },
                        { label: "Phone", icon: <FiPhone />, name: "phoneNo" },
                        { label: "City", icon: <FiMapPin />, name: "city" },
                        {
                          label: "Zip Code",
                          icon: <FiMapPin />,
                          name: "zipCode",
                        },
                      ].map((field, index) => (
                        <div className="relative" key={index}>
                          <label className="flex items-center gap-2 mb-2 font-semibold text-sm text-gray-700">
                            {field.icon} {field.label}
                          </label>
                          <Input
                            type="text"
                            name={field.name}
                            value={updateUser[field.name] || ""}
                            onChange={handleChange}
                            disabled={!edit}
                            className="w-full border rounded-lg p-3 pr-10 focus:ring-2 focus:ring-black outline-none disabled:bg-gray-100 disabled:cursor-not-allowed text-sm"
                          />
                          {edit && (
                            <FiEdit2 className="absolute right-3 top-[42px] text-gray-400 text-xs" />
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Address */}
                    <div className="relative mt-6">
                      <label className="flex items-center gap-2 mb-2 font-semibold text-sm text-gray-700">
                        <FiMapPin /> Address
                      </label>

                      <textarea
                        name="address"
                        value={updateUser.address || ""}
                        onChange={handleChange}
                        disabled={!edit}
                        rows={3}
                        className="
    w-full
    border-4 border-black
    bg-white
    p-3
    text-sm
    font-medium
    shadow-[4px_4px_0px_0px_black]
    focus:translate-x-[2px]
    focus:translate-y-[2px]
    focus:shadow-[2px_2px_0px_0px_black]
    focus:outline-none
    transition-all
    disabled:bg-gray-200
    disabled:shadow-none
    disabled:cursor-not-allowed
    resize-none
  "
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
export default Profile;
