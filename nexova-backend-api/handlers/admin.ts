import { RequestHandler } from "express"
import * as adminService from "../services/admin"
import { CREATEADMIN } from "../types/requests/admin"
import bcrypt from "bcrypt"

import { ADMINCREATED, ALREADYUSED } from "../types/responses/admin"
import jwt from "jsonwebtoken"
import Admin from "../models/admins"

import { UPDATEADMIN } from "../types/requests/admin"
import { ADMINLOGOUT , ADMINUPDATED } from "../types/responses/admin";

//CAREFULL CHABEB THIS ENDPOINT IS NOT SECURE , ITS FOR DEMO PURPOSES ONLY
const getAllAdmins: RequestHandler = async (req, res) => {
  const admins = await adminService.getAllAdmins()
  if (!admins || admins.length === 0) {
    res.status(404).send({
      status: "error",
      message: "No Admins found",
    })

    return
  }

  res.status(200).json(admins)

  return
}

const createAdmin: RequestHandler = async (req, res) => {
  const data = req.body
  const payload: CREATEADMIN = {
    email: data.email,
    full_name: data.full_name,
    password: data.password,
    phone: data.phone,
  }

  if (
    !payload.email ||
    !payload.full_name ||
    !payload.password ||
    !payload.phone
  ) {
    res.status(400).send({
      status: "error",
      message: "All fields are required",
    })

    return
  }
  try {
    const emailExists = await adminService.findOneBy("email", payload.email)
    if (emailExists) {
      res.status(400).send({
        status: "error",
        message: "Email already exists",
        field: "email",
      } as ALREADYUSED)

      return
    }
  } catch (e) {
    res.status(500).send({
      status: "error",
      message: "An error occurred while creating the admin",
    })
    return
  }

  try {
    const phoneExists = await adminService.findOneBy("phone", payload.phone)
    if (phoneExists) {
      res.status(400).send({
        status: "error",
        message: "Phone number already exists",
        field: "phone",
      } as ALREADYUSED)

      return
    }
  } catch (e) {
    res.status(500).send({
      status: "error",
      message: "An error occurred while creating the admin",
    })
    return
  }

  const adminRow = new Admin()
  adminRow.email = payload.email
  adminRow.full_name = payload.full_name

  const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS as string))
  try {
    adminRow.password = await bcrypt.hash(payload.password, salt)
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "An error occurred while creating the admin",
    })
    return
  }

  adminRow.phone = payload.phone

  try {
    await adminRow.save()
    let response: any = adminRow
    delete response.password
    res.status(201).json({
      status: "success",
      message: "Admin created  successfully",
      admin: response,
    } as ADMINCREATED)
    return
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "An error occurred while creating the admin",
    })
    return
  }
}

const getOneAdmin: RequestHandler = async (req, res) => {
  const id = req.params.id
  if (!id) {
    res.status(400).send({
      status: "error",
      message: "Id is required",
    })
    return
  }
  const admin = await adminService.getAdminById(parseInt(id))
  if (!admin) {
    res.status(404).send({
      status: "error",
      message: "Admin not found",
    })
    return
  }

  let response: any = admin

  delete response.password

  res.status(200).json(response)
  return
}

const login: RequestHandler = async (req, res, nxt) => {
  const data = req.body
  if (!data.email || !data.password) {
    res.status(400).send({
      status: "error",
      message: "All fields are required",
    })
    return
  }

  let admin: any

  try {
    admin = await adminService.findOneBy("email", data.email)
  } catch (e) {
    res.status(500).send({
      status: "error",
      message: "An error occurred while logging in",
    })
    return
  }
  if (!admin) {
    res.status(404).send({
      status: "error",
      message: "Admin not found",
    })
    return
  }

  const validPassword = await bcrypt.compare(data.password, admin.password)
  if (!validPassword) {
    res.status(400).send({
      status: "error",
      message: "Invalid password",
    })
    return
  }

  let token: string = ""
  try {
    token = jwt.sign({ id: admin.id, role: "admin" }, process.env.SECRET as string, {
      expiresIn: "7d",
    })
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "An error occurred while logging in",
    })
    return
  }

  let adminData: any = admin

  delete adminData.password

  res.status(200).json({
    status: "success",
    message: "Login successful",
    token: token,
    admin: adminData,
  })
  return
}

const getMyProfile: RequestHandler = async (req, res) => {
  const admin = res.locals.admin
  console.log({ admin })
  if (!admin) {
    res.status(404).send({
      status: "error",
      message: "Admin not found",
    })
    return
  }

  let response: any
  try {
    response = await adminService.getAdminById(admin.id)
  } catch (e) {
    res.status(500).send({
      status: "error",
      message: "An error occurred while fetching the admin",
    })
    return
  }
  delete response.password

  res.status(200).json(response)
  return
}

const logout: RequestHandler = async (req, res) => {
    try {
      const response: ADMINLOGOUT = {
        status: "success",
        message: "Admin logged out successfully",
      };
      res.status(200).json(response);
    } catch (error) {
      const response: ADMINLOGOUT = {
        status: "error",
        message: "An error occurred during logout",
      };
      res.status(500).json(response);
    }
};


const updateAdmin: RequestHandler = async (req, res) => {
  const adminId = parseInt(req.params.id); // Extract Admin ID from URL params

  if (!adminId) {
    res.status(400).send({
      status: "error",
      message: "Admin ID is required",
    });
    return;
  }

  const payload: UPDATEADMIN = {
    full_name: req.body.full_name,
    phone: req.body.phone,
    email: req.body.email,
    password: req.body.password,
  };

  // Ensure at least one field is provided for update
  if (!payload.full_name && !payload.phone && !payload.email && !payload.password) {
    res.status(400).send({
      status: "error",
      message: "At least one field (full_name, phone, email, password) must be provided to update",
    });
    return;
  }

  try {
    // If password is provided, hash it
    if (payload.password) {
      const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS as string));
      payload.password = await bcrypt.hash(payload.password, salt);
    }

    // Call the service function to perform the update
    const updatedAdmin = await adminService.updateAdmin(adminId, payload);

    if (!updatedAdmin) {
      res.status(404).send({
        status: "error",
        message: "Admin not found",
      });
      return;
    }

    res.status(200).json({
      status: "success",
      message: "Admin updated successfully",
      admin: updatedAdmin, // Include the updated Admin in the response
    } as ADMINUPDATED);
    return;
  } catch (error: any) {
    res.status(500).send({
      status: "error",
      message: error.message || "An error occurred while updating the admin",
    });
    return;
  }
};

const deleteAdmin: RequestHandler = async (req, res) => {
  const adminId = parseInt(req.params.id); // Extract admin ID from URL params

  if (!adminId) {
    res.status(400).send({
      status: "error",
      message: "Admin ID is required",
    });
    return;
  }

  try {
    // Call the service function to perform the delete
    const isDeleted = await adminService.deleteAdmin(adminId);

    if (!isDeleted) {
      res.status(404).send({
        status: "error",
        message: "Admin not found",
      });
      return;
    }

    res.status(200).send({
      status: "success",
      message: "Admin deleted successfully",
    });
    return;
  } catch (error: any) {
    res.status(500).send({
      status: "error",
      message: error.message || "An error occurred while deleting the Admin",
    });
    return;
  }
};


export { getAllAdmins, createAdmin, getOneAdmin, login, getMyProfile, logout, updateAdmin , deleteAdmin }
