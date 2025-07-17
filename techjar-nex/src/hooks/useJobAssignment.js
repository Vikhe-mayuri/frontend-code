// src/hooks/useJobAssignment.js
import { assignJobToSubvendor } from "../services/assignmentService";
import { toast } from "react-toastify";

export const useJobAssignment = (token) => {
  const assignJob = async (subVendorId, job) => {
    try {
      await assignJobToSubvendor(subVendorId, job.id, token);
      saveToLocal(subVendorId, job);
      toast.success(`Job "${job.title}" assigned.`);
    } catch (error) {
      console.error("Assignment failed:", error);
      toast.error("Failed to assign job.");
    }
  };

  const assignJobToAll = async (subVendors, job) => {
    try {
      await Promise.all(
        subVendors.map((vendor) =>
          assignJobToSubvendor(vendor.id, job.id, token)
        )
      );
      subVendors.forEach((vendor) => saveToLocal(vendor.id, job));
      toast.success(`Job "${job.title}" assigned to all.`);
    } catch (error) {
      console.error("Bulk assignment failed:", error);
      toast.error("Failed to assign to all.");
    }
  };

  const saveToLocal = (subVendorId, job) => {
    const key = `subVendorJobs_${subVendorId}`;
    const existing = JSON.parse(localStorage.getItem(key)) || [];
    const updated = [...existing, job];
    localStorage.setItem(key, JSON.stringify(updated));
  };

  return { assignJob, assignJobToAll };
};
