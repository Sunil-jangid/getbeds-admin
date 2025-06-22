"use client";
import React, { useState, useRef, useEffect } from "react";
import { Pencil } from "lucide-react";
import clsx from "clsx";

const menuItems = ["General Information", "Login & Security", "Manage Notifications"] as const;

const initialFormData = {
  name: "Jane Doe",
  gender: "Female",
  dob: "May 7, 1980",
  age: "30",
  email: "janedoe@gmail.com",
  phone: "000 000 000 000",
  address: "Elm Street 123, Pennsylvania",
  memberId: "12345678",
  policyHolder: "Jane Doe",
  additionalInfo: "NA",
  password: "Jane Doe",
  notifyEmail: true,
  notifySMS: false,
};

type FormDataType = typeof initialFormData;
type FormFieldKey = keyof FormDataType;
type StringFieldKey = Extract<FormFieldKey, Exclude<FormFieldKey, "notifyEmail" | "notifySMS">>;
type BooleanFieldKey = Extract<FormFieldKey, "notifyEmail" | "notifySMS">;

export default function AdminProfile() {
  const [activeMenu, setActiveMenu] = useState<typeof menuItems[number]>("General Information");
  const [editSection, setEditSection] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormDataType>(initialFormData);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editSection && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editSection]);

  const handleChange = (field: StringFieldKey | BooleanFieldKey, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdate = () => {
    setEditSection(null);
  };

  const Section = ({
    title,
    sectionKey,
    children,
  }: {
    title: string;
    sectionKey: string;
    children: React.ReactNode;
  }) => (
    <div className="bg-white p-4 rounded relative space-y-4 shadow ">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-semibold">{title}</h2>
        {editSection !== sectionKey && (
          <button onClick={() => setEditSection(sectionKey)}>
            <Pencil size={16} />
          </button>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">{children}</div>
      {editSection === sectionKey && (
        <div className="flex justify-end mt-4">
          <button
            onClick={handleUpdate}
            className="bg-black text-white px-6 py-2 rounded hover:bg-gray-800"
          >
            Update Information
          </button>
        </div>
      )}
    </div>
  );

  const renderSection = () => {
    switch (activeMenu) {
      case "General Information":
        return (
          <div className="space-y-6">
            <Section title="Demographics" sectionKey="demographics">
              {["name", "gender", "dob", "age"].map((field, idx) =>
                editSection === "demographics" ? (
                  <InputField
                    key={field}
                    label={field as StringFieldKey}
                    value={formData[field as StringFieldKey]}
                    onChange={handleChange}
                    inputRef={idx === 0 ? inputRef : undefined}
                  />
                ) : (
                  <DisplayField
                    key={field}
                    label={field}
                    value={String(formData[field as StringFieldKey])}
                  />
                )
              )}
            </Section>
            <Section title="Contact Information" sectionKey="contact">
              {["email", "phone", "address"].map((field, idx) =>
                editSection === "contact" ? (
                  <InputField
                    key={field}
                    label={field as StringFieldKey}
                    value={formData[field as StringFieldKey]}
                    onChange={handleChange}
                    inputRef={idx === 0 ? inputRef : undefined}
                  />
                ) : (
                  <DisplayField
                    key={field}
                    label={field}
                    value={String(formData[field as StringFieldKey])}
                  />
                )
              )}
            </Section>
            <Section title="Additional Information" sectionKey="additional">
              {["memberId", "policyHolder", "additionalInfo"].map((field, idx) =>
                editSection === "additional" ? (
                  <InputField
                    key={field}
                    label={field as StringFieldKey}
                    value={formData[field as StringFieldKey]}
                    onChange={handleChange}
                    inputRef={idx === 0 ? inputRef : undefined}
                  />
                ) : (
                  <DisplayField
                    key={field}
                    label={field}
                    value={String(formData[field as StringFieldKey])}
                  />
                )
              )}
            </Section>
          </div>
        );
      case "Login & Security":
        return (
          <Section title="Change Password" sectionKey="security">
            {["memberId", "password"].map((field, idx) =>
              editSection === "security" ? (
                <InputField
                  key={field}
                  label={field as StringFieldKey}
                  value={formData[field as StringFieldKey]}
                  onChange={handleChange}
                  inputRef={idx === 0 ? inputRef : undefined}
                />
              ) : (
                <DisplayField
                  key={field}
                  label={field}
                  value={String(formData[field as StringFieldKey])}
                />
              )
            )}
          </Section>
        );
      case "Manage Notifications":
        return (
          <Section title="Notification Preferences" sectionKey="notifications">
            {editSection === "notifications" ? (
              <>
                <CheckboxField
                  label="Notify via Email"
                  field="notifyEmail"
                  checked={formData.notifyEmail}
                  onChange={handleChange}
                />
                <CheckboxField
                  label="Notify via SMS"
                  field="notifySMS"
                  checked={formData.notifySMS}
                  onChange={handleChange}
                />
              </>
            ) : (
              <>
                <DisplayField label="Notify via Email" value={formData.notifyEmail ? "Yes" : "No"} />
                <DisplayField label="Notify via SMS" value={formData.notifySMS ? "Yes" : "No"} />
              </>
            )}
          </Section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row overflow-x-hidden">
      {/* Sidebar */}
      <div className="w-full lg:max-w-[330px] bg-white shadow-md border-r p-6">
        <div className="text-center mb-6">
          <p className="mb-3 font-bold text-xl">Admin Profile</p>
          <img
            src="/pro.png"
            alt="avatar"
            className="w-20 h-20 rounded-full mx-auto"
          />
          <p className="mt-2 font-semibold">Jane Doe</p>
          <p className="text-sm text-gray-500">12 Nov, 2024 | Admin</p>
        </div>
        {menuItems.map((item) => (
          <button
            key={item}
            onClick={() => {
              setActiveMenu(item);
              setEditSection(null);
            }}
            className={clsx(
              "w-full text-left px-4 py-2 rounded mb-2",
              activeMenu === item
                ? "bg-blue-500 text-white font-semibold"
                : "hover:bg-gray-100"
            )}
          >
            {item}
          </button>
        ))}
      </div>

      {/* Main content */}
      <div className="flex-1 p-6 w-full">
        <div className="w-full max-w-7xl mx-auto space-y-6">{renderSection()}</div>
      </div>
    </div>
  );
}

// Display read-only field
const DisplayField = ({ label, value }: { label: string; value: string }) => (
  <div>
    <p className="text-sm text-gray-500 capitalize">{label}</p>
    <p className="font-medium">{value}</p>
  </div>
);

// Input text field with optional auto-focus
const InputField = ({
  label,
  value,
  onChange,
  inputRef,
}: {
  label: StringFieldKey;
  value: string;
  onChange: (key: StringFieldKey, val: string) => void;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}) => (
  <div>
    <label className="block text-sm text-gray-500 capitalize mb-1">{label}</label>
    <input
      ref={inputRef}
      type="text"
      value={value}
      onChange={(e) => onChange(label, e.target.value)}
      className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
    />
  </div>
);

// Checkbox input
const CheckboxField = ({
  label,
  field,
  checked,
  onChange,
}: {
  label: string;
  field: BooleanFieldKey;
  checked: boolean;
  onChange: (field: BooleanFieldKey, value: boolean) => void;
}) => (
  <div className="flex items-center space-x-2">
    <input
      type="checkbox"
      checked={checked}
      onChange={(e) => onChange(field, e.target.checked)}
      className="h-4 w-4"
    />
    <label className="text-sm">{label}</label>
  </div>
);
