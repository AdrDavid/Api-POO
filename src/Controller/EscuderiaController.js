import { prisma } from "../prisma.js";

class escuderiaController {
  async getAll(req, res, next) {
    try {
      const escuderia = await prisma.escuderia.findMany({
        orderBy: {
          pontos: "desc",
        },
      });
      res.status(200).json(escuderia);
    } catch (e) {
      res
        .status(500)
        .json({ error: e.message + " erro ao retornar as escuderias" });
    }
  }

  async cadastro(req, res, next) {
    try {
      const createEscuderia = await prisma.escuderia.create({ data: req.body });
      res.status(200).json(createEscuderia);
    } catch (e) {
      res
        .status(500)
        .json({ error: e.message + " erro ao retornar as escuderias" });
    }
  }

  async alterar(req, res, next) {
    const { id } = req.params;

    try {
      const updateEscuderia = await prisma.escuderia.updateMany({
        where: {
          id: Number(id),
        },
        data: req.body,
      });
      res.status(200).json(updateEscuderia);
    } catch (e) {
      res
        .status(500)
        .json({ error: e.message + " erro ao alterar a escuderias" });
    }
  }

  async deletar(req, res, next) {
    const { id } = req.params;

    try {
      const deleteEscuderia = await prisma.escuderia.deleteMany({
        where: {
          id: Number(id),
        },
      });
      res.status(200).json(deleteEscuderia);
    } catch (e) {
      res
        .status(500)
        .json({ error: e.message + " erro ao deletar a escuderias" });
    }
  }

  async atualizarPontos(req, res, next) {
    const { id } = req.params;
    const { pontos } = req.body;

    try {
      const escuderia = await prisma.escuderia.update({
        where: { id: Number(id) },
        data: { pontos: { increment: pontos } },
      });
      res.status(200).json(escuderia);
    } catch (e) {
      res.status(500).json({
        error: e.message + " erro ao atualizar os pontos da escuderia",
      });
    }
  }
}

export { escuderiaController };
