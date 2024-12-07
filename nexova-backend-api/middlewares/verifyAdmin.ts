import { Request, Response, NextFunction } from "express";
import * as adminService from "../services/admin";

const verifyAdmin = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    // Get the user data from auth middleware
    const userData = res.locals.user;

    // Check if the user has the role of 'admin'
    if (userData.role !== "admin") {
      res.status(403).json({ status: "error", message: "Access denied" });
      return; // End the response cycle
    }

    // Check if the user exists in the Admin table
    const admin = await adminService.getAdminById(userData.id);
    if (!admin) {
      res.status(403).json({ status: "error", message: "Access denied" });
      return; // End the response cycle
    }

    // Attach admin info to res.locals for further usage
    res.locals.admin = admin;
    next(); // Pass control to the next middleware
  } catch (error) {
    res.status(500).json({ status: "error", message: "Internal server error" });
  }
};

export default verifyAdmin;
