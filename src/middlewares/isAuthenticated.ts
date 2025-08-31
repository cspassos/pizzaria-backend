import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface PayLoad{
    sub: string;
}

export function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
){
    //Receber token
    const authToken = req.headers.authorization;

    if(!authToken){
        return res.status(401).end();
    }

    const [, token] = authToken.split(" ")// ele vem como "Bear token....", como eu quero pegar apenas o token entao fica split depois do espaço

    try {
        //Validar esse token e retorna o id do usuario logado
        const { sub } = verify( //sub é o id que fica no token
            token,
            process.env.JWT_SECRET
        ) as PayLoad;

        //Recuperar o id do token e colocar dentro de uma variavel user_id dentro do requeste req
        req.user_id = sub;

        return next();

    } catch (err) {
        return res.status(401).end();
    }

}