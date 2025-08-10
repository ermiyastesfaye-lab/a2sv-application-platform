"use client";
import React, { JSX } from "react";
import { ApplicantManagement } from "../../components/ApplicantManagement";
import { useParams } from "next/navigation";

const ManagerDetails = (): JSX.Element => {
  const params = useParams();
  const id = params?.id;
  return <ApplicantManagement id={id} />;
};

export default ManagerDetails;
