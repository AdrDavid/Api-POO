import { prisma } from "../prisma.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class AuthController {
  async getAll(req, res) {
    try {
      const usuarios = await prisma.usuario.findMany();
      res.status(200).json(usuarios);
    } catch (e) {
      res
        .status(500)
        .json({ error: e.message + " erro ao retornar os usuários" });
    }
  }
  async login(req, res) {
    const { email, senha } = req.body;

    try {
      // Verificar se o usuário existe
      const usuario = await prisma.usuario.findUnique({
        where: { email },
      });

      if (!usuario) {
        return res.status(401).json({ error: "Usuário não encontrado" });
      }

      // Verificar se a senha está correta
      const senhaValida = await bcrypt.compare(senha, usuario.senha);
      if (!senhaValida) {
        return res.status(401).json({ error: "Senha inválida" });
      }

      // Gerar token JWT
      const token = jwt.sign(
        { id: usuario.id, email: usuario.email },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      res.status(200).json({
        success: "Login realizado com sucesso",
        token,
        usuario: {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
        },
      });
    } catch (e) {
      res.status(500).json({ error: e.message + " erro ao realizar login" });
    }
  }

  async registro(req, res) {
    const { nome, email, senha } = req.body;

    try {
      // Verificar se já existe um usuário com este email
      const usuarioExistente = await prisma.usuario.findUnique({
        where: { email },
      });

      if (usuarioExistente) {
        return res.status(400).json({ error: "Email já cadastrado" });
      }

      // Criptografar a senha
      const salt = await bcrypt.genSalt(10);
      const senhaCriptografada = await bcrypt.hash(senha, salt);

      // Criar novo usuário
      const usuario = await prisma.usuario.create({
        data: {
          nome,
          email,
          senha: senhaCriptografada,
        },
      });

      // Gerar token JWT
      const token = jwt.sign(
        { id: usuario.id, email: usuario.email },
        process.env.JWT_SECRET,
        { expiresIn: "24h" }
      );

      res.status(201).json({
        success: "Usuário criado com sucesso",
        token,
        usuario: {
          id: usuario.id,
          nome: usuario.nome,
          email: usuario.email,
        },
      });
    } catch (e) {
      res.status(500).json({ error: e.message + " erro ao criar usuário" });
    }
  }
}

export { AuthController };
