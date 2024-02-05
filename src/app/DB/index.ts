
import config from "../config"
import { USER_ROLE } from "../modules/user/user.constant"
import { UserModel } from "../modules/user/user.model"

const userInfo = {
    id: '0001',
    email: 'shahadat.sh255@gmail.com',
    password: config.super_admin_pass,
    needsPasswordChange: false,
    role: USER_ROLE.superAdmin,
    status: 'in-progress',
    isDeleted: false
}



const createSuperAdmin = async () => {
    const isSuperAdminExists = await UserModel.findOne({ role: USER_ROLE.superAdmin })
    if (!isSuperAdminExists) {
        await UserModel.create(userInfo)

    };


}

export default createSuperAdmin