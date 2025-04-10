import { getUser, replaceUser, updateUser, deleteUser } from '#src/controllers/user.controller.js'
import { router } from './router.js'

router.get("/:uuid", getUser)
router.put("/:uuid", replaceUser)
router.patch("/:uuid", updateUser)
router.delete("/:uuid", deleteUser)

export default router