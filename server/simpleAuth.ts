import type { RequestHandler } from "express";
import session from "express-session";
import connectPg from "connect-pg-simple";
import bcrypt from "bcrypt";
import { storage } from "./storage";

// Simple admin credentials
const ADMIN_CREDENTIALS = {
  username: "admin",
  password: "cuca2024"
};

export function getSimpleSession() {
  const sessionTtl = 7 * 24 * 60 * 60 * 1000; // 1 week
  const pgStore = connectPg(session);
  
  const sessionStore = new pgStore({
    conString: process.env.DATABASE_URL,
    createTableIfMissing: false,
    ttl: sessionTtl,
    tableName: "sessions",
  });

  return session({
    secret: process.env.SESSION_SECRET || "cuca-admin-secret-key-2024",
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' || process.env.VERCEL === '1',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: sessionTtl,
      domain: process.env.NODE_ENV === 'production' ? undefined : undefined,
    },
  });
}

export const requireAuth: RequestHandler = (req, res, next) => {
  if (req.session && (req.session as any).isAuthenticated) {
    return next();
  }
  return res.status(401).json({ message: "Unauthorized" });
};

export const loginHandler: RequestHandler = async (req, res) => {
  const { username, password } = req.body;

  // Check for admin login first
  if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
    (req.session as any).isAuthenticated = true;
    (req.session as any).user = {
      id: "admin-1",
      username: "admin",
      email: "admin@cuca.ao",
      firstName: "Admin",
      lastName: "CUCA",
      role: "admin"
    };
    
    res.json({ 
      success: true, 
      message: "Login realizado com sucesso",
      user: (req.session as any).user
    });
    return;
  }

  // Check for regular user login
  try {
    const user = await storage.getCustomerByUsername(username);
    
    if (!user) {
      return res.status(401).json({ 
        success: false, 
        message: "Usuário não encontrado" 
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false, 
        message: "Senha incorreta" 
      });
    }

    if (!user.isActive) {
      return res.status(401).json({ 
        success: false, 
        message: "Conta desativada" 
      });
    }

    (req.session as any).isAuthenticated = true;
    (req.session as any).user = {
      id: user.id,
      username: user.username,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      role: "user"
    };
    
    res.json({ 
      success: true, 
      message: "Login realizado com sucesso",
      user: (req.session as any).user
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ 
      success: false, 
      message: "Erro interno do servidor" 
    });
  }
};

export const logoutHandler: RequestHandler = (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ message: "Erro ao fazer logout" });
    }
    res.clearCookie('connect.sid');
    res.json({ success: true, message: "Logout realizado com sucesso" });
  });
};

export const registerHandler: RequestHandler = async (req, res) => {
  const { name, email, username, password } = req.body;

  if (!name || !email || !username || !password) {
    return res.status(400).json({
      success: false,
      message: "Todos os campos são obrigatórios"
    });
  }

  if (password.length < 6) {
    return res.status(400).json({
      success: false,
      message: "A senha deve ter pelo menos 6 caracteres"
    });
  }

  try {
    // Check if username already exists
    const existingUser = await storage.getCustomerByUsername(username);
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "Nome de usuário já está em uso"
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const [firstName, ...lastNameParts] = name.split(' ');
    const lastName = lastNameParts.join(' ');

    const newUser = await storage.createCustomer({
      username,
      email,
      password: hashedPassword,
      firstName,
      lastName: lastName || null,
      phone: null
    });

    // Auto-login the new user
    (req.session as any).isAuthenticated = true;
    (req.session as any).user = {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email,
      firstName: newUser.firstName,
      lastName: newUser.lastName,
      role: "user"
    };

    res.json({
      success: true,
      message: "Conta criada com sucesso",
      user: (req.session as any).user
    });
  } catch (error: any) {
    console.error("Error during registration:", error);
    
    if (error.code === '23505') { // PostgreSQL unique constraint violation
      if (error.constraint?.includes('email')) {
        return res.status(400).json({
          success: false,
          message: "Email já está em uso"
        });
      }
      if (error.constraint?.includes('username')) {
        return res.status(400).json({
          success: false,
          message: "Nome de usuário já está em uso"
        });
      }
    }

    res.status(500).json({
      success: false,
      message: "Erro interno do servidor"
    });
  }
};

export const getUserHandler: RequestHandler = (req, res) => {
  if (req.session && (req.session as any).isAuthenticated) {
    res.json((req.session as any).user);
  } else {
    res.status(401).json({ message: "Unauthorized" });
  }
};