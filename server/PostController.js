import Auth from "./components/auth.js"

class PostController{
    async create(req, res){
        try{
            const {fullName, email, password} = req.body;
            const auth = await Auth.create({fullName, email, password})
            return res.json(auth)
        }catch(e){
            res.status(500).json(e)
        }
    }
}

export default new PostController();