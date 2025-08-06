import React from "react";

interface AdminUserProps {
  title?: string;
  text?: string;
  children?: React.ReactNode;
  actionButton?: React.ReactNode; // 👈 Optional button or action element
}

const AdminUser = ({ title, text, children, actionButton }: AdminUserProps) => {
  return (
    <div className="text-black bg-gray-100 max-w-[6xl] w-[80%] mx-auto my-10">
      <div className="mb-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-sm text-gray-500">{text}</p>
          </div>
          {actionButton && <div>{actionButton}</div>}
        </div>
      </div>
      {children}
    </div>
  );
};

export default AdminUser;
