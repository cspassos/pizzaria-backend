import { compare } from "bcryptjs";
import prismaClient from "../../prisma";
import { sign } from "jsonwebtoken";

interface AuthRequest{
    email: string;
    password: string;
}

class AuthUserService{
    async execute({ email, password }: AuthRequest){
        //Verifica se email existe
        const user = await prismaClient.user.findFirst({
            where:{
                email: email
            }
        })

        if(!user){
            throw new Error("Usuário/Senha incorreto!");
        }

        //verificar se a senha esta correta
        const passwordMath = await compare(password, user.password); //tem que usar o compare do bcryptjs, pois a senha esta ciptografada.

        if(!passwordMath){
            throw new Error("Senha/Senha incorreto!");
        }

        //Se tudo deu certo vamos gerar o token pro usuario
        const token = sign(
            {
                name: user.name,
                email: user.email
            },
            process.env.JWT_SECRET,
            {
                subject: user.id,
                expiresIn: '30d'
            }
        )

        return { 
            id: user.id,
            name: user.name,
            email: user.email,
            token: token
         }
    }
}

export { AuthUserService }