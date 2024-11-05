import { prisma } from "../prisma.js";

class CategoriaController {
  async getAll(req, res) {
    try {
      const categorias = await prisma.categoria.findMany();
      res.status(200).json(categorias);
    } catch (e) {
      res
        .status(500)
        .json({ error: e.message + " erro ao retornar as categorias" });
    }
  }

  async cadastro(req, res) {
    try {
      const createCategoria = await prisma.categoria.create({ data: req.body });
      res.status(200).json({ success: "Categoria criada com sucesso!" });
    } catch (e) {
      res.status(500).json({ error: e.message + " erro ao criar a categoria" });
    }
  }

  async alterar(req, res) {
    const { id } = req.params;
    try {
      const updateCategoria = await prisma.categoria.update({
        where: { id: Number(id) },
        data: req.body,
      });
      res.status(200).json({ success: "Categoria alterada com sucesso!" });
    } catch (e) {
      res
        .status(500)
        .json({ error: e.message + " erro ao alterar a categoria" });
    }
  }

  async deletar(req, res) {
    const { id } = req.params;
    try {
      const deleteCategoria = await prisma.categoria.delete({
        where: { id: Number(id) },
      });
      res.status(200).json({ success: "Categoria deletada com sucesso!" });
    } catch (e) {
      res
        .status(500)
        .json({ error: e.message + " erro ao deletar a categoria" });
    }
  }
}

export { CategoriaController };
