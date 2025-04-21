import { StatusCodes } from "http-status-codes";
export async function adminMiddleware(req, res, next) {
    var _a;
    const adminHeader = req.headers.authorization;
    if (!adminHeader) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Authorization error: Unable to confirm status" });
    }
    const status = (_a = adminHeader.split(" ")[1]) === null || _a === void 0 ? void 0 : _a.replace(/^"|"$/g, "");
    if (!status || typeof status !== "string") {
        return res.status(StatusCodes.FORBIDDEN).json({ message: "User does not have access rights" });
    }
    try {
        if (status !== "admin") {
            return res.status(StatusCodes.FORBIDDEN).json({ message: "Access denied: insufficient rights" });
        }
        next();
    }
    catch (error) {
        console.error("Error in adminMiddleware:", error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Internal server error" });
    }
}
//# sourceMappingURL=admin.middleware.js.map