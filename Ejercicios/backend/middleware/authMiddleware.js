const checkAuth = (req,res,next)=>{
    console.log('Desde el middleware de auth');
    next();
}

export default checkAuth;