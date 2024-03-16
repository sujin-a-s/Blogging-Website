import { Hono } from "hono"
import { PrismaClient } from '@prisma/client/edge'
import { withAccelerate } from '@prisma/extension-accelerate'
import {sign , verify} from "hono/jwt"
import { createBlogInput, updateBlogInput } from "@sujin_a_s/medium-common"

export const blogRouter = new Hono<{
    Bindings : {
        DATABASE_URL : string;
        JWT_SECRET : string
    },
    Variables : {
        userId : string
    }
}>()


blogRouter.use("/*", async (c,next)=>{
    try{
        const authheader = c.req.header("authorization") || ""
        const jwt = authheader.split(" ")
        const token = jwt[1]
        const user = await verify(token ,c.env.JWT_SECRET)
        console.log("middlware",user)
        if(user){
            c.set("userId", user.id);
            await next()
        }else{
            c.status(403)
            return c.json({
                message : "You are not allowed"
            })
        }
    }catch(e){
        c.status(403)
        return c.json({
            message : "you are not logged in"
        })
    }
})



blogRouter.post("/", async(c)=>{
    const body = await c.req.json()
    const authorId = c.get("userId")
    const prisma = new PrismaClient({

		datasourceUrl: c.env.DATABASE_URL,
	}).$extends(withAccelerate());

    const {success} = createBlogInput.safeParse(body)
    if(!success){
        c.status(411)
        return c.json({
            message : "incorrect inputs"
        })
    }

    const blog = await prisma.post.create({
        data : {
            title : body.title,
            content : body.content,
            authorId : authorId
        }
    })
    console.log(blog)
    
    return c.json({
       
        id : blog.id
    })
})


blogRouter.put("/", async(c)=>{
    const body = await c.req.json()

    const prisma = new PrismaClient({

		datasourceUrl: c.env.DATABASE_URL	,
	}).$extends(withAccelerate());
    
    try{
        const {success} = updateBlogInput.safeParse(body)
        if(!success){
            c.status(411)
            return c.json({
                message : "incorrect inputs"
            })
        }
        const blog = await prisma.post.update({
            where : {
                id : body.id
            },
            data : {
                title : body.title,
                content : body.content
            }
        })
        console.log(blog)

        return c.json({
            id : blog.id
        })
    }catch(e){
        console.log("error",e)
        c.status(403)
        return c.text("eroor while updating")
    }

})





blogRouter.get("/bulk", async(c)=>{

    const prisma = new PrismaClient({
        datasourceUrl: c.env?.DATABASE_URL	,
    }).$extends(withAccelerate());

    const blogs= await prisma.post.findMany({
        select : {
            content :true,
            title : true,
            id : true,
            author : {
                select : {
                    name :true
                }
            }
        }
    })

    return c.json({
        blogs
    })

})




blogRouter.get("/:id", async(c)=>{
   const id = c.req.param("id")

   const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL	,
}).$extends(withAccelerate());

    try{
        const blog = await prisma.post.findFirst({
            where : {
                id : id
            },
            select : {
                title : true,
                content :true,
                id : true,
                author : {
                    select : {
                        name : true
                    }
                }
            }
        })
    
        return c.json({
            blog
        })
    
    }catch(e){
        c.status(403)
        return c.text("error while getting the blog")
    }
})



