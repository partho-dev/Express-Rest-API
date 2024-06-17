const asyncWrapper = (callback) =>{
    return async (req, res, next) =>{
        try {
            await callback(req, res, next)
        } catch (error) {
            next(error) // this would be used by custom error handler middleware to pass the errors
        }
    }
}


module.exports = asyncWrapper