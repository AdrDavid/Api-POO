import { prisma } from "../prisma.js";

class CarroController {
  async getAll(req, res) {
    try {
      const carros = await prisma.carro.findMany();
      res.status(200).json(carros);
    } catch (e) {
      res
        .status(500)
        .json({ error: e.message + " erro ao retornar os carros" });
    }
  }

  async cadastro(req, res) {
    try {
      const createCarro = await prisma.carro.create({ data: req.body });
      res.status(200).json({ success: "Carro criado com sucesso!" });
    } catch (e) {
      res.status(500).json({ error: e.message + " erro ao criar o carro" });
    }
  }

  async alterar(req, res) {
    const { id } = req.params;
    try {
      const updateCarro = await prisma.carro.update({
        where: { id: Number(id) },
        data: req.body,
      });
      res.status(200).json({ success: "Carro alterado com sucesso!" });
    } catch (e) {
      res.status(500).json({ error: e.message + " erro ao alterar o carro" });
    }
  }

  async deletar(req, res) {
    const { id } = req.params;
    try {
      const deleteCarro = await prisma.carro.delete({
        where: { id: Number(id) },
      });
      res.status(200).json({ success: "Carro deletado com sucesso!" });
    } catch (e) {
      res.status(500).json({ error: e.message + " erro ao deletar o carro" });
    }
  }
}

export { CarroController };
