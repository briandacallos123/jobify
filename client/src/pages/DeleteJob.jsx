import React from 'react'
import customFetch from '../utils/customFetch'
import { toast } from 'react-toastify';
import { redirect } from 'react-router-dom';

export const action = async ({ params }) => {

  try {
    await customFetch.delete(`/jobs/${params.id}`);
    toast.success("Deleted successfully")
  } catch (error) {
    toast.error("Something went wrong")
  }
  // return null;
  return redirect("/dashboard/all-jobs")
}

const DeleteJob = () => {
  return (
    <h1>DeleteJob</h1>
  )
}

export default DeleteJob