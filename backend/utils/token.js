import jwt from "jsonwebtoken"

// Generate JWT auth token
const generateToken = async ({ id }) => {
    try {
        let token = await jwt.sign({ id }, process.env.JWT_SECRET, {
            expiresIn: "7d"
        })
        return token;
    } catch (error) {
        console.log(`Token Generation Error!`)
    }
}

export default generateToken