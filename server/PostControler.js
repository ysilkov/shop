import Auth from "./components/auth.js"

class PostControler{
    async create(req, res){
        try{
            const {user, password} = req.body;
            const auth = await Auth.create({user, password})
            res.json(auth)
        }catch(e){
            res.status(500).json(e)
        }
    }
}

export default new PostControler();