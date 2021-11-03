import express from "express"
import controller from "../controllers/account.controller.js"


const router = express.Router()


router.post("/", controller.createAccount )

router.get("/", controller.getAccount)

router.get("/:id", controller.getIdAccount)

router.delete("/:id", controller.deleteAccount)

router.put("/", controller.putAccount)

router.patch("/updateBalance", controller.patchAccount)


router.use((err, req, res, next) => {
    console.log(err)
    res.status(400).send({ error: err.message })
})



export default router