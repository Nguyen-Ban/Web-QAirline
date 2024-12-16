const jwt = require("jsonwebtoken");

exports.verifyToken = (req, res, next) => {
  // Split req to get token
  let token = "";
  if (req?.headers?.authorization?.split(" ")?.[1]) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) return res.status(403).json({ error: "Token is required" });

  try {
    const decoded = jwt.verify(token, "secretkey");
    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
};

exports.verifyAdmin = (req, res, next) => {
  this.verifyToken(req, res, () => {
    if (req.userRole === "admin") next();
    else res.status(403).json({ error: "Admin access required" });
  });
};
