import { RequestHandler } from "express"
import * as userService from "../services/user"
import { CREATEUSER } from "../types/requests/user"
import bcrypt from "bcrypt"

import { USERCREATED, ALREADYUSED } from "../types/responses/user"
import jwt from "jsonwebtoken"
import User from "../models/users"

import { UPDATEUSER } from "../types/requests/user"
import { USERLOGOUT , USERUPDATED } from "../types/responses/user";

//CAREFULL CHABEB THIS ENDPOINT IS NOT SECURE , ITS FOR DEMO PURPOSES ONLY
const getAllUsers: RequestHandler = async (req, res) => {
  const users = await userService.getAllUsers()
  if (!users || users.length === 0) {
    res.status(404).send({
      status: "error",
      message: "No users found",
    })

    return
  }

  res.status(200).json(users)

  return
}

const createUser: RequestHandler = async (req, res) => {
  const data = req.body
  const payload: CREATEUSER = {
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
    const emailExists = await userService.findOneBy("email", payload.email)
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
      message: "An error occurred while creating the user",
    })
    return
  }

  try {
    const phoneExists = await userService.findOneBy("phone", payload.phone)
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
      message: "An error occurred while creating the user",
    })
    return
  }

  const userRow = new User()
  userRow.email = payload.email
  userRow.full_name = payload.full_name

  const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS as string))
  try {
    userRow.password = await bcrypt.hash(payload.password, salt)
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "An error occurred while creating the user",
    })
    return
  }

  userRow.phone = payload.phone

  try {
    await userRow.save()
    let response: any = userRow
    delete response.password
    res.status(201).json({
      status: "success",
      message: "User created  successfully",
      user: response,
    } as USERCREATED)
    return
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "An error occurred while creating the user",
    })
    return
  }
}

const getOneUser: RequestHandler = async (req, res) => {
  const id = req.params.id
  if (!id) {
    res.status(400).send({
      status: "error",
      message: "Id is required",
    })
    return
  }
  const user = await userService.getUserById(parseInt(id))
  if (!user) {
    res.status(404).send({
      status: "error",
      message: "User not found",
    })
    return
  }

  let response: any = user

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

  let user: any

  try {
    user = await userService.findOneBy("email", data.email)
  } catch (e) {
    res.status(500).send({
      status: "error",
      message: "An error occurred while logging in",
    })
    return
  }
  if (!user) {
    res.status(404).send({
      status: "error",
      message: "User not found",
    })
    return
  }

  const validPassword = await bcrypt.compare(data.password, user.password)
  if (!validPassword) {
    res.status(400).send({
      status: "error",
      message: "Invalid password",
    })
    return
  }

  let token: string = ""
  try {
    token = jwt.sign({ id: user.id }, process.env.SECRET as string, {
      expiresIn: "7d",
    })
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: "An error occurred while logging in",
    })
    return
  }

  let userData: any = user

  delete userData.password

  res.status(200).json({
    status: "success",
    message: "Login successful",
    token: token,
    user: userData,
  })
  return
}

const getMyProfile: RequestHandler = async (req, res) => {
  const user = res.locals.user
  console.log({ user })
  if (!user) {
    res.status(404).send({
      status: "error",
      message: "User not found",
    })
    return
  }

  let response: any
  try {
    response = await userService.getUserById(user.id)
  } catch (e) {
    res.status(500).send({
      status: "error",
      message: "An error occurred while fetching the user",
    })
    return
  }
  delete response.password

  res.status(200).json(response)
  return
}

const logout: RequestHandler = async (req, res) => {
  try {
    const response: USERLOGOUT = {
      status: "success",
      message: "User logged out successfully",
    };
    res.status(200).json(response);
  } catch (error) {
    const response: USERLOGOUT = {
      status: "error",
      message: "An error occurred during logout",
    };
    res.status(500).json(response);
  }
};

const updateUser: RequestHandler = async (req, res) => {
  const userId = parseInt(req.params.id); // Extract User ID from URL params

  if (!userId) {
    res.status(400).send({
      status: "error",
      message: "User ID is required",
    });
    return;
  }

  const payload: UPDATEUSER = {
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
    const updatedUser = await userService.updateUser(userId, payload);

    if (!updatedUser) {
      res.status(404).send({
        status: "error",
        message: "User not found",
      });
      return;
    }

    res.status(200).json({
      status: "success",
      message: "User updated successfully",
      user: updatedUser, // Include the updated User in the response
    } as USERUPDATED);
    return;
  } catch (error: any) {
    res.status(500).send({
      status: "error",
      message: error.message || "An error occurred while updating the User",
    });
    return;
  }
};

const deleteUser: RequestHandler = async (req, res) => {
  const userId = parseInt(req.params.id); // Extract User ID from URL params

  if (!userId) {
    res.status(400).send({
      status: "error",
      message: "User ID is required",
    });
    return;
  }

  try {
    // Call the service function to perform the delete
    const isDeleted = await userService.deleteUser(userId);

    if (!isDeleted) {
      res.status(404).send({
        status: "error",
        message: "User not found",
      });
      return;
    }

    res.status(200).send({
      status: "success",
      message: "User deleted successfully",
    });
    return;
  } catch (error: any) {
    res.status(500).send({
      status: "error",
      message: error.message || "An error occurred while deleting the User",
    });
    return;
  }
};


export { getAllUsers, createUser, getOneUser, login, getMyProfile, logout , deleteUser , updateUser }
