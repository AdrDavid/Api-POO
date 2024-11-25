import { prisma } from "../prisma.js";

class PilotoController {
  async getAll(req, res, next) {
    try {
      const pilotos = await prisma.piloto.findMany({
        include: {
          escuderia: true,
          carro: true,
        },
        orderBy: {
          pontos: "desc",
        },
      });
      res.status(200).json(pilotos);
    } catch (e) {
      res
        .status(500)
        .json({ error: e.message + " erro ao retornar os pilotos" });
    }
  }

  async getById(req, res, next) {
    const { id } = req.params;
    try {
      const piloto = await prisma.piloto.findUnique({
        where: { id: Number(id) },
        include: {
          escuderia: true,
          carro: true,
        },
      });
      res.status(200).json(piloto);
    } catch (e) {
      res.status(500).json({ error: e.message + " erro ao retornar o piloto" });
    }
  }

  async cadastro(req, res, next) {
    try {
      const createPiloto = await prisma.piloto.create({ data: req.body });
      res
        .status(200)
        .json({ success: "Piloto criado com sucesso!", piloto: createPiloto });
    } catch (e) {
      res
        .status(500)
        .json({ error: e.message + " erro ao cadastrar o piloto" });
    }
  }

  async alterar(req, res, next) {
    const { id } = req.params;

    try {
      const updatePiloto = await prisma.piloto.update({
        where: { id: Number(id) },
        data: req.body,
      });
      res.status(200).json({
        success: "Piloto alterado com sucesso!",
        piloto: updatePiloto,
      });
    } catch (e) {
      res.status(500).json({ error: e.message + " erro ao alterar o piloto" });
    }
  }

  async deletar(req, res, next) {
    const { id } = req.params;

    try {
      await prisma.piloto.delete({
        where: { id: Number(id) },
      });
      res.status(200).json({ success: "Piloto deletado com sucesso!" });
    } catch (e) {
      res.status(500).json({ error: e.message + " erro ao deletar o piloto" });
    }
  }

  async atualizarPontos(req, res, next) {
    const { id } = req.params;
    const { pontos } = req.body;

    try {
      const pilotoAtual = await prisma.piloto.findUnique({
        where: { id: Number(id) },
        include: { escuderia: true },
      });

      if (!pilotoAtual) {
        return res.status(404).json({ error: "Piloto não encontrado" });
      }

      const pontosNovos = pilotoAtual.pontos + pontos;

      // Atualizar os pontos do piloto
      await prisma.piloto.update({
        where: { id: Number(id) },
        data: { pontos: pontosNovos },
      });

      // Calcular a diferença de pontos e atualizar a escuderia com essa diferença

      if (pilotoAtual.escuderiaId) {
        await prisma.escuderia.update({
          where: { id: pilotoAtual.escuderiaId },
          data: {
            pontos: {
              increment: pontos,
            },
          },
        });
      }

      res.status(200).json({
        success: "Pontuação do piloto e da escuderia atualizadas com sucesso!",
      });
    } catch (e) {
      res
        .status(500)
        .json({ error: e.message + " erro ao atualizar os pontos do piloto" });
    }
  }
}

export { PilotoController };
