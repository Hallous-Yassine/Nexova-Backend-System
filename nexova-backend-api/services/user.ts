import User from "../models/users"
import { Not } from "typeorm"; 

const getAllUsers = async () => {
  return await User.find()
}

const getUserById = async (id: number) => {
  if (!id) {
    throw new Error("Id is required")
  }
  return await User.findOne({
    where: {
      id,
    },
  })
}

const createUser = async (data: any) => {
  if (!data.full_name) {
    throw new Error("Full name is required")
  }
  return await User.create(data).save()
}

const findOneBy = async (field: string, value: any) => {
  if (!field || !value) {
    throw new Error("Please provide a field and value to search for")
  }
  return await User.findOne({
    where: {
      [field]: value,
    },
  })
}


const updateUser = async (id: number, updatedData: Partial<User>) => {
  if (!id) {
    throw new Error("User ID is required");
  }

  if (!updatedData || Object.keys(updatedData).length === 0) {
    throw new Error("Updated data is required");
  }

  const user = await User.findOne({
    where: { id },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Check if the new email is already in use by another User
  if (updatedData.email) {
    const emailExists = await User.findOne({
      where: { email: updatedData.email, id: Not(id) },
    });
    if (emailExists) {
      throw new Error("Email is already in use by another User");
    }
  }

  // Update the User fields with the new data
  Object.assign(user, updatedData);

  user.updatedAt = new Date();

  // Save the updated user to the database
  return await user.save();
};

const deleteUser = async (id: number) => {
  if (!id) {
    throw new Error("User ID is required");
  }

  const user = await User.findOne({
    where: { id },
  });

  if (!user) {
    throw new Error("User not found");
  }

  // Delete the User from the database
  await user.remove();

  return true; // Return true to indicate successful deletion
};

export { getAllUsers, getUserById, createUser, findOneBy, updateUser , deleteUser}
