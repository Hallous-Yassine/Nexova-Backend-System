import Admin from "../models/admins"
import { Not } from "typeorm"; 

const getAllAdmins = async () => {
  return await Admin.find()
}

const getAdminById = async (id: number) => {
  if (!id) {
    throw new Error("Id is required")
  }
  return await Admin.findOne({
    where: {
      id,
    },
  })
}

const createAdmin = async (data: any) => {
  if (!data.full_name) {
    throw new Error("Full name is required")
  }
  return await Admin.create(data).save()
}

const findOneBy = async (field: string, value: any) => {
  if (!field || !value) {
    throw new Error("Please provide a field and value to search for")
  }
  return await Admin.findOne({
    where: {
      [field]: value,
    },
  })
}


const updateAdmin = async (id: number, updatedData: Partial<Admin>) => {
  if (!id) {
    throw new Error("Admin ID is required");
  }

  if (!updatedData || Object.keys(updatedData).length === 0) {
    throw new Error("Updated data is required");
  }

  const admin = await Admin.findOne({
    where: { id },
  });

  if (!admin) {
    throw new Error("Admin not found");
  }

  // Check if the new email is already in use by another Admin
  if (updatedData.email) {
    const emailExists = await Admin.findOne({
      where: { email: updatedData.email, id: Not(id) },
    });
    if (emailExists) {
      throw new Error("Email is already in use by another Admin");
    }
  }

  // Update the Admin fields with the new data
  Object.assign(admin, updatedData);

  admin.updatedAt = new Date();

  // Save the updated Admin to the database
  return await admin.save();
};

const deleteAdmin = async (id: number) => {
  if (!id) {
    throw new Error("Admin ID is required");
  }

  const admin = await Admin.findOne({
    where: { id },
  });

  if (!admin) {
    throw new Error("Admin not found");
  }

  // Delete the Admin from the database
  await admin.remove();

  return true; // Return true to indicate successful deletion
};


export { getAllAdmins, getAdminById, createAdmin, findOneBy, updateAdmin, deleteAdmin }
