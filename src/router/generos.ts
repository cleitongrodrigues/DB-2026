import { Router, Request, Response } from "express";
import { db } from "../db";
import { Genero } from "../model/Genero";
import { error } from "node:console";

const router = Router();

router.get("/", (req: Request, res: Response) => {
    db.all("SELECT * FROM Generos", (err, rows) => {
        if (err) {
            return res.status(500).json({ 
                error: "Erro ao buscar gêneros" 
            });
        }
        
        res.json(rows);
    })
});

router.post("/", (req: Request, res: Response) => {
    const { nome } = req.body;

    if (!nome || nome.trim() === "") {
        return res.status(400).json({
            error: "O campo 'nome' é obrigatório"
        });
    }

    db.run(`INSERT INTO Generos (nome) VALUES (?)`, 
            [nome],
            function(err) {
                if (err){
                    return res.status(500).json({
                        error: "Erro ao criar gênero"
                    });
                }

                res.status(201).json({
                    id: this.lastID,
                    nome
                });
            })
});

router.put("/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { nome } = req.body;

    db.run(`UPDATE Generos SET nome = ? WHERE id = ?`,
        [nome, id],
        function(err){
            if (err){
                return res.status(500).json({
                    error: "Erro ao atualizar gênero"
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    error: "Gênero não encontrado"
                });
            }

            res.json({
                id: id,
                nome
            });
        }
    )
});

router.delete("/:id", (req: Request, res: Response) => {
    const id = Number(req.params.id);

    db.run(`DELETE FROM Generos WHERE id = ?`,
        [id],
        function (err){
            if (err){
                return res.status(500).json({
                    error: "Erro ao deletar gênero"
                });
            }

            if (this.changes === 0) {
                return res.status(404).json({
                    error: "Gênero não encontrado"
                });
            }

            res.status(200).json({
                message: "Gênero deletado com sucesso"
            });
        }
    );

});

export default router;